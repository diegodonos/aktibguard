import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { Hub as NetworkIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const NetworkMap = () => {
  const [connections, setConnections] = useState([]);

  const nodes = [
    { id: 'firewall', label: 'Firewall', x: 50, y: 20, type: 'security', status: 'online' },
    { id: 'server1', label: 'Server-01', x: 20, y: 50, type: 'server', status: 'online' },
    { id: 'server2', label: 'Server-02', x: 80, y: 50, type: 'server', status: 'warning' },
    { id: 'switch', label: 'Switch', x: 50, y: 50, type: 'network', status: 'online' },
    { id: 'desktop1', label: 'Desktop-01', x: 15, y: 80, type: 'endpoint', status: 'online' },
    { id: 'desktop2', label: 'Desktop-02', x: 35, y: 80, type: 'endpoint', status: 'offline' },
    { id: 'laptop1', label: 'Laptop-01', x: 65, y: 80, type: 'endpoint', status: 'online' },
    { id: 'laptop2', label: 'Laptop-02', x: 85, y: 80, type: 'endpoint', status: 'critical' },
  ];

  const connectionLines = [
    { from: 'firewall', to: 'switch' },
    { from: 'switch', to: 'server1' },
    { from: 'switch', to: 'server2' },
    { from: 'switch', to: 'desktop1' },
    { from: 'switch', to: 'desktop2' },
    { from: 'switch', to: 'laptop1' },
    { from: 'switch', to: 'laptop2' },
  ];

  useEffect(() => {
    // Simulate network activity
    const interval = setInterval(() => {
      setConnections(prev => [
        ...prev.slice(-20), // Keep last 20 connections
        {
          id: Date.now(),
          from: nodes[Math.floor(Math.random() * nodes.length)].id,
          to: nodes[Math.floor(Math.random() * nodes.length)].id,
          timestamp: Date.now(),
        }
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, [nodes]);

  const getNodeColor = (type, status) => {
    if (status === 'critical') return '#ff4757';
    if (status === 'warning') return '#ffa726';
    if (status === 'offline') return 'rgba(255, 255, 255, 0.3)';
    
    switch (type) {
      case 'security': return '#ff6b6b';
      case 'server': return '#00d4ff';
      case 'network': return '#4caf50';
      case 'endpoint': return '#ffa726';
      default: return '#ffffff';
    }
  };

  const getNodeFromCoords = (nodeId) => {
    return nodes.find(node => node.id === nodeId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <Card className="glass-morphism">
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <NetworkIcon sx={{ color: '#00d4ff', mr: 1, fontSize: 28 }} />
            <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600 }}>
              Network Topology
            </Typography>
            <Chip
              label={`${nodes.filter(n => n.status === 'online').length}/${nodes.length} ONLINE`}
              size="small"
              sx={{
                ml: 'auto',
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                color: '#4caf50',
                fontWeight: 600,
                fontSize: '0.7rem',
              }}
            />
          </Box>

          {/* Network Map */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: 300,
              background: 'radial-gradient(circle at center, rgba(0, 212, 255, 0.05) 0%, transparent 70%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            {/* Grid Background */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `
                  linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '30px 30px',
                opacity: 0.3,
              }}
            />

            {/* Connection Lines */}
            <svg
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
              }}
            >
              {connectionLines.map((connection, index) => {
                const fromNode = getNodeFromCoords(connection.from);
                const toNode = getNodeFromCoords(connection.to);
                
                if (!fromNode || !toNode) return null;
                
                return (
                  <motion.line
                    key={`${connection.from}-${connection.to}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    x1={`${fromNode.x}%`}
                    y1={`${fromNode.y}%`}
                    x2={`${toNode.x}%`}
                    y2={`${toNode.y}%`}
                    stroke="rgba(0, 212, 255, 0.4)"
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                );
              })}
            </svg>

            {/* Network Nodes */}
            {nodes.map((node, index) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.2 }}
                style={{
                  position: 'absolute',
                  top: `${node.y}%`,
                  left: `${node.x}%`,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                  zIndex: 2,
                }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: getNodeColor(node.type, node.status),
                    boxShadow: `0 0 15px ${getNodeColor(node.type, node.status)}`,
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    position: 'relative',
                    '&::after': node.status === 'online' ? {
                      content: '""',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '200%',
                      height: '200%',
                      borderRadius: '50%',
                      border: `1px solid ${getNodeColor(node.type, node.status)}`,
                      animation: 'pulse 2s infinite',
                    } : {},
                  }}
                />
                
                <Typography
                  variant="caption"
                  sx={{
                    position: 'absolute',
                    top: '120%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.65rem',
                    fontFamily: 'Fira Code, monospace',
                    whiteSpace: 'nowrap',
                    background: 'rgba(0, 0, 0, 0.7)',
                    padding: '2px 4px',
                    borderRadius: '2px',
                  }}
                >
                  {node.label}
                </Typography>
              </motion.div>
            ))}

            {/* Activity Indicators */}
            {connections.slice(-5).map((connection) => {
              const fromNode = getNodeFromCoords(connection.from);
              const toNode = getNodeFromCoords(connection.to);
              
              if (!fromNode || !toNode || fromNode.id === toNode.id) return null;
              
              return (
                <motion.div
                  key={connection.id}
                  initial={{
                    left: `${fromNode.x}%`,
                    top: `${fromNode.y}%`,
                    opacity: 1,
                  }}
                  animate={{
                    left: `${toNode.x}%`,
                    top: `${toNode.y}%`,
                    opacity: 0,
                  }}
                  transition={{ duration: 2, ease: "linear" }}
                  style={{
                    position: 'absolute',
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    backgroundColor: '#00d4ff',
                    boxShadow: '0 0 10px #00d4ff',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 3,
                  }}
                />
              );
            })}
          </Box>

          {/* Network Stats */}
          <Box
            sx={{
              mt: 3,
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: '#4caf50', fontWeight: 700 }}>
                {nodes.filter(n => n.status === 'online').length}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Online
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: '#ffa726', fontWeight: 700 }}>
                {nodes.filter(n => n.status === 'warning').length}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Warning
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: '#ff4757', fontWeight: 700 }}>
                {nodes.filter(n => n.status === 'critical').length}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Critical
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.4)', fontWeight: 700 }}>
                {nodes.filter(n => n.status === 'offline').length}
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Offline
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NetworkMap;