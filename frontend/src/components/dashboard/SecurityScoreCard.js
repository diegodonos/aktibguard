import React from 'react';
import { Card, CardContent, Typography, Box, LinearProgress } from '@mui/material';
import { Shield as ShieldIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const SecurityScoreCard = () => {
  const securityScore = 94;
  const scoreColor = securityScore >= 90 ? '#4caf50' : securityScore >= 70 ? '#ffa726' : '#ff6b6b';

  const securityMetrics = [
    { label: 'Endpoint Protection', value: 98, color: '#4caf50' },
    { label: 'Network Security', value: 92, color: '#00d4ff' },
    { label: 'Data Encryption', value: 96, color: '#4caf50' },
    { label: 'Access Control', value: 89, color: '#ffa726' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="glass-morphism" sx={{ height: '100%' }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <ShieldIcon sx={{ color: scoreColor, mr: 1, fontSize: 28 }} />
            <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600 }}>
              Security Score
            </Typography>
          </Box>

          {/* Main Score Display */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: '3.5rem',
                  fontWeight: 700,
                  color: scoreColor,
                  textShadow: `0 0 20px ${scoreColor}40`,
                  mb: 1,
                }}
              >
                {securityScore}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.875rem',
                }}
              >
                Overall Security Rating
              </Typography>
            </motion.div>
          </Box>

          {/* Security Metrics Breakdown */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                mb: 2,
                fontWeight: 600,
              }}
            >
              Security Components
            </Typography>
            
            {securityMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              >
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '0.75rem',
                      }}
                    >
                      {metric.label}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: metric.color,
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    >
                      {metric.value}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={metric.value}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: metric.color,
                        borderRadius: 3,
                        boxShadow: `0 0 10px ${metric.color}60`,
                      },
                    }}
                  />
                </Box>
              </motion.div>
            ))}
          </Box>

          {/* Score Trend */}
          <Box
            sx={{
              mt: 3,
              p: 2,
              background: 'rgba(76, 175, 80, 0.1)',
              border: '1px solid rgba(76, 175, 80, 0.3)',
              borderRadius: 2,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: '#4caf50',
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            >
              ↗ +5% improvement from last month
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SecurityScoreCard;