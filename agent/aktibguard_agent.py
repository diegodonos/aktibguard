#!/usr/bin/env python3
"""
AktibGuard Security Agent
Real-time system monitoring and threat detection agent

Features:
- System metrics collection (CPU, RAM, Disk, Network)
- Process monitoring
- Network connections tracking
- Basic threat detection
- Secure communication with AktibGuard server
"""

import os
import sys
import json
import time
import socket
import hashlib
import platform
import threading
import subprocess
from datetime import datetime, timezone
from typing import Dict, List, Optional, Any

import psutil
import requests
from cryptography.fernet import Fernet
from dotenv import load_dotenv

class AktibGuardAgent:
    def __init__(self, config_file: str = ".env"):
        """Initialize the AktibGuard agent"""
        load_dotenv(config_file)
        
        # Configuration
        self.server_url = os.getenv("AKTIBGUARD_SERVER", "http://localhost:3000")
        self.agent_id = os.getenv("AGENT_ID", self._generate_agent_id())
        self.api_key = os.getenv("API_KEY", "default-key")
        self.collection_interval = int(os.getenv("COLLECTION_INTERVAL", "30"))
        self.debug = os.getenv("DEBUG", "false").lower() == "true"
        
        # Agent info
        self.hostname = socket.gethostname()
        self.platform = platform.system()
        self.architecture = platform.architecture()[0]
        self.os_release = platform.release()
        
        # Threat detection
        self.suspicious_processes = [
            'nc.exe', 'netcat', 'nmap', 'masscan', 'sqlmap',
            'mimikatz', 'powershell.exe', 'cmd.exe'
        ]
        
        self.suspicious_network_ports = [1433, 3389, 22, 23, 21, 135, 139, 445]
        
        # State tracking
        self.last_metrics = {}
        self.running = False
        
        self._setup_logging()
        
    def _generate_agent_id(self) -> str:
        """Generate unique agent ID based on system info"""
        system_info = f"{socket.gethostname()}{platform.node()}{platform.machine()}"
        return hashlib.sha256(system_info.encode()).hexdigest()[:16]
    
    def _setup_logging(self):
        """Setup logging for the agent"""
        import logging
        level = logging.DEBUG if self.debug else logging.INFO
        logging.basicConfig(
            level=level,
            format='%(asctime)s - AktibGuard Agent - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler('aktibguard_agent.log'),
                logging.StreamHandler(sys.stdout)
            ]
        )
        self.logger = logging.getLogger(__name__)
    
    def log(self, message: str, level: str = "info"):
        """Log message with timestamp"""
        if level == "debug" and self.debug:
            self.logger.debug(message)
        elif level == "info":
            self.logger.info(message)
        elif level == "warning":
            self.logger.warning(message)
        elif level == "error":
            self.logger.error(message)
    
    def get_system_metrics(self) -> Dict[str, Any]:
        """Collect comprehensive system metrics"""
        try:
            # CPU metrics
            cpu_percent = psutil.cpu_percent(interval=1)
            cpu_count = psutil.cpu_count()
            cpu_freq = psutil.cpu_freq()
            
            # Memory metrics
            memory = psutil.virtual_memory()
            swap = psutil.swap_memory()
            
            # Disk metrics
            disk_usage = psutil.disk_usage('/')
            disk_io = psutil.disk_io_counters()
            
            # Network metrics
            network_io = psutil.net_io_counters()
            network_connections = len(psutil.net_connections())
            
            # Boot time
            boot_time = datetime.fromtimestamp(psutil.boot_time(), tz=timezone.utc).isoformat()
            
            return {
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "agent_id": self.agent_id,
                "hostname": self.hostname,
                "platform": self.platform,
                "cpu": {
                    "percent": cpu_percent,
                    "count": cpu_count,
                    "frequency": cpu_freq.current if cpu_freq else None
                },
                "memory": {
                    "total": memory.total,
                    "available": memory.available,
                    "percent": memory.percent,
                    "used": memory.used,
                    "free": memory.free
                },
                "swap": {
                    "total": swap.total,
                    "used": swap.used,
                    "free": swap.free,
                    "percent": swap.percent
                },
                "disk": {
                    "total": disk_usage.total,
                    "used": disk_usage.used,
                    "free": disk_usage.free,
                    "percent": (disk_usage.used / disk_usage.total) * 100,
                    "read_bytes": disk_io.read_bytes if disk_io else 0,
                    "write_bytes": disk_io.write_bytes if disk_io else 0
                },
                "network": {
                    "bytes_sent": network_io.bytes_sent,
                    "bytes_recv": network_io.bytes_recv,
                    "packets_sent": network_io.packets_sent,
                    "packets_recv": network_io.packets_recv,
                    "connections": network_connections
                },
                "uptime": boot_time
            }
        except Exception as e:
            self.log(f"Error collecting system metrics: {e}", "error")
            return {}
    
    def get_running_processes(self) -> List[Dict[str, Any]]:
        """Get list of running processes with details"""
        processes = []
        try:
            for proc in psutil.process_iter(['pid', 'name', 'username', 'cpu_percent', 'memory_percent', 'create_time']):
                try:
                    process_info = proc.info
                    processes.append({
                        "pid": process_info['pid'],
                        "name": process_info['name'],
                        "username": process_info['username'],
                        "cpu_percent": process_info['cpu_percent'],
                        "memory_percent": process_info['memory_percent'],
                        "create_time": datetime.fromtimestamp(process_info['create_time'], tz=timezone.utc).isoformat()
                    })
                except (psutil.NoSuchProcess, psutil.AccessDenied):
                    continue
        except Exception as e:
            self.log(f"Error collecting processes: {e}", "error")
        
        return processes[:50]  # Limit to top 50 processes
    
    def get_network_connections(self) -> List[Dict[str, Any]]:
        """Get active network connections"""
        connections = []
        try:
            for conn in psutil.net_connections(kind='inet'):
                if conn.status == psutil.CONN_ESTABLISHED:
                    connections.append({
                        "local_address": f"{conn.laddr.ip}:{conn.laddr.port}" if conn.laddr else "",
                        "remote_address": f"{conn.raddr.ip}:{conn.raddr.port}" if conn.raddr else "",
                        "status": conn.status,
                        "pid": conn.pid
                    })
        except Exception as e:
            self.log(f"Error collecting network connections: {e}", "error")
        
        return connections[:100]  # Limit connections
    
    def detect_threats(self, metrics: Dict[str, Any], processes: List[Dict[str, Any]], 
                      connections: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Basic threat detection based on system behavior"""
        threats = []
        
        try:
            # High CPU usage threat
            if metrics.get("cpu", {}).get("percent", 0) > 90:
                threats.append({
                    "id": f"cpu_high_{int(time.time())}",
                    "type": "performance",
                    "severity": "medium",
                    "title": "High CPU Usage Detected",
                    "description": f"CPU usage at {metrics['cpu']['percent']:.1f}%",
                    "timestamp": datetime.now(timezone.utc).isoformat(),
                    "source": "system_monitor"
                })
            
            # High memory usage threat
            if metrics.get("memory", {}).get("percent", 0) > 85:
                threats.append({
                    "id": f"memory_high_{int(time.time())}",
                    "type": "performance",
                    "severity": "medium",
                    "title": "High Memory Usage Detected",
                    "description": f"Memory usage at {metrics['memory']['percent']:.1f}%",
                    "timestamp": datetime.now(timezone.utc).isoformat(),
                    "source": "system_monitor"
                })
            
            # Suspicious processes
            for process in processes:
                if any(susp in process['name'].lower() for susp in self.suspicious_processes):
                    threats.append({
                        "id": f"process_suspicious_{process['pid']}_{int(time.time())}",
                        "type": "malware",
                        "severity": "high",
                        "title": "Suspicious Process Detected",
                        "description": f"Process '{process['name']}' (PID: {process['pid']}) detected",
                        "timestamp": datetime.now(timezone.utc).isoformat(),
                        "source": "process_monitor"
                    })
            
            # Too many network connections
            if len(connections) > 50:
                threats.append({
                    "id": f"network_high_{int(time.time())}",
                    "type": "network",
                    "severity": "medium",
                    "title": "High Network Activity",
                    "description": f"{len(connections)} active connections detected",
                    "timestamp": datetime.now(timezone.utc).isoformat(),
                    "source": "network_monitor"
                })
            
            # Suspicious network connections
            for conn in connections:
                if conn.get("remote_address"):
                    try:
                        port = int(conn["remote_address"].split(":")[1])
                        if port in self.suspicious_network_ports:
                            threats.append({
                                "id": f"network_suspicious_{port}_{int(time.time())}",
                                "type": "network",
                                "severity": "high",
                                "title": "Suspicious Network Connection",
                                "description": f"Connection to suspicious port {port}: {conn['remote_address']}",
                                "timestamp": datetime.now(timezone.utc).isoformat(),
                                "source": "network_monitor"
                            })
                    except (ValueError, IndexError):
                        continue
        
        except Exception as e:
            self.log(f"Error in threat detection: {e}", "error")
        
        return threats
    
    def send_telemetry(self, data: Dict[str, Any]) -> bool:
        """Send telemetry data to AktibGuard server"""
        try:
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {self.api_key}",
                "User-Agent": f"AktibGuard-Agent/{self.agent_id}"
            }
            
            response = requests.post(
                f"{self.server_url}/api/v1/telemetry",
                json=data,
                headers=headers,
                timeout=30
            )
            
            if response.status_code == 200:
                self.log("Telemetry sent successfully", "debug")
                return True
            else:
                self.log(f"Failed to send telemetry: {response.status_code} - {response.text}", "error")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log(f"Network error sending telemetry: {e}", "error")
            return False
        except Exception as e:
            self.log(f"Unexpected error sending telemetry: {e}", "error")
            return False
    
    def collect_and_send(self):
        """Collect all data and send to server"""
        try:
            self.log("Collecting system data...", "debug")
            
            # Collect data
            metrics = self.get_system_metrics()
            processes = self.get_running_processes()
            connections = self.get_network_connections()
            threats = self.detect_threats(metrics, processes, connections)
            
            # Prepare telemetry package
            telemetry = {
                "agent_info": {
                    "id": self.agent_id,
                    "hostname": self.hostname,
                    "platform": self.platform,
                    "architecture": self.architecture,
                    "os_release": self.os_release,
                    "version": "1.0.0"
                },
                "metrics": metrics,
                "processes": processes,
                "connections": connections,
                "threats": threats,
                "collection_time": datetime.now(timezone.utc).isoformat()
            }
            
            # Send to server
            if self.send_telemetry(telemetry):
                self.log(f"Sent telemetry: {len(processes)} processes, {len(connections)} connections, {len(threats)} threats")
            else:
                self.log("Failed to send telemetry", "error")
                
        except Exception as e:
            self.log(f"Error in collect_and_send: {e}", "error")
    
    def run(self):
        """Main agent loop"""
        self.running = True
        self.log(f"Starting AktibGuard Agent {self.agent_id}")
        self.log(f"Server: {self.server_url}")
        self.log(f"Collection interval: {self.collection_interval}s")
        self.log(f"Platform: {self.platform} {self.architecture}")
        
        try:
            while self.running:
                self.collect_and_send()
                time.sleep(self.collection_interval)
                
        except KeyboardInterrupt:
            self.log("Agent stopped by user")
        except Exception as e:
            self.log(f"Agent error: {e}", "error")
        finally:
            self.running = False
            self.log("AktibGuard Agent stopped")
    
    def stop(self):
        """Stop the agent"""
        self.running = False

def main():
    """Main entry point"""
    import argparse
    
    parser = argparse.ArgumentParser(description="AktibGuard Security Agent")
    parser.add_argument("--config", default=".env", help="Configuration file")
    parser.add_argument("--debug", action="store_true", help="Enable debug mode")
    parser.add_argument("--test", action="store_true", help="Run single collection test")
    
    args = parser.parse_args()
    
    # Override debug if specified
    if args.debug:
        os.environ["DEBUG"] = "true"
    
    agent = AktibGuardAgent(args.config)
    
    if args.test:
        print("Running single collection test...")
        agent.collect_and_send()
        print("Test completed")
    else:
        try:
            agent.run()
        except KeyboardInterrupt:
            print("\nStopping agent...")
            agent.stop()

if __name__ == "__main__":
    main()