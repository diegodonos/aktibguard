import React from 'react';
import { Card, CardContent, Typography, Box, Chip, IconButton, List, ListItem, Avatar } from '@mui/material';
import { 
  Warning as WarningIcon, 
  Error as ErrorIcon, 
  Info as InfoIcon,
  MoreVert as MoreVertIcon,
  Computer as ComputerIcon 
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const RecentAlerts = () => {
  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Malware Detected',
      description: 'Suspicious file detected on DESKTOP-001',
      timestamp: '2 min ago',
      machine: 'DESKTOP-001',
    },
    {
      id: 2,
      type: 'warning',
      title: 'Failed Login Attempt',
      description: 'Multiple failed login attempts from 192.168.1.100',
      timestamp: '5 min ago',
      machine: 'SERVER-01',
    },
    {
      id: 3,
      type: 'info',
      title: 'Security Update',
      description: 'Endpoint protection updated successfully',
      timestamp: '10 min ago',
      machine: 'LAPTOP-05',
    },
    {
      id: 4,
      type: 'critical',
      title: 'Network Intrusion',
      description: 'Unauthorized access attempt blocked',
      timestamp: '15 min ago',
      machine: 'FIREWALL-01',
    },
    {
      id: 5,
      type: 'warning',
      title: 'High CPU Usage',
      description: 'CPU usage above 90% for extended period',
      timestamp: '20 min ago',
      machine: 'SERVER-02',
    },
  ];

  const getAlertConfig = (type) => {
    switch (type) {
      case 'critical':
        return {
          color: '#ff4757',
          bgColor: 'rgba(255, 71, 87, 0.1)',
          borderColor: 'rgba(255, 71, 87, 0.3)',
          icon: ErrorIcon,
        };
      case 'warning':
        return {
          color: '#ffa726',
          bgColor: 'rgba(255, 167, 38, 0.1)',
          borderColor: 'rgba(255, 167, 38, 0.3)',
          icon: WarningIcon,
        };
      case 'info':
        return {
          color: '#00d4ff',
          bgColor: 'rgba(0, 212, 255, 0.1)',
          borderColor: 'rgba(0, 212, 255, 0.3)',
          icon: InfoIcon,
        };
      default:
        return {
          color: '#ffffff',
          bgColor: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          icon: InfoIcon,
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <Card className="glass-morphism" sx={{ height: 'fit-content' }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600 }}>
              Recent Alerts
            </Typography>
            <Chip
              label="5 NEW"
              size="small"
              sx={{
                backgroundColor: '#ff4757',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.7rem',
                animation: 'pulse 2s infinite',
              }}
            />
          </Box>

          <List disablePadding>
            {alerts.map((alert, index) => {
              const config = getAlertConfig(alert.type);
              const Icon = config.icon;

              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                >
                  <ListItem
                    disablePadding
                    sx={{
                      mb: 2,
                      background: config.bgColor,
                      border: `1px solid ${config.borderColor}`,
                      borderRadius: 2,
                      p: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: `${config.bgColor}80`,
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', width: '100%', alignItems: 'flex-start' }}>
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          backgroundColor: config.color,
                          mr: 2,
                          mt: 0.5,
                        }}
                      >
                        <Icon sx={{ fontSize: 18 }} />
                      </Avatar>
                      
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              color: '#ffffff',
                              fontWeight: 600,
                              fontSize: '0.875rem',
                            }}
                          >
                            {alert.title}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'rgba(255, 255, 255, 0.5)',
                              fontSize: '0.7rem',
                              whiteSpace: 'nowrap',
                              ml: 1,
                            }}
                          >
                            {alert.timestamp}
                          </Typography>
                        </Box>
                        
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'rgba(255, 255, 255, 0.8)',
                            fontSize: '0.75rem',
                            mb: 1,
                            lineHeight: 1.4,
                          }}
                        >
                          {alert.description}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <ComputerIcon sx={{ fontSize: 12, color: 'rgba(255, 255, 255, 0.5)' }} />
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'rgba(255, 255, 255, 0.6)',
                              fontSize: '0.7rem',
                              fontFamily: 'Fira Code, monospace',
                            }}
                          >
                            {alert.machine}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </ListItem>
                </motion.div>
              );
            })}
          </List>

          {/* View All Button */}
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography
              variant="body2"
              sx={{
                color: '#00d4ff',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 500,
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              View All Alerts
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecentAlerts;