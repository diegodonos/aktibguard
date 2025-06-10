import React from 'react';
import {
  Box,
  Grid,
  Typography,
  IconButton,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Import custom components
import SecurityScoreCard from '../components/dashboard/SecurityScoreCard';
import ThreatRadar from '../components/dashboard/ThreatRadar';
import SystemMetrics from '../components/dashboard/SystemMetrics';
import RecentAlerts from '../components/dashboard/RecentAlerts';
import NetworkMap from '../components/dashboard/NetworkMap';
import QuickStats from '../components/dashboard/QuickStats';

const Dashboard = () => {
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
              Security Command Center
            </Typography>
            <IconButton
              className="cyber-glow"
              sx={{
                background: 'rgba(0, 212, 255, 0.1)',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                '&:hover': {
                  background: 'rgba(0, 212, 255, 0.2)',
                },
              }}
            >
              <RefreshIcon sx={{ color: '#00d4ff' }} />
            </IconButton>
          </Box>
          
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: 'Fira Code, monospace',
              fontSize: '0.875rem',
            }}
          >
            Real-time cybersecurity monitoring and threat analysis for your organization
          </Typography>
        </motion.div>
      </Box>

      {/* Quick Stats Row */}
      <QuickStats />

      {/* Main Dashboard Grid */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {/* Left Column */}
        <Grid item xs={12} lg={8}>
          <Grid container spacing={3}>
            {/* Security Score */}
            <Grid item xs={12} md={6}>
              <SecurityScoreCard />
            </Grid>

            {/* Threat Radar */}
            <Grid item xs={12} md={6}>
              <ThreatRadar />
            </Grid>

            {/* System Metrics */}
            <Grid item xs={12}>
              <SystemMetrics />
            </Grid>

            {/* Network Map */}
            <Grid item xs={12}>
              <NetworkMap />
            </Grid>
          </Grid>
        </Grid>

        {/* Right Column - Alerts & Activity */}
        <Grid item xs={12} lg={4}>
          <RecentAlerts />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;