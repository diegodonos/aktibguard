import React, { useState, useMemo } from 'react';
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
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Warning as WarningIcon,
  Error as ErrorIcon,
  Security as SecurityIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Refresh as RefreshIcon,
  Block as BlockIcon,
  Visibility as ViewIcon,
  Delete as DeleteIcon,
  Timeline as TimelineIcon,
  Computer as ComputerIcon,
  Shield as ShieldIcon,
  Code as CodeIcon,
  Link as LinkIcon,
  Email as EmailIcon,
  Storage as StorageIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { AreaChart, Area, LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ThreatDetection = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedThreat, setSelectedThreat] = useState(null);

  // Sample threat data
  const threats = [
    {
      id: 1,
      name: 'Trojan.Win32.GenKrypt',
      type: 'malware',
      severity: 'critical',
      status: 'active',
      endpoint: 'WORKSTATION-007',
      user: 'Lisa Anderson',
      detected: '2024-01-15 14:30:25',
      source: 'Real-time Protection',
      path: 'C:\\Windows\\Temp\\suspicious.exe',
      hash: 'a1b2c3d4e5f6...',
      riskScore: 95,
    },
    {
      id: 2,
      name: 'Phishing Email Detection',
      type: 'phishing',
      severity: 'high',
      status: 'quarantined',
      endpoint: 'LAPTOP-005',
      user: 'Sarah Connor',
      detected: '2024-01-15 13:15:10',
      source: 'Email Scanner',
      path: 'outlook://inbox/suspicious_email.msg',
      hash: 'x9y8z7w6v5u4...',
      riskScore: 78,
    },
    {
      id: 3,
      name: 'Suspicious Network Activity',
      type: 'network',
      severity: 'medium',
      status: 'investigating',
      endpoint: 'SERVER-01',
      user: 'System',
      detected: '2024-01-15 12:45:33',
      source: 'Network Monitor',
      path: 'TCP/443 -> 192.168.1.100',
      hash: 'n/a',
      riskScore: 65,
    },
    {
      id: 4,
      name: 'Unauthorized Access Attempt',
      type: 'intrusion',
      severity: 'high',
      status: 'blocked',
      endpoint: 'FIREWALL-01',
      user: 'Unknown',
      detected: '2024-01-15 11:20:15',
      source: 'Firewall',
      path: 'SSH/22 from 203.0.113.42',
      hash: 'n/a',
      riskScore: 82,
    },
    {
      id: 5,
      name: 'Suspicious Registry Modification',
      type: 'behavior',
      severity: 'medium',
      status: 'resolved',
      endpoint: 'DESKTOP-001',
      user: 'John Doe',
      detected: '2024-01-15 10:10:45',
      source: 'Behavior Analysis',
      path: 'HKEY_LOCAL_MACHINE\\SOFTWARE\\...',
      hash: 'r5t6y7u8i9o0...',
      riskScore: 55,
    },
  ];

  // Sample timeline data
  const timelineData = [
    { time: '00:00', threats: 12, blocked: 10 },
    { time: '04:00', threats: 8, blocked: 7 },
    { time: '08:00', threats: 25, blocked: 22 },
    { time: '12:00', threats: 35, blocked: 28 },
    { time: '16:00', threats: 42, blocked: 35 },
    { time: '20:00', threats: 28, blocked: 24 },
    { time: '24:00', threats: 15, blocked: 13 },
  ];

  // Threat type distribution
  const threatTypes = [
    { name: 'Malware', value: 35, color: '#ff4757' },
    { name: 'Phishing', value: 25, color: '#ffa726' },
    { name: 'Network', value: 20, color: '#00d4ff' },
    { name: 'Intrusion', value: 15, color: '#ff6b6b' },
    { name: 'Behavior', value: 5, color: '#4caf50' },
  ];

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleMenuOpen = (event, threat) => {
    setAnchorEl(event.currentTarget);
    setSelectedThreat(threat);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedThreat(null);
  };

  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'critical':
        return { color: '#ff4757', label: 'Critical', bgColor: 'rgba(255, 71, 87, 0.1)' };
      case 'high':
        return { color: '#ff6b6b', label: 'High', bgColor: 'rgba(255, 107, 107, 0.1)' };
      case 'medium':
        return { color: '#ffa726', label: 'Medium', bgColor: 'rgba(255, 167, 38, 0.1)' };
      case 'low':
        return { color: '#4caf50', label: 'Low', bgColor: 'rgba(76, 175, 80, 0.1)' };
      default:
        return { color: '#ffffff', label: 'Unknown', bgColor: 'rgba(255, 255, 255, 0.1)' };
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'malware': return CodeIcon;
      case 'phishing': return EmailIcon;
      case 'network': return LinkIcon;
      case 'intrusion': return ShieldIcon;
      case 'behavior': return ComputerIcon;
      default: return WarningIcon;
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'active':
        return { color: '#ff4757', label: 'Active' };
      case 'quarantined':
        return { color: '#ffa726', label: 'Quarantined' };
      case 'blocked':
        return { color: '#00d4ff', label: 'Blocked' };
      case 'investigating':
        return { color: '#ff6b6b', label: 'Investigating' };
      case 'resolved':
        return { color: '#4caf50', label: 'Resolved' };
      default:
        return { color: '#ffffff', label: 'Unknown' };
    }
  };

  const filteredThreats = useMemo(() => {
    return threats.filter(threat =>
      threat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      threat.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      threat.user.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const stats = {
    total: threats.length,
    active: threats.filter(t => t.status === 'active').length,
    blocked: threats.filter(t => t.status === 'blocked').length,
    resolved: threats.filter(t => t.status === 'resolved').length,
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
              Threat Detection Center
            </Typography>
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
              Refresh Scan
            </Button>
          </Box>
          
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: 'Fira Code, monospace',
              fontSize: '0.875rem',
            }}
          >
            Advanced threat detection and incident response management
          </Typography>
        </motion.div>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { label: 'Total Threats', value: stats.total, color: '#ff4757', icon: WarningIcon },
          { label: 'Active Threats', value: stats.active, color: '#ff6b6b', icon: ErrorIcon },
          { label: 'Blocked', value: stats.blocked, color: '#00d4ff', icon: BlockIcon },
          { label: 'Resolved', value: stats.resolved, color: '#4caf50', icon: SecurityIcon },
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

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Threat Timeline */}
        <Grid item xs={12} lg={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="glass-morphism">
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <TimelineIcon sx={{ color: '#00d4ff', mr: 1, fontSize: 28 }} />
                  <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600 }}>
                    Threat Activity Timeline
                  </Typography>
                </Box>
                
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={timelineData}>
                      <defs>
                        <linearGradient id="threatsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ff4757" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#ff4757" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="blockedGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="threats"
                        stroke="#ff4757"
                        fillOpacity={1}
                        fill="url(#threatsGradient)"
                        strokeWidth={2}
                      />
                      <Area
                        type="monotone"
                        dataKey="blocked"
                        stroke="#00d4ff"
                        fillOpacity={1}
                        fill="url(#blockedGradient)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Threat Distribution */}
        <Grid item xs={12} lg={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="glass-morphism">
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600, mb: 3 }}>
                  Threat Types Distribution
                </Typography>
                
                <Box sx={{ height: 200, mb: 2 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={threatTypes}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        dataKey="value"
                        stroke="none"
                      >
                        {threatTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                
                <List disablePadding>
                  {threatTypes.map((type) => (
                    <ListItem key={type.name} disablePadding sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 20 }}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: type.color,
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={type.name}
                        secondary={`${type.value}%`}
                        primaryTypographyProps={{
                          variant: 'body2',
                          sx: { color: 'rgba(255, 255, 255, 0.8)' },
                        }}
                        secondaryTypographyProps={{
                          variant: 'caption',
                          sx: { color: type.color, fontWeight: 600 },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Threats Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="glass-morphism">
          <CardContent sx={{ p: 3 }}>
            {/* Tabs and Search */}
            <Box sx={{ borderBottom: 1, borderColor: 'rgba(255, 255, 255, 0.1)', mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Tabs value={currentTab} onChange={handleTabChange}>
                  <Tab label="All Threats" sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                  <Tab label="Active" sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                  <Tab label="Quarantined" sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                  <Tab label="Resolved" sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                </Tabs>
                
                <TextField
                  size="small"
                  placeholder="Search threats..."
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
            </Box>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600 }}>
                      Threat
                    </TableCell>
                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600 }}>
                      Severity
                    </TableCell>
                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600 }}>
                      Status
                    </TableCell>
                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600 }}>
                      Endpoint
                    </TableCell>
                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600 }}>
                      Risk Score
                    </TableCell>
                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600 }}>
                      Detected
                    </TableCell>
                    <TableCell sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600 }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredThreats.map((threat, index) => {
                    const severityConfig = getSeverityConfig(threat.severity);
                    const statusConfig = getStatusConfig(threat.status);
                    const TypeIcon = getTypeIcon(threat.type);

                    return (
                      <motion.tr
                        key={threat.id}
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
                                background: severityConfig.bgColor,
                                border: `1px solid ${severityConfig.color}40`,
                              }}
                            >
                              <TypeIcon sx={{ color: severityConfig.color }} />
                            </Avatar>
                            <Box>
                              <Typography
                                variant="subtitle2"
                                sx={{ color: '#ffffff', fontWeight: 600 }}
                              >
                                {threat.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: 'rgba(255, 255, 255, 0.6)',
                                  fontFamily: 'Fira Code, monospace',
                                }}
                              >
                                {threat.source}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        
                        <TableCell>
                          <Chip
                            label={severityConfig.label}
                            size="small"
                            sx={{
                              backgroundColor: severityConfig.bgColor,
                              color: severityConfig.color,
                              border: `1px solid ${severityConfig.color}40`,
                              fontWeight: 600,
                            }}
                          />
                        </TableCell>
                        
                        <TableCell>
                          <Chip
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
                          <Box>
                            <Typography variant="body2" sx={{ color: '#ffffff' }}>
                              {threat.endpoint}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: 'rgba(255, 255, 255, 0.6)' }}
                            >
                              {threat.user}
                            </Typography>
                          </Box>
                        </TableCell>
                        
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 100 }}>
                            <LinearProgress
                              variant="determinate"
                              value={threat.riskScore}
                              sx={{
                                flex: 1,
                                height: 6,
                                borderRadius: 3,
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: severityConfig.color,
                                  borderRadius: 3,
                                },
                              }}
                            />
                            <Typography
                              variant="caption"
                              sx={{
                                color: severityConfig.color,
                                fontWeight: 600,
                                minWidth: 30,
                              }}
                            >
                              {threat.riskScore}%
                            </Typography>
                          </Box>
                        </TableCell>
                        
                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'rgba(255, 255, 255, 0.8)',
                              fontFamily: 'Fira Code, monospace',
                              fontSize: '0.75rem',
                            }}
                          >
                            {threat.detected}
                          </Typography>
                        </TableCell>
                        
                        <TableCell>
                          <IconButton
                            onClick={(e) => handleMenuOpen(e, threat)}
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
                <ViewIcon sx={{ mr: 2, color: '#00d4ff' }} />
                View Details
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <BlockIcon sx={{ mr: 2, color: '#ffa726' }} />
                Quarantine
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <DeleteIcon sx={{ mr: 2, color: '#ff4757' }} />
                Delete Threat
              </MenuItem>
            </Menu>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default ThreatDetection;