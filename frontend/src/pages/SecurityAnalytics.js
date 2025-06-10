import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  FormControl,
  Select,
  MenuItem,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Security as SecurityIcon,
  Warning as WarningIcon,
  Timeline as TimelineIcon,
  Download as DownloadIcon,
  Speed as SpeedIcon,
  Shield as ShieldIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

const SecurityAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7d');

  // Sample analytics data
  const securityMetrics = [
    { time: 'Mon', threats: 45, blocked: 42, incidents: 3 },
    { time: 'Tue', threats: 52, blocked: 48, incidents: 4 },
    { time: 'Wed', threats: 38, blocked: 35, incidents: 3 },
    { time: 'Thu', threats: 67, blocked: 58, incidents: 9 },
    { time: 'Fri', threats: 71, blocked: 65, incidents: 6 },
    { time: 'Sat', threats: 23, blocked: 21, incidents: 2 },
    { time: 'Sun', threats: 19, blocked: 18, incidents: 1 },
  ];

  const riskAssessment = [
    { category: 'Network Security', score: 85, max: 100 },
    { category: 'Endpoint Protection', score: 92, max: 100 },
    { category: 'Data Protection', score: 78, max: 100 },
    { category: 'Access Control', score: 88, max: 100 },
    { category: 'Incident Response', score: 95, max: 100 },
    { category: 'Compliance', score: 82, max: 100 },
  ];

  const vulnerabilityData = [
    { severity: 'Critical', count: 3, color: '#ff4757' },
    { severity: 'High', count: 12, color: '#ff6b6b' },
    { severity: 'Medium', count: 28, color: '#ffa726' },
    { severity: 'Low', count: 45, color: '#4caf50' },
  ];

  const topThreats = [
    { name: 'Malware Detection', count: 127, trend: 'up', change: '+15%' },
    { name: 'Phishing Attempts', count: 89, trend: 'down', change: '-8%' },
    { name: 'Unauthorized Access', count: 56, trend: 'up', change: '+22%' },
    { name: 'Data Exfiltration', count: 34, trend: 'down', change: '-12%' },
    { name: 'Network Intrusion', count: 23, trend: 'up', change: '+5%' },
  ];

  const complianceMetrics = [
    { framework: 'ISO 27001', score: 94, status: 'compliant' },
    { framework: 'NIST', score: 89, status: 'compliant' },
    { framework: 'GDPR', score: 87, status: 'compliant' },
    { framework: 'SOX', score: 76, status: 'warning' },
    { framework: 'HIPAA', score: 92, status: 'compliant' },
  ];

  const incidentTrends = [
    { month: 'Jan', incidents: 15, resolved: 14, mttr: 2.3 },
    { month: 'Feb', incidents: 18, resolved: 17, mttr: 2.1 },
    { month: 'Mar', incidents: 12, resolved: 12, mttr: 1.9 },
    { month: 'Apr', incidents: 22, resolved: 20, mttr: 2.5 },
    { month: 'May', incidents: 19, resolved: 19, mttr: 2.0 },
    { month: 'Jun', incidents: 16, resolved: 15, mttr: 2.2 },
  ];

  const kpiCards = [
    {
      title: 'Security Score',
      value: '94%',
      change: '+2%',
      trend: 'up',
      icon: SecurityIcon,
      color: '#4caf50',
    },
    {
      title: 'Threat Detection Rate',
      value: '98.7%',
      change: '+0.3%',
      trend: 'up',
      icon: WarningIcon,
      color: '#00d4ff',
    },
    {
      title: 'Mean Time to Response',
      value: '2.1h',
      change: '-0.4h',
      trend: 'down',
      icon: SpeedIcon,
      color: '#ffa726',
    },
    {
      title: 'Compliance Score',
      value: '87%',
      change: '+5%',
      trend: 'up',
      icon: ShieldIcon,
      color: '#ff6b6b',
    },
  ];

  const getComplianceStatus = (status) => {
    switch (status) {
      case 'compliant':
        return { color: '#4caf50', label: 'Compliant' };
      case 'warning':
        return { color: '#ffa726', label: 'Warning' };
      case 'critical':
        return { color: '#ff4757', label: 'Critical' };
      default:
        return { color: '#ffffff', label: 'Unknown' };
    }
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
              Security Analytics Dashboard
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  sx={{
                    color: '#ffffff',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(0, 212, 255, 0.5)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#00d4ff',
                    },
                  }}
                >
                  <MenuItem value="24h">Last 24h</MenuItem>
                  <MenuItem value="7d">Last 7 days</MenuItem>
                  <MenuItem value="30d">Last 30 days</MenuItem>
                  <MenuItem value="90d">Last 90 days</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
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
                Export Report
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
            Comprehensive security metrics and threat intelligence analysis
          </Typography>
        </motion.div>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === 'up' ? TrendingUpIcon : TrendingDownIcon;
          const trendColor = kpi.trend === 'up' ? '#4caf50' : '#ff6b6b';

          return (
            <Grid item xs={12} sm={6} lg={3} key={kpi.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass-morphism">
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 2,
                          background: `linear-gradient(45deg, ${kpi.color}20, ${kpi.color}10)`,
                          border: `1px solid ${kpi.color}40`,
                        }}
                      >
                        <Icon sx={{ color: kpi.color, fontSize: 24 }} />
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <TrendIcon sx={{ fontSize: 16, color: trendColor }} />
                        <Typography
                          variant="caption"
                          sx={{ color: trendColor, fontWeight: 600 }}
                        >
                          {kpi.change}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="h4" sx={{ color: '#ffffff', fontWeight: 700, mb: 0.5 }}>
                      {kpi.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {kpi.title}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Security Metrics Timeline */}
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
                    Security Metrics Overview
                  </Typography>
                </Box>
                
                <Box sx={{ height: 350 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={securityMetrics}>
                      <defs>
                        <linearGradient id="threatsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ff4757" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#ff4757" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="blockedGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="incidentsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ffa726" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#ffa726" stopOpacity={0}/>
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
                      <Area
                        type="monotone"
                        dataKey="incidents"
                        stroke="#ffa726"
                        fillOpacity={1}
                        fill="url(#incidentsGradient)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 12, height: 3, backgroundColor: '#ff4757', borderRadius: 1 }} />
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Threats Detected
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 12, height: 3, backgroundColor: '#00d4ff', borderRadius: 1 }} />
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Threats Blocked
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 12, height: 3, backgroundColor: '#ffa726', borderRadius: 1 }} />
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Security Incidents
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Risk Assessment Radar */}
        <Grid item xs={12} lg={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="glass-morphism">
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600, mb: 3 }}>
                  Security Risk Assessment
                </Typography>
                
                <Box sx={{ height: 250 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={riskAssessment}>
                      <PolarGrid stroke="rgba(255, 255, 255, 0.2)" />
                      <PolarAngleAxis 
                        dataKey="category" 
                        tick={{ fontSize: 10, fill: 'rgba(255, 255, 255, 0.7)' }}
                      />
                      <PolarRadiusAxis 
                        angle={90} 
                        domain={[0, 100]} 
                        tick={{ fontSize: 8, fill: 'rgba(255, 255, 255, 0.5)' }}
                      />
                      <Radar
                        name="Risk Score"
                        dataKey="score"
                        stroke="#00d4ff"
                        fill="#00d4ff"
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </Box>
                
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    textAlign: 'center',
                    mt: 1,
                  }}
                >
                  Overall Security Posture: <span style={{ color: '#4caf50', fontWeight: 600 }}>Strong</span>
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Additional Analytics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Vulnerability Distribution */}
        <Grid item xs={12} lg={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="glass-morphism">
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600, mb: 3 }}>
                  Vulnerability Distribution
                </Typography>
                
                <Box sx={{ height: 200, mb: 2 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={vulnerabilityData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        dataKey="count"
                        stroke="none"
                      >
                        {vulnerabilityData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
                
                <List disablePadding>
                  {vulnerabilityData.map((vuln) => (
                    <ListItem key={vuln.severity} disablePadding sx={{ py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 20 }}>
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: vuln.color,
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={vuln.severity}
                        secondary={`${vuln.count} vulnerabilities`}
                        primaryTypographyProps={{
                          variant: 'body2',
                          sx: { color: 'rgba(255, 255, 255, 0.8)' },
                        }}
                        secondaryTypographyProps={{
                          variant: 'caption',
                          sx: { color: 'rgba(255, 255, 255, 0.6)' },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Top Threats */}
        <Grid item xs={12} lg={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Card className="glass-morphism">
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600, mb: 3 }}>
                  Top Security Threats
                </Typography>
                
                <List disablePadding>
                  {topThreats.map((threat, index) => {
                    const TrendIcon = threat.trend === 'up' ? TrendingUpIcon : TrendingDownIcon;
                    const trendColor = threat.trend === 'up' ? '#ff6b6b' : '#4caf50';
                    
                    return (
                      <ListItem key={threat.name} disablePadding sx={{ mb: 2 }}>
                        <Box sx={{ width: '100%' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography
                              variant="body2"
                              sx={{ color: '#ffffff', fontWeight: 500 }}
                            >
                              {threat.name}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <TrendIcon sx={{ fontSize: 14, color: trendColor }} />
                              <Typography
                                variant="caption"
                                sx={{ color: trendColor, fontWeight: 600 }}
                              >
                                {threat.change}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography
                              variant="caption"
                              sx={{ color: 'rgba(255, 255, 255, 0.6)' }}
                            >
                              {threat.count} detections
                            </Typography>
                            <LinearProgress
                              variant="determinate"
                              value={(threat.count / 150) * 100}
                              sx={{
                                width: 60,
                                height: 4,
                                borderRadius: 2,
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: '#00d4ff',
                                  borderRadius: 2,
                                },
                              }}
                            />
                          </Box>
                        </Box>
                      </ListItem>
                    );
                  })}
                </List>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Compliance Status */}
        <Grid item xs={12} lg={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card className="glass-morphism">
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600, mb: 3 }}>
                  Compliance Status
                </Typography>
                
                <List disablePadding>
                  {complianceMetrics.map((compliance) => {
                    const statusConfig = getComplianceStatus(compliance.status);
                    
                    return (
                      <ListItem key={compliance.framework} disablePadding sx={{ mb: 2 }}>
                        <Box sx={{ width: '100%' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography
                              variant="body2"
                              sx={{ color: '#ffffff', fontWeight: 500 }}
                            >
                              {compliance.framework}
                            </Typography>
                            <Chip
                              label={statusConfig.label}
                              size="small"
                              sx={{
                                backgroundColor: `${statusConfig.color}20`,
                                color: statusConfig.color,
                                fontSize: '0.7rem',
                                height: 20,
                              }}
                            />
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LinearProgress
                              variant="determinate"
                              value={compliance.score}
                              sx={{
                                flex: 1,
                                height: 6,
                                borderRadius: 3,
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: statusConfig.color,
                                  borderRadius: 3,
                                },
                              }}
                            />
                            <Typography
                              variant="caption"
                              sx={{
                                color: statusConfig.color,
                                fontWeight: 600,
                                minWidth: 30,
                              }}
                            >
                              {compliance.score}%
                            </Typography>
                          </Box>
                        </Box>
                      </ListItem>
                    );
                  })}
                </List>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Incident Response Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <Card className="glass-morphism">
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600, mb: 3 }}>
              Incident Response Trends
            </Typography>
            
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incidentTrends}>
                  <Bar dataKey="incidents" fill="#ff6b6b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="resolved" fill="#4caf50" radius={[4, 4, 0, 0]} />
                  <Line 
                    type="monotone" 
                    dataKey="mttr" 
                    stroke="#00d4ff" 
                    strokeWidth={2}
                    dot={{ fill: '#00d4ff', strokeWidth: 2, r: 4 }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 3, backgroundColor: '#ff6b6b', borderRadius: 1 }} />
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Total Incidents
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 3, backgroundColor: '#4caf50', borderRadius: 1 }} />
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  Resolved
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 3, backgroundColor: '#00d4ff', borderRadius: 1 }} />
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                  MTTR (hours)
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default SecurityAnalytics;