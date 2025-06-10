import React from 'react';
import { Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const Login = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h1" sx={{ fontSize: '2rem', fontWeight: 700, mb: 2 }}>
          Login Page
        </Typography>
      </Box>
    </motion.div>
  );
};

export default Login;