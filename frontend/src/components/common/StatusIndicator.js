import React from 'react';
import { Box, Typography, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';

const StatusIndicator = ({ 
  status = 'online', 
  size = 'medium', 
  showText = false, 
  label = null 
}) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'online':
        return {
          color: '#4caf50',
          text: 'Online',
          glow: 'rgba(76, 175, 80, 0.6)',
        };
      case 'warning':
        return {
          color: '#ffa726',
          text: 'Warning',
          glow: 'rgba(255, 167, 38, 0.6)',
        };
      case 'critical':
        return {
          color: '#ff4757',
          text: 'Critical',
          glow: 'rgba(255, 71, 87, 0.6)',
        };
      case 'offline':
        return {
          color: 'rgba(255, 255, 255, 0.4)',
          text: 'Offline',
          glow: 'rgba(255, 255, 255, 0.2)',
        };
      default:
        return {
          color: '#00d4ff',
          text: 'Unknown',
          glow: 'rgba(0, 212, 255, 0.6)',
        };
    }
  };

  const getSizeConfig = (size) => {
    switch (size) {
      case 'small':
        return { width: 6, height: 6, fontSize: '0.7rem' };
      case 'large':
        return { width: 12, height: 12, fontSize: '0.9rem' };
      default:
        return { width: 8, height: 8, fontSize: '0.8rem' };
    }
  };

  const statusConfig = getStatusConfig(status);
  const sizeConfig = getSizeConfig(size);

  const indicator = (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Box
          sx={{
            width: sizeConfig.width,
            height: sizeConfig.height,
            borderRadius: '50%',
            backgroundColor: statusConfig.color,
            boxShadow: `0 0 ${sizeConfig.width * 2}px ${statusConfig.glow}`,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '60%',
              height: '60%',
              borderRadius: '50%',
              backgroundColor: statusConfig.color,
              filter: 'brightness(1.5)',
            },
          }}
        />
      </motion.div>
      
      {showText && (
        <Typography
          variant="caption"
          sx={{
            color: statusConfig.color,
            fontWeight: 500,
            fontSize: sizeConfig.fontSize,
            textShadow: `0 0 5px ${statusConfig.glow}`,
          }}
        >
          {label || statusConfig.text}
        </Typography>
      )}
    </Box>
  );

  if (label && !showText) {
    return (
      <Tooltip title={label} arrow>
        {indicator}
      </Tooltip>
    );
  }

  return indicator;
};

export default StatusIndicator;