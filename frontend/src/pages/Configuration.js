import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Chip,
  Avatar,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Alert,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Network as NetworkIcon,
  Storage as StorageIcon,
  People as PeopleIcon,
  Shield as ShieldIcon,
  Warning as WarningIcon,
  Check as CheckIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  Email as EmailIcon,
  Sms as SmsIcon,
  Webhook as WebhookIcon,
  Cloud as CloudIcon,
  Computer as ComputerIcon,
  Lock as LockIcon,
  Key as KeyIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Configuration = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [showPasswords, setShowPasswords] = useState({});
  const [settings, setSettings] = useState({
    realTimeScanning: true,
    automaticUpdates: true,
    behaviorAnalysis: true,
    networkMonitoring: true,
    emailNotifications: true,
    smsAlerts: false,
    webhookNotifications: true,
    threatLevel: 'medium',
    scanFrequency: 24,
    retentionPeriod: 90,
  });

  // Sample configuration data
  const apiKeys = [
    {
      id: 1,
      name: 'VirusTotal API',
      service: 'Threat Intelligence',
      status: 'active',
      lastUsed: '2 hours ago',
      expires: '2024-12-31',
    },
    {
      id: 2,
      name: 'Shodan API',
      service: 'Network Scanning',
      status: 'active',
      lastUsed: '1 day ago',
      expires: '2024-10-15',
    },
    {
      id: 3,
      name: 'AbuseIPDB',
      service: 'IP Reputation',
      status: 'inactive',
      lastUsed: 'Never',
      expires: '2024-08-20',
    },
  ];

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'Administrator',
      status: 'active',
      lastLogin: '2 hours ago',
    },
    {
      id: 2,
      name: 'Sarah Connor',
      email: 'sarah.connor@company.com',
      role: 'Security Analyst',
      status: 'active',
      lastLogin: '1 day ago',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      role: 'Viewer',
      status: 'inactive',
      lastLogin: '1 week ago',
    },
  ];

  const networkPolicies = [
    {
      id: 1,
      name: 'Block Malicious IPs',
      description: 'Automatically block known malicious IP addresses',
      enabled: true,
      priority: 'high',
    },
    {
      id: 2,
      name: 'DLP - Data Loss Prevention',
      description: 'Monitor and prevent sensitive data exfiltration',
      enabled: true,
      priority: 'critical',
    },
    {
      id: 3,
      name: 'Geo-blocking',
      description: 'Block traffic from specific geographic regions',
      enabled: false,
      priority: 'medium',
    },
  ];

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleSettingChange = (setting) => (event) => {
    setSettings({
      ...settings,
      [setting]: event.target.checked,
    });
  };

  const handleSliderChange = (setting) => (event, newValue) => {
    setSettings({
      ...settings,
      [setting]: newValue,
    });
  };

  const togglePasswordVisibility = (id) => {
    setShowPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#4caf50';
      case 'inactive': return 'rgba(255, 255, 255, 0.4)';
      case 'warning': return '#ffa726';
      case 'critical': return '#ff4757';
      default: return '#ffffff';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return '#ff4757';
      case 'high': return '#ff6b6b';
      case 'medium': return '#ffa726';
      case 'low': return '#4caf50';
      default: return '#ffffff';
    }
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h1" sx={{ fontSize: '2rem', fontWeight: 700, mb: 2 }}>
            System Configuration
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: 'Fira Code, monospace',
              fontSize: '0.875rem',
            }}
          >
            Configure security policies, user management, and system settings
          </Typography>
        </motion.div>
      </Box>

      {/* Configuration Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="glass-morphism">
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }}>
              <Tabs
                value={currentTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ px: 3, pt: 3 }}
              >
                <Tab 
                  icon={<SecurityIcon />} 
                  label="Security" 
                  sx={{ color: 'rgba(255, 255, 255, 0.7)' }} 
                />
                <Tab 
                  icon={<NotificationsIcon />} 
                  label="Notifications" 
                  sx={{ color: 'rgba(255, 255, 255, 0.7)' }} 
                />
                <Tab 
                  icon={<NetworkIcon />} 
                  label="Network" 
                  sx={{ color: 'rgba(255, 255, 255, 0.7)' }} 
                />
                <Tab 
                  icon={<PeopleIcon />} 
                  label="Users" 
                  sx={{ color: 'rgba(255, 255, 255, 0.7)' }} 
                />
                <Tab 
                  icon={<KeyIcon />} 
                  label="API Keys" 
                  sx={{ color: 'rgba(255, 255, 255, 0.7)' }} 
                />
                <Tab 
                  icon={<StorageIcon />} 
                  label="System" 
                  sx={{ color: 'rgba(255, 255, 255, 0.7)' }} 
                />
              </Tabs>
            </Box>

            <Box sx={{ p: 3 }}>
              {/* Security Settings */}
              <TabPanel value={currentTab} index={0}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ color: '#ffffff', mb: 3 }}>
                      Protection Settings
                    </Typography>
                    
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <ShieldIcon sx={{ color: '#00d4ff' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Real-time Scanning"
                          secondary="Monitor files and processes in real-time"
                          primaryTypographyProps={{ color: '#ffffff' }}
                          secondaryTypographyProps={{ color: 'rgba(255, 255, 255, 0.6)' }}
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={settings.realTimeScanning}
                            onChange={handleSettingChange('realTimeScanning')}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      
                      <ListItem>
                        <ListItemIcon>
                          <CloudIcon sx={{ color: '#00d4ff' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Automatic Updates"
                          secondary="Keep threat definitions up to date"
                          primaryTypographyProps={{ color: '#ffffff' }}
                          secondaryTypographyProps={{ color: 'rgba(255, 255, 255, 0.6)' }}
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={settings.automaticUpdates}
                            onChange={handleSettingChange('automaticUpdates')}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      
                      <ListItem>
                        <ListItemIcon>
                          <ComputerIcon sx={{ color: '#00d4ff' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Behavior Analysis"
                          secondary="Detect suspicious behavior patterns"
                          primaryTypographyProps={{ color: '#ffffff' }}
                          secondaryTypographyProps={{ color: 'rgba(255, 255, 255, 0.6)' }}
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={settings.behaviorAnalysis}
                            onChange={handleSettingChange('behaviorAnalysis')}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      
                      <ListItem>
                        <ListItemIcon>
                          <NetworkIcon sx={{ color: '#00d4ff' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Network Monitoring"
                          secondary="Monitor network traffic for threats"
                          primaryTypographyProps={{ color: '#ffffff' }}
                          secondaryTypographyProps={{ color: 'rgba(255, 255, 255, 0.6)' }}
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={settings.networkMonitoring}
                            onChange={handleSettingChange('networkMonitoring')}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ color: '#ffffff', mb: 3 }}>
                      Detection Levels
                    </Typography>
                    
                    <Box sx={{ mb: 4 }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
                        Threat Detection Sensitivity
                      </Typography>
                      <FormControl fullWidth>
                        <Select
                          value={settings.threatLevel}
                          onChange={(e) => setSettings({...settings, threatLevel: e.target.value})}
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
                          <MenuItem value="low">Low - Basic Protection</MenuItem>
                          <MenuItem value="medium">Medium - Recommended</MenuItem>
                          <MenuItem value="high">High - Maximum Security</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                    
                    <Box sx={{ mb: 4 }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
                        Scan Frequency (hours): {settings.scanFrequency}
                      </Typography>
                      <Slider
                        value={settings.scanFrequency}
                        onChange={handleSliderChange('scanFrequency')}
                        min={1}
                        max={168}
                        marks={[
                          { value: 1, label: '1h' },
                          { value: 24, label: '24h' },
                          { value: 168, label: '7d' },
                        ]}
                        sx={{
                          color: '#00d4ff',
                          '& .MuiSlider-thumb': {
                            backgroundColor: '#00d4ff',
                          },
                          '& .MuiSlider-track': {
                            backgroundColor: '#00d4ff',
                          },
                          '& .MuiSlider-rail': {
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          },
                        }}
                      />
                    </Box>
                    
                    <Alert 
                      severity="info" 
                      sx={{ 
                        backgroundColor: 'rgba(0, 212, 255, 0.1)',
                        color: '#00d4ff',
                        border: '1px solid rgba(0, 212, 255, 0.3)',
                      }}
                    >
                      Changes will be applied after saving the configuration.
                    </Alert>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* Notifications */}
              <TabPanel value={currentTab} index={1}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ color: '#ffffff', mb: 3 }}>
                      Alert Channels
                    </Typography>
                    
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <EmailIcon sx={{ color: '#00d4ff' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Email Notifications"
                          secondary="Send alerts via email"
                          primaryTypographyProps={{ color: '#ffffff' }}
                          secondaryTypographyProps={{ color: 'rgba(255, 255, 255, 0.6)' }}
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={settings.emailNotifications}
                            onChange={handleSettingChange('emailNotifications')}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      
                      <ListItem>
                        <ListItemIcon>
                          <SmsIcon sx={{ color: '#00d4ff' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="SMS Alerts"
                          secondary="Send critical alerts via SMS"
                          primaryTypographyProps={{ color: '#ffffff' }}
                          secondaryTypographyProps={{ color: 'rgba(255, 255, 255, 0.6)' }}
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={settings.smsAlerts}
                            onChange={handleSettingChange('smsAlerts')}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                      
                      <ListItem>
                        <ListItemIcon>
                          <WebhookIcon sx={{ color: '#00d4ff' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Webhook Notifications"
                          secondary="Integration with external systems"
                          primaryTypographyProps={{ color: '#ffffff' }}
                          secondaryTypographyProps={{ color: 'rgba(255, 255, 255, 0.6)' }}
                        />
                        <ListItemSecondaryAction>
                          <Switch
                            checked={settings.webhookNotifications}
                            onChange={handleSettingChange('webhookNotifications')}
                            color="primary"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ color: '#ffffff', mb: 3 }}>
                      Notification Settings
                    </Typography>
                    
                    <TextField
                      fullWidth
                      label="Email Recipients"
                      placeholder="admin@company.com, security@company.com"
                      multiline
                      rows={3}
                      sx={{ mb: 3 }}
                      InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
                      InputProps={{ style: { color: '#ffffff' } }}
                    />
                    
                    <TextField
                      fullWidth
                      label="Webhook URL"
                      placeholder="https://hooks.slack.com/services/..."
                      sx={{ mb: 3 }}
                      InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
                      InputProps={{ style: { color: '#ffffff' } }}
                    />
                    
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: 'rgba(0, 212, 255, 0.3)',
                        color: '#00d4ff',
                        '&:hover': {
                          borderColor: '#00d4ff',
                          background: 'rgba(0, 212, 255, 0.1)',
                        },
                      }}
                    >
                      Test Notifications
                    </Button>
                  </Grid>
                </Grid>
              </TabPanel>

              {/* Network Policies */}
              <TabPanel value={currentTab} index={2}>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" sx={{ color: '#ffffff' }}>
                      Security Policies
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      sx={{
                        background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #00b8e6, #007a99)',
                        },
                      }}
                    >
                      Add Policy
                    </Button>
                  </Box>
                  
                  {networkPolicies.map((policy) => (
                    <Accordion
                      key={policy.id}
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        mb: 2,
                        '&:before': { display: 'none' },
                      }}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#ffffff' }} />}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                          <Typography variant="subtitle1" sx={{ color: '#ffffff', flex: 1 }}>
                            {policy.name}
                          </Typography>
                          <Chip
                            label={policy.priority}
                            size="small"
                            sx={{
                              backgroundColor: `${getPriorityColor(policy.priority)}20`,
                              color: getPriorityColor(policy.priority),
                              textTransform: 'uppercase',
                            }}
                          />
                          <Switch
                            checked={policy.enabled}
                            onClick={(e) => e.stopPropagation()}
                            color="primary"
                          />
                        </Box>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
                          {policy.description}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Button size="small" startIcon={<EditIcon />}>
                            Configure
                          </Button>
                          <Button size="small" startIcon={<DeleteIcon />} color="error">
                            Delete
                          </Button>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              </TabPanel>

              {/* User Management */}
              <TabPanel value={currentTab} index={3}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ color: '#ffffff' }}>
                    User Management
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                      background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #00b8e6, #007a99)',
                      },
                    }}
                  >
                    Add User
                  </Button>
                </Box>
                
                <List>
                  {users.map((user) => (
                    <ListItem
                      key={user.id}
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 2,
                        mb: 2,
                      }}
                    >
                      <ListItemIcon>
                        <Avatar
                          sx={{
                            backgroundColor: getStatusColor(user.status),
                            color: '#ffffff',
                          }}
                        >
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={user.name}
                        secondary={
                          <Box>
                            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                              {user.email}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                              Last login: {user.lastLogin}
                            </Typography>
                          </Box>
                        }
                        primaryTypographyProps={{ color: '#ffffff' }}
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Chip
                          label={user.role}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(0, 212, 255, 0.2)',
                            color: '#00d4ff',
                          }}
                        />
                        <Chip
                          label={user.status}
                          size="small"
                          sx={{
                            backgroundColor: `${getStatusColor(user.status)}20`,
                            color: getStatusColor(user.status),
                          }}
                        />
                        <IconButton size="small" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                          <EditIcon />
                        </IconButton>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </TabPanel>

              {/* API Keys */}
              <TabPanel value={currentTab} index={4}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" sx={{ color: '#ffffff' }}>
                    API Key Management
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                      background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #00b8e6, #007a99)',
                      },
                    }}
                  >
                    Add API Key
                  </Button>
                </Box>
                
                <List>
                  {apiKeys.map((api) => (
                    <ListItem
                      key={api.id}
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 2,
                        mb: 2,
                      }}
                    >
                      <ListItemIcon>
                        <Avatar
                          sx={{
                            backgroundColor: getStatusColor(api.status),
                            color: '#ffffff',
                          }}
                        >
                          <KeyIcon />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={api.name}
                        secondary={
                          <Box>
                            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                              {api.service}
                            </Typography>
                            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                              Last used: {api.lastUsed} • Expires: {api.expires}
                            </Typography>
                          </Box>
                        }
                        primaryTypographyProps={{ color: '#ffffff' }}
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Chip
                          label={api.status}
                          size="small"
                          sx={{
                            backgroundColor: `${getStatusColor(api.status)}20`,
                            color: getStatusColor(api.status),
                          }}
                        />
                        <IconButton
                          size="small"
                          onClick={() => togglePasswordVisibility(api.id)}
                          sx={{ color: 'rgba(255, 255, 255, 0.6)' }}
                        >
                          {showPasswords[api.id] ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                        <IconButton size="small" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                          <EditIcon />
                        </IconButton>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </TabPanel>

              {/* System Settings */}
              <TabPanel value={currentTab} index={5}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ color: '#ffffff', mb: 3 }}>
                      System Configuration
                    </Typography>
                    
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
                        Log Retention Period (days): {settings.retentionPeriod}
                      </Typography>
                      <Slider
                        value={settings.retentionPeriod}
                        onChange={handleSliderChange('retentionPeriod')}
                        min={30}
                        max={365}
                        marks={[
                          { value: 30, label: '30d' },
                          { value: 90, label: '90d' },
                          { value: 180, label: '180d' },
                          { value: 365, label: '1y' },
                        ]}
                        sx={{
                          color: '#00d4ff',
                          '& .MuiSlider-thumb': {
                            backgroundColor: '#00d4ff',
                          },
                          '& .MuiSlider-track': {
                            backgroundColor: '#00d4ff',
                          },
                          '& .MuiSlider-rail': {
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          },
                        }}
                      />
                    </Box>
                    
                    <TextField
                      fullWidth
                      label="Backup Location"
                      value="/var/backups/aktibguard"
                      sx={{ mb: 3 }}
                      InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
                      InputProps={{ style: { color: '#ffffff' } }}
                    />
                    
                    <TextField
                      fullWidth
                      label="Max Log File Size (MB)"
                      value="100"
                      type="number"
                      sx={{ mb: 3 }}
                      InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
                      InputProps={{ style: { color: '#ffffff' } }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ color: '#ffffff', mb: 3 }}>
                      System Actions
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: 'rgba(0, 212, 255, 0.3)',
                          color: '#00d4ff',
                          '&:hover': {
                            borderColor: '#00d4ff',
                            background: 'rgba(0, 212, 255, 0.1)',
                          },
                        }}
                      >
                        Export Configuration
                      </Button>
                      
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: 'rgba(255, 167, 38, 0.3)',
                          color: '#ffa726',
                          '&:hover': {
                            borderColor: '#ffa726',
                            background: 'rgba(255, 167, 38, 0.1)',
                          },
                        }}
                      >
                        Create Backup
                      </Button>
                      
                      <Button
                        variant="outlined"
                        sx={{
                          borderColor: 'rgba(255, 71, 87, 0.3)',
                          color: '#ff4757',
                          '&:hover': {
                            borderColor: '#ff4757',
                            background: 'rgba(255, 71, 87, 0.1)',
                          },
                        }}
                      >
                        Reset to Defaults
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </TabPanel>
            </Box>

            {/* Save Button */}
            <Box sx={{ p: 3, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  startIcon={<CheckIcon />}
                  sx={{
                    background: 'linear-gradient(45deg, #00d4ff, #0099cc)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #00b8e6, #007a99)',
                    },
                  }}
                >
                  Save Configuration
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Configuration;