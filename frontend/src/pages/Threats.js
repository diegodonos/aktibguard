import React from 'react';
import { Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const Threats = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box>
        <Typography variant="h1" sx={{ fontSize: '2rem', fontWeight: 700, mb: 2 }}>
          Threat Detection
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Real-time threat analysis and incident response management.
        </Typography>
        
        <Box sx={{ mt: 4, textAlign: 'center', color: 'rgba(255, 255, 255, 0.5)' }}>
          <Typography>🚧 Page under construction</Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Threats;