import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated background grid */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'pulse 3s ease-in-out infinite',
          zIndex: 1,
        }}
      />

      {/* Loading content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ zIndex: 2, textAlign: 'center' }}
      >
        {/* Custom cyber loader */}
        <Box
          sx={{
            position: 'relative',
            display: 'inline-block',
            mb: 4,
          }}
        >
          <CircularProgress
            size={80}
            thickness={2}
            sx={{
              color: '#00d4ff',
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
                filter: 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.5))',
              },
            }}
          />
          <CircularProgress
            size={60}
            thickness={3}
            sx={{
              color: '#ff6b6b',
              position: 'absolute',
              top: 10,
              left: 10,
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
                filter: 'drop-shadow(0 0 8px rgba(255, 107, 107, 0.4))',
              },
            }}
            variant="determinate"
            value={75}
          />
        </Box>

        {/* Loading text */}
        <motion.div
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Typography
            variant="h5"
            className="cyber-text"
            sx={{
              fontFamily: 'Fira Code, monospace',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              mb: 1,
            }}
          >
            Initializing Security Protocols
          </Typography>
        </motion.div>

        <Typography
          variant="body2"
          sx={{
            color: 'rgba(255, 255, 255, 0.5)',
            fontFamily: 'Fira Code, monospace',
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
          }}
        >
          Loading AktibGuard Command Center...
        </Typography>
      </motion.div>

      {/* Animated scan line */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)',
          animation: 'scanLine 3s infinite',
          zIndex: 3,
        }}
      />
    </Box>
  );
};

export default LoadingScreen;