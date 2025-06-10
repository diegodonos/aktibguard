import React from 'react';
import { Grid, Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import {
  Computer as ComputerIcon,
  Warning as WarningIcon,
  Shield as ShieldIcon,
  TrendingUp as TrendingUpIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import StatusIndicator from '../common/StatusIndicator';

const quickStatsData = [
  {
    id: 'endpoints',
    title: 'Protected Endpoints',
    value: '247',
    change: '+12',
    trend: 'up',
    icon: ComputerIcon,
    color: '#00d4ff',
    status: 'online',
  },
  {
    id: 'threats',
    title: 'Active Threats',
    value: '3',
    change: '-2',
    trend: 'down',
    icon: WarningIcon,
    color: '#ff6b6b',
    status: 'warning',
  },
  {
    id: 'security_score',
    title: 'Security Score',
    value: '94%',
    change: '+5%',
    trend: 'up',
    icon: ShieldIcon,
    color: '#4caf50',
    status: 'online',
  },
  {
    id: 'incidents',
    title: 'Incidents Resolved',
    value: '156',
    change: '+23',
    trend: 'up',
    icon: TrendingUpIcon,
    color: '#ffa726',
    status: 'online',
  },
];

const QuickStats = () => {
  return (
    <Grid container spacing={3}>
      {quickStatsData.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <Grid item xs={12} sm={6} lg={3} key={stat.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="glass-morphism scan-line"
                sx={{
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    transition: 'all 0.3s ease',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
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
                    <StatusIndicator status={stat.status} size="small" />
                  </Box>

                  <Typography
                    variant="h3"
                    sx={{
                      color: '#ffffff',
                      fontWeight: 700,
                      mb: 0.5,
                      fontSize: '2rem',
                    }}
                  >
                    {stat.value}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      mb: 1,
                      fontSize: '0.875rem',
                    }}
                  >
                    {stat.title}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: stat.trend === 'up' ? '#4caf50' : '#ff6b6b',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    >
                      {stat.change}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontSize: '0.75rem',
                      }}
                    >
                      from last week
                    </Typography>
                  </Box>
                </CardContent>

                {/* Animated background effect */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '100%',
                    height: '100%',
                    background: `radial-gradient(circle at 100% 0%, ${stat.color}10 0%, transparent 50%)`,
                    pointerEvents: 'none',
                    zIndex: -1,
                  }}
                />
              </Card>
            </motion.div>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default QuickStats;