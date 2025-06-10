import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { Warning as WarningIcon, GPS as RadarIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';

const ThreatRadar = () => {
  const [threats, setThreats] = useState([]);
  const [scanAngle, setScanAngle] = useState(0);

  // Simulate real-time threat detection
  useEffect(() => {
    const threatData = [
      { id: 1, type: 'Malware', severity: 'high', x: 60, y: 40, detected: Date.now() - 300000 },
      { id: 2, type: 'Phishing', severity: 'medium', x: 80, y: 70, detected: Date.now() - 600000 },
      { id: 3, type: 'Intrusion', severity: 'critical', x: 30, y: 60, detected: Date.now() - 120000 },
    ];
    setThreats(threatData);

    // Animate radar sweep
    const interval = setInterval(() => {
      setScanAngle(prev => (prev + 2) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return '#ff4757';
      case 'high': return '#ff6b6b';
      case 'medium': return '#ffa726';
      case 'low': return '#4caf50';
      default: return '#00d4ff';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="glass-morphism" sx={{ height: '100%' }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <RadarIcon sx={{ color: '#00d4ff', mr: 1, fontSize: 28 }} />
            <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600 }}>
              Threat Radar
            </Typography>
            <Chip
              label="LIVE"
              size="small"
              sx={{
                ml: 'auto',
                backgroundColor: '#ff4757',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '0.7rem',
                animation: 'pulse 2s infinite',
              }}
            />
          </Box>

          {/* Radar Display */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: 200,
              background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%)',
              borderRadius: '50%',
              border: '2px solid rgba(0, 212, 255, 0.3)',
              overflow: 'hidden',
              mb: 3,
            }}
          >
            {/* Radar Grid */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                '&::before, &::after': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  border: '1px solid rgba(0, 212, 255, 0.2)',
                  borderRadius: '50%',
                },
                '&::before': {
                  width: '66%',
                  height: '66%',
                },
                '&::after': {
                  width: '33%',
                  height: '33%',
                },
              }}
            />

            {/* Cross Lines */}
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: '1px',
                background: 'rgba(0, 212, 255, 0.2)',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '50%',
                width: '1px',
                background: 'rgba(0, 212, 255, 0.2)',
              }}
            />

            {/* Radar Sweep */}
            <motion.div
              animate={{ rotate: scanAngle }}
              transition={{ duration: 0.05, ease: "linear" }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transformOrigin: '0 0',
                width: '50%',
                height: '2px',
                background: 'linear-gradient(90deg, rgba(0, 212, 255, 0.8) 0%, transparent 100%)',
                borderRadius: '1px',
                zIndex: 2,
              }}
            />

            {/* Threat Points */}
            {threats.map((threat) => (
              <motion.div
                key={threat.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.2 }}
                style={{
                  position: 'absolute',
                  top: `${threat.y}%`,
                  left: `${threat.x}%`,
                  transform: 'translate(-50%, -50%)',
                  width: 8,
                  height: 8,
                  backgroundColor: getSeverityColor(threat.severity),
                  borderRadius: '50%',
                  boxShadow: `0 0 15px ${getSeverityColor(threat.severity)}`,
                  cursor: 'pointer',
                  zIndex: 3,
                }}
              />
            ))}
          </Box>

          {/* Threat Summary */}
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                mb: 2,
                fontWeight: 600,
              }}
            >
              Active Threats
            </Typography>
            
            {threats.map((threat) => (
              <Box
                key={threat.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 1,
                  p: 1,
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 1,
                  border: `1px solid ${getSeverityColor(threat.severity)}40`,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.75rem' }}
                >
                  {threat.type}
                </Typography>
                <Chip
                  label={threat.severity.toUpperCase()}
                  size="small"
                  sx={{
                    backgroundColor: `${getSeverityColor(threat.severity)}20`,
                    color: getSeverityColor(threat.severity),
                    fontSize: '0.65rem',
                    height: 20,
                  }}
                />
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ThreatRadar;