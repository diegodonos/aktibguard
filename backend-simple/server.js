#!/usr/bin/env node
/**
 * AktibGuard Simple Backend Server
 * Receives telemetry from agents and provides APIs for frontend
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const sqlite3 = require('sqlite3').verbose();
const WebSocket = require('ws');
const cron = require('node-cron');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const WS_PORT = process.env.WS_PORT || 3001;

// Database setup
const dbPath = path.join(__dirname, 'aktibguard.db');
const db = new sqlite3.Database(dbPath);

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));

// Initialize database
function initDatabase() {
    console.log('🗄️  Initializing database...');
    
    // Agents table
    db.run(`
        CREATE TABLE IF NOT EXISTS agents (
            id TEXT PRIMARY KEY,
            hostname TEXT NOT NULL,
            platform TEXT,
            architecture TEXT,
            os_release TEXT,
            last_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
            status TEXT DEFAULT 'online',
            version TEXT
        )
    `);
    
    // Metrics table
    db.run(`
        CREATE TABLE IF NOT EXISTS metrics (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            agent_id TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            cpu_percent REAL,
            memory_percent REAL,
            disk_percent REAL,
            network_connections INTEGER,
            data JSON,
            FOREIGN KEY (agent_id) REFERENCES agents(id)
        )
    `);
    
    // Threats table
    db.run(`
        CREATE TABLE IF NOT EXISTS threats (
            id TEXT PRIMARY KEY,
            agent_id TEXT,
            type TEXT,
            severity TEXT,
            title TEXT,
            description TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            status TEXT DEFAULT 'active',
            source TEXT,
            FOREIGN KEY (agent_id) REFERENCES agents(id)
        )
    `);
    
    // Processes table
    db.run(`
        CREATE TABLE IF NOT EXISTS processes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            agent_id TEXT,
            pid INTEGER,
            name TEXT,
            username TEXT,
            cpu_percent REAL,
            memory_percent REAL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (agent_id) REFERENCES agents(id)
        )
    `);
    
    console.log('✅ Database initialized');
}

// WebSocket server for real-time updates
const wss = new WebSocket.Server({ port: WS_PORT });
const clients = new Set();

wss.on('connection', (ws) => {
    console.log('🔌 New WebSocket client connected');
    clients.add(ws);
    
    ws.on('close', () => {
        clients.delete(ws);
        console.log('🔌 WebSocket client disconnected');
    });
});

function broadcastToClients(data) {
    const message = JSON.stringify(data);
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

// API Routes

// Health check
app.get('/api/v1/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        uptime: process.uptime()
    });
});

// Receive telemetry from agents
app.post('/api/v1/telemetry', (req, res) => {
    try {
        const telemetry = req.body;
        const agentInfo = telemetry.agent_info;
        const metrics = telemetry.metrics;
        const threats = telemetry.threats || [];
        const processes = telemetry.processes || [];
        
        console.log(`📡 Received telemetry from agent: ${agentInfo.id} (${agentInfo.hostname})`);
        
        // Update or insert agent
        db.run(`
            INSERT OR REPLACE INTO agents 
            (id, hostname, platform, architecture, os_release, last_seen, status, version)
            VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, 'online', ?)
        `, [agentInfo.id, agentInfo.hostname, agentInfo.platform, 
            agentInfo.architecture, agentInfo.os_release, agentInfo.version]);
        
        // Insert metrics
        if (metrics) {
            db.run(`
                INSERT INTO metrics 
                (agent_id, cpu_percent, memory_percent, disk_percent, network_connections, data)
                VALUES (?, ?, ?, ?, ?, ?)
            `, [agentInfo.id, 
                metrics.cpu?.percent || 0,
                metrics.memory?.percent || 0,
                metrics.disk?.percent || 0,
                metrics.network?.connections || 0,
                JSON.stringify(metrics)]);
        }
        
        // Insert threats
        threats.forEach(threat => {
            db.run(`
                INSERT OR REPLACE INTO threats 
                (id, agent_id, type, severity, title, description, timestamp, source)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `, [threat.id, agentInfo.id, threat.type, threat.severity,
                threat.title, threat.description, threat.timestamp, threat.source]);
        });
        
        // Insert top processes
        processes.slice(0, 10).forEach(process => {
            db.run(`
                INSERT INTO processes 
                (agent_id, pid, name, username, cpu_percent, memory_percent)
                VALUES (?, ?, ?, ?, ?, ?)
            `, [agentInfo.id, process.pid, process.name, process.username,
                process.cpu_percent || 0, process.memory_percent || 0]);
        });
        
        // Broadcast real-time update
        broadcastToClients({
            type: 'telemetry_update',
            agent_id: agentInfo.id,
            hostname: agentInfo.hostname,
            metrics: metrics,
            threats_count: threats.length,
            timestamp: new Date().toISOString()
        });
        
        res.json({ 
            status: 'success', 
            message: 'Telemetry received',
            threats_detected: threats.length
        });
        
    } catch (error) {
        console.error('❌ Error processing telemetry:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Get all agents
app.get('/api/v1/agents', (req, res) => {
    db.all(`
        SELECT a.*, 
               m.cpu_percent, m.memory_percent, m.disk_percent, m.network_connections,
               COUNT(t.id) as threat_count
        FROM agents a
        LEFT JOIN metrics m ON a.id = m.agent_id 
        LEFT JOIN threats t ON a.id = t.agent_id AND t.status = 'active'
        WHERE m.id = (SELECT MAX(id) FROM metrics WHERE agent_id = a.id)
        GROUP BY a.id
        ORDER BY a.last_seen DESC
    `, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Get agent details
app.get('/api/v1/agents/:id', (req, res) => {
    const agentId = req.params.id;
    
    db.get(`
        SELECT a.*, m.data as latest_metrics
        FROM agents a
        LEFT JOIN metrics m ON a.id = m.agent_id 
        WHERE a.id = ? AND m.id = (SELECT MAX(id) FROM metrics WHERE agent_id = a.id)
    `, [agentId], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'Agent not found' });
            return;
        }
        
        // Parse metrics JSON
        if (row.latest_metrics) {
            row.latest_metrics = JSON.parse(row.latest_metrics);
        }
        
        res.json(row);
    });
});

// Get all threats
app.get('/api/v1/threats', (req, res) => {
    const status = req.query.status || 'active';
    const limit = parseInt(req.query.limit) || 50;
    
    db.all(`
        SELECT t.*, a.hostname
        FROM threats t
        JOIN agents a ON t.agent_id = a.id
        WHERE t.status = ?
        ORDER BY t.timestamp DESC
        LIMIT ?
    `, [status, limit], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Get metrics for dashboard
app.get('/api/v1/dashboard/stats', (req, res) => {
    const queries = [
        // Total agents
        new Promise((resolve) => {
            db.get('SELECT COUNT(*) as count FROM agents', (err, row) => {
                resolve({ total_agents: row?.count || 0 });
            });
        }),
        
        // Online agents (seen in last 2 minutes)
        new Promise((resolve) => {
            db.get(`
                SELECT COUNT(*) as count FROM agents 
                WHERE datetime(last_seen) > datetime('now', '-2 minutes')
            `, (err, row) => {
                resolve({ online_agents: row?.count || 0 });
            });
        }),
        
        // Active threats
        new Promise((resolve) => {
            db.get("SELECT COUNT(*) as count FROM threats WHERE status = 'active'", (err, row) => {
                resolve({ active_threats: row?.count || 0 });
            });
        }),
        
        // Average metrics
        new Promise((resolve) => {
            db.get(`
                SELECT AVG(cpu_percent) as avg_cpu, AVG(memory_percent) as avg_memory
                FROM metrics 
                WHERE datetime(timestamp) > datetime('now', '-1 hour')
            `, (err, row) => {
                resolve({ 
                    avg_cpu: Math.round(row?.avg_cpu || 0),
                    avg_memory: Math.round(row?.avg_memory || 0)
                });
            });
        })
    ];
    
    Promise.all(queries).then(results => {
        const stats = Object.assign({}, ...results);
        res.json(stats);
    });
});

// Get metrics timeline
app.get('/api/v1/metrics/timeline', (req, res) => {
    const hours = parseInt(req.query.hours) || 24;
    const agentId = req.query.agent_id;
    
    let query = `
        SELECT 
            datetime(timestamp) as time,
            AVG(cpu_percent) as cpu,
            AVG(memory_percent) as memory,
            AVG(disk_percent) as disk,
            COUNT(*) as data_points
        FROM metrics 
        WHERE datetime(timestamp) > datetime('now', '-${hours} hours')
    `;
    
    let params = [];
    if (agentId) {
        query += ' AND agent_id = ?';
        params.push(agentId);
    }
    
    query += ' GROUP BY datetime(timestamp, "start of hour") ORDER BY time';
    
    db.all(query, params, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Clean old data (run hourly)
cron.schedule('0 * * * *', () => {
    console.log('🧹 Cleaning old data...');
    
    // Delete old metrics (keep last 7 days)
    db.run("DELETE FROM metrics WHERE datetime(timestamp) < datetime('now', '-7 days')");
    
    // Delete old processes (keep last 1 day)
    db.run("DELETE FROM processes WHERE datetime(timestamp) < datetime('now', '-1 day')");
    
    // Mark agents as offline if not seen in 5 minutes
    db.run(`
        UPDATE agents SET status = 'offline' 
        WHERE datetime(last_seen) < datetime('now', '-5 minutes')
    `);
    
    console.log('✅ Cleanup completed');
});

// Error handling
app.use((err, req, res, next) => {
    console.error('❌ Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
initDatabase();

app.listen(PORT, '0.0.0.0', () => {
    console.log('🚀 AktibGuard Backend Server started');
    console.log(`🌐 HTTP API: http://localhost:${PORT}`);
    console.log(`🔌 WebSocket: ws://localhost:${WS_PORT}`);
    console.log(`🗄️  Database: ${dbPath}`);
    console.log('📡 Ready to receive agent telemetry');
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    db.close((err) => {
        if (err) {
            console.error('❌ Error closing database:', err);
        } else {
            console.log('✅ Database closed');
        }
        process.exit(0);
    });
});