import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { TrendingUp as TrendingUpIcon } from '@mui/icons-material';
import { LineChart, Line, Area, AreaChart, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const SystemMetrics = () => {
  // Sample data for charts
  const cpuData = [
    { time: '00:00', value: 45 },
    { time: '04:00', value: 52 },
    { time: '08:00', value: 68 },
    { time: '12:00', value: 75 },
    { time: '16:00', value: 82 },
    { time: '20:00', value: 65 },
    { time: '24:00', value: 48 },
  ];

  const networkData = [
    { time: '00:00', in: 120, out: 80 },
    { time: '04:00', in: 98, out: 65 },
    { time: '08:00', in: 245, out: 180 },
    { time: '12:00', in: 320, out: 280 },
    { time: '16:00', in: 398, out: 320 },
    { time: '20:00', in: 280, out: 220 },
    { time: '24:00', in: 150, out: 110 },
  ];

  const threatsData = [
    { time: '00:00', blocked: 45, detected: 52 },
    { time: '04:00', blocked: 32, detected: 38 },
    { time: '08:00', blocked: 78, detected: 85 },
    { time: '12:00', blocked: 125, detected: 132 },
    { time: '16:00', blocked: 98, detected: 105 },
    { time: '20:00', blocked: 67, detected: 72 },
    { time: '24:00', blocked: 55, detected: 60 },
  ];

  const MetricCard = ({ title, data, color, type = 'line' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="glass-morphism">
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              mb: 2,
              fontWeight: 600,
            }}
          >
            {title}
          </Typography>
          
          <Box sx={{ height: 120 }}>
            <ResponsiveContainer width="100%" height="100%">
              {type === 'area' ? (
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={color} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey={data[0].value !== undefined ? 'value' : 'in'}
                    stroke={color}
                    fillOpacity={1}
                    fill={`url(#gradient-${title})`}
                    strokeWidth={2}
                  />
                  {data[0].out !== undefined && (
                    <Area
                      type="monotone"
                      dataKey="out"
                      stroke="#ff6b6b"
                      fillOpacity={0.2}
                      fill="#ff6b6b"
                      strokeWidth={2}
                    />
                  )}
                </AreaChart>
              ) : (
                <LineChart data={data}>
                  <Line
                    type="monotone"
                    dataKey={data[0].value !== undefined ? 'value' : 'blocked'}
                    stroke={color}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: color }}
                  />
                  {data[0].detected !== undefined && (
                    <Line
                      type="monotone"
                      dataKey="detected"
                      stroke="#ffa726"
                      strokeWidth={2}
                      dot={false}
                      strokeDasharray="5 5"
                    />
                  )}
                </LineChart>
              )}
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="glass-morphism">
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <TrendingUpIcon sx={{ color: '#00d4ff', mr: 1, fontSize: 28 }} />
            <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600 }}>
              System Performance Metrics
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <MetricCard
                title="CPU Usage (%)"
                data={cpuData}
                color="#00d4ff"
                type="area"
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <MetricCard
                title="Network Traffic (MB/s)"
                data={networkData}
                color="#4caf50"
                type="area"
              />
            </Grid>
            
            <Grid item xs={12} md={4}>
              <MetricCard
                title="Threat Activity"
                data={threatsData}
                color="#ff6b6b"
                type="line"
              />
            </Grid>
          </Grid>

          {/* Real-time stats */}
          <Box
            sx={{
              mt: 3,
              p: 2,
              background: 'rgba(0, 212, 255, 0.05)',
              border: '1px solid rgba(0, 212, 255, 0.2)',
              borderRadius: 2,
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: '#00d4ff', fontWeight: 700 }}>
                1.2GB
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Memory Used
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: '#4caf50', fontWeight: 700 }}>
                99.8%
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Uptime
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: '#ffa726', fontWeight: 700 }}>
                247
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Active Connections
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ color: '#ff6b6b', fontWeight: 700 }}>
                15ms
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                Response Time
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SystemMetrics;