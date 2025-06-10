import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Avatar,
  LinearProgress,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Computer as ComputerIcon,
  Laptop as LaptopIcon,
  PhoneAndroid as PhoneIcon,
  Router as RouterIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
  Security as SecurityIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Endpoints = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);

  // Sample endpoints data
  const endpoints = [
    {
      id: 1,
      name: 'DESKTOP-001',
      type: 'desktop',
      os: 'Windows 11 Pro',
      ip: '192.168.1.101',
      status: 'online',
      lastSeen: '2 min ago',
      threats: 0,
      version: '1.2.5',
      user: 'John Doe',
      department: 'IT',
      riskScore: 15,
    },
    {
      id: 2,
      name: 'LAPTOP-005',
      type: 'laptop',
      os: 'macOS Ventura',
      ip: '192.168.1.142',
      status: 'warning',
      lastSeen: '15 min ago',
      threats: 2,
      version: '1.2.3',
      user: 'Sarah Connor',
      department: 'Marketing',
      riskScore: 65,
    },
    {
      id: 3,
      name: 'SERVER-01',
      type: 'server',
      os: 'Ubuntu 22.04 LTS',
      ip: '192.168.1.10',
      status: 'online',
      lastSeen: '1 min ago',
      threats: 0,
      version: '1.2.5',
      user: 'System',
      department: 'Infrastructure',
      riskScore: 8,
    },
    {
      id: 4,
      name: 'MOBILE-iPhone13',
      type: 'mobile',
      os: 'iOS 17.1',
      ip: '192.168.1.205',
      status: 'offline',
      lastSeen: '2 hours ago',
      threats: 0,
      version: '1.1.8',
      user: 'Mike Johnson',
      department: 'Sales',
      riskScore: 25,
    },
    {
      id: 5,
      name: 'WORKSTATION-007',
      type: 'desktop',
      os: 'Windows 10 Pro',
      ip: '192.168.1.155',
      status: 'critical',
      lastSeen: '5 min ago',
      threats: 5,
      version: '1.1.9',
      user: 'Lisa Anderson',
      department: 'Finance',
      riskScore: 92,
    },
  ];

  const handleMenuOpen = (event, endpoint) => {
    setAnchorEl(event.currentTarget);
    setSelectedEndpoint(endpoint);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedEndpoint(null);
  };

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'desktop': return ComputerIcon;
      case 'laptop': return LaptopIcon;
      case 'mobile': return PhoneIcon;
      case 'server': return RouterIcon;
      default: return ComputerIcon;
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'online':
        return { color: '#4caf50', label: 'Online', icon: CheckCircleIcon };
      case 'warning':
        return { color: '#ffa726', label: 'Warning', icon: WarningIcon };
      case 'critical':
        return { color: '#ff4757', label: 'Critical', icon: ErrorIcon };
      case 'offline':
        return { color: 'rgba(255, 255, 255, 0.4)', label: 'Offline', icon: ErrorIcon };
      default:
        return { color: '#ffffff', label: 'Unknown', icon: ErrorIcon };
    }
  };

  const getRiskColor = (score) => {
    if (score <= 30) return '#4caf50';
    if (score <= 60) return '#ffa726';
    return '#ff4757';
  };

  const filteredEndpoints = endpoints.filter(endpoint =>
    endpoint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    endpoint.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    endpoint.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: endpoints.length,
    online: endpoints.filter(e => e.status === 'online').length,
    warning: endpoints.filter(e => e.status === 'warning').length,
    critical: endpoints.filter(e => e.status === 'critical').length,
    offline: endpoints.filter(e => e.status === 'offline').length,
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h1" sx={{ fontSize: '2rem', fontWeight: 700 }}>
              Endpoint Management
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                startIcon={<RefreshIcon />}
                className="cyber-button"
                sx={{
                  borderColor: 'rgba(0, 212, 255, 0.3)',
                  color: '#00d4ff',
                  '&:hover': {
                    borderColor: '#00d4ff',
                    background: 'rgba(0, 212, 255, 0.1)',
                  },
                }}
              >
                Refresh
              </Button>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                className="cyber-button"
                sx={{
                  background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #00b8e6, #007a99)',
                  },
                }}
              >
                Add Endpoint
              </Button>
            </Box>
          </Box>
          
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: 'Fira Code, monospace',
              fontSize: '0.875rem',
            }}
          >
            Monitor and manage all endpoints across your organization
          </Typography>
        </motion.div>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { label: 'Total Endpoints', value: stats.total, color: '#00d4ff', icon: ComputerIcon },
          { label: 'Online', value: stats.online, color: '#4caf50', icon: CheckCircleIcon },
          { label: 'Warnings', value: stats.warning, color: '#ffa726', icon: WarningIcon },
          { label: 'Critical', value: stats.critical, color: '#ff4757', icon: ErrorIcon },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Grid item xs={12} sm={6} lg={3} key={stat.label}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass-morphism">
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          background: `linear-gradient(45deg, ${stat.color}20, ${stat.color}10)`,
                          border: `1px solid ${stat.color}40`,
                        }}
                      >
                        <Icon sx={{ color: stat.color, fontSize: 24 }} />
                      </Box>
                      <Box>
                        <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 700 }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          {stat.label}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>

      {/* Endpoints Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="glass-morphism">
          <CardContent sx={{ p: 3 }}>
            {/* Search and Filters */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600 }}>
                Endpoint Inventory
              </Typography>
              <TextField
                size="small"
                placeholder="Search endpoints..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.5)' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(0, 212, 255, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#00d4ff',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: '#ffffff',
                  },
                }}
              />
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600 }}>
                      Device
                    </TableCell>
                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600 }}>
                      User
                    </TableCell>
                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600 }}>
                      Status
                    </TableCell>
                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600 }}>
                      Threats
                    </TableCell>
                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600 }}>
                      Risk Score
                    </TableCell>
                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600 }}>
                      Last Seen
                    </TableCell>
                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600 }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredEndpoints.map((endpoint, index) => {
                    const DeviceIcon = getDeviceIcon(endpoint.type);
                    const statusConfig = getStatusConfig(endpoint.status);
                    const StatusIcon = statusConfig.icon;

                    return (
                      <motion.tr
                        key={endpoint.id}
                        component={TableRow}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        sx={{
                          '&:hover': {
                            background: 'rgba(255, 255, 255, 0.02)',
                          },
                        }}
                      >
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar
                              sx={{
                                width: 40,
                                height: 40,
                                background: `linear-gradient(45deg, ${statusConfig.color}20, ${statusConfig.color}10)`,
                                border: `1px solid ${statusConfig.color}40`,
                              }}
                            >
                              <DeviceIcon sx={{ color: statusConfig.color }} />
                            </Avatar>
                            <Box>
                              <Typography
                                variant="subtitle2"
                                sx={{ color: '#ffffff', fontWeight: 600 }}
                              >
                                {endpoint.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: 'rgba(255, 255, 255, 0.6)',
                                  fontFamily: 'Fira Code, monospace',
                                }}
                              >
                                {endpoint.os} • {endpoint.ip}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        
                        <TableCell>
                          <Box>
                            <Typography variant="body2" sx={{ color: '#ffffff' }}>
                              {endpoint.user}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: 'rgba(255, 255, 255, 0.6)' }}
                            >
                              {endpoint.department}
                            </Typography>
                          </Box>
                        </TableCell>
                        
                        <TableCell>
                          <Chip
                            icon={<StatusIcon sx={{ fontSize: 16 }} />}
                            label={statusConfig.label}
                            size="small"
                            sx={{
                              backgroundColor: `${statusConfig.color}20`,
                              color: statusConfig.color,
                              border: `1px solid ${statusConfig.color}40`,
                              fontWeight: 600,
                            }}
                          />
                        </TableCell>
                        
                        <TableCell>
                          {endpoint.threats > 0 ? (
                            <Chip
                              label={`${endpoint.threats} Active`}
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(255, 71, 87, 0.2)',
                                color: '#ff4757',
                                fontWeight: 600,
                              }}
                            />
                          ) : (
                            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                              None
                            </Typography>
                          )}
                        </TableCell>
                        
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 100 }}>
                            <LinearProgress
                              variant="determinate"
                              value={endpoint.riskScore}
                              sx={{
                                flex: 1,
                                height: 6,
                                borderRadius: 3,
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: getRiskColor(endpoint.riskScore),
                                  borderRadius: 3,
                                },
                              }}
                            />
                            <Typography
                              variant="caption"
                              sx={{
                                color: getRiskColor(endpoint.riskScore),
                                fontWeight: 600,
                                minWidth: 30,
                              }}
                            >
                              {endpoint.riskScore}%
                            </Typography>
                          </Box>
                        </TableCell>
                        
                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'rgba(255, 255, 255, 0.8)',
                              fontFamily: 'Fira Code, monospace',
                            }}
                          >
                            {endpoint.lastSeen}
                          </Typography>
                        </TableCell>
                        
                        <TableCell>
                          <IconButton
                            onClick={(e) => handleMenuOpen(e, endpoint)}
                            sx={{
                              color: 'rgba(255, 255, 255, 0.6)',
                              '&:hover': {
                                color: '#00d4ff',
                                background: 'rgba(0, 212, 255, 0.1)',
                              },
                            }}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </TableCell>
                      </motion.tr>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Action Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: {
                  background: 'rgba(10, 10, 15, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  minWidth: 200,
                },
              }}
            >
              <MenuItem onClick={handleMenuClose}>
                <SecurityIcon sx={{ mr: 2, color: '#00d4ff' }} />
                Scan Device
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <WarningIcon sx={{ mr: 2, color: '#ffa726' }} />
                View Threats
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ComputerIcon sx={{ mr: 2, color: '#4caf50' }} />
                Remote Access
              </MenuItem>
            </Menu>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Endpoints;