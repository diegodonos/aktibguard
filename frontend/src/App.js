import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@mui/material';

// Layout components
import MainLayout from './components/layout/MainLayout';
import LoadingScreen from './components/common/LoadingScreen';

// Page components (lazy loaded for better performance)
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Endpoints = React.lazy(() => import('./pages/Endpoints'));
const ThreatDetection = React.lazy(() => import('./pages/ThreatDetection'));
const SecurityAnalytics = React.lazy(() => import('./pages/SecurityAnalytics'));
const Configuration = React.lazy(() => import('./pages/Configuration'));
const Login = React.lazy(() => import('./pages/Login'));

function App() {
  // In a real app, this would come from authentication context
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <Box className="cyber-background" sx={{ minHeight: '100vh' }}>
      <MainLayout>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/machines" element={<Endpoints />} />
            <Route path="/threats" element={<ThreatDetection />} />
            <Route path="/analytics" element={<SecurityAnalytics />} />
            <Route path="/settings" element={<Configuration />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </Box>
  );
}

export default App;