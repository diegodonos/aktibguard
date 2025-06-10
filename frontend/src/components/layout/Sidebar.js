import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Chip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Computer as ComputerIcon,
  Analytics as AnalyticsIcon,
  Settings as SettingsIcon,
  Warning as WarningIcon,
  Shield as ShieldIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const menuItems = [
  {
    id: 'dashboard',
    label: 'Security Dashboard',
    icon: DashboardIcon,
    path: '/dashboard',
    badge: null,
  },
  {
    id: 'machines',
    label: 'Endpoints',
    icon: ComputerIcon,
    path: '/machines',
    badge: '24',
  },
  {
    id: 'threats',
    label: 'Threat Detection',
    icon: WarningIcon,
    path: '/threats',
    badge: '3',
    badgeColor: 'error',
  },
  {
    id: 'analytics',
    label: 'Security Analytics',
    icon: AnalyticsIcon,
    path: '/analytics',
    badge: null,
  },
  {
    id: 'settings',
    label: 'Configuration',
    icon: SettingsIcon,
    path: '/settings',
    badge: null,
  },
];

const Sidebar = ({ onItemClick }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleItemClick = (path) => {
    navigate(path);
    if (onItemClick) onItemClick();
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(10, 10, 15, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Logo section */}
      <Box
        sx={{
          p: 3,
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ShieldIcon
            sx={{
              fontSize: 40,
              color: '#00d4ff',
              mb: 1,
              filter: 'drop-shadow(0 0 10px rgba(0, 212, 255, 0.5))',
            }}
          />
          <Typography
            variant="h6"
            className="gradient-text"
            sx={{ fontWeight: 700, mb: 0.5 }}
          >
            AktibGuard
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255, 255, 255, 0.5)',
              fontFamily: 'Fira Code, monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
            }}
          >
            SECURITY COMMAND CENTER
          </Typography>
        </motion.div>
      </Box>

      {/* System status */}
      <Box sx={{ p: 2 }}>
        <Box
          className="glass-morphism"
          sx={{
            p: 2,
            textAlign: 'center',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.08)',
            },
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: 'rgba(255, 255, 255, 0.6)',
              display: 'block',
              mb: 1,
            }}
          >
            System Status
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#4caf50',
                boxShadow: '0 0 8px rgba(76, 175, 80, 0.6)',
                animation: 'pulse 2s infinite',
              }}
            />
            <Typography
              variant="body2"
              className="status-online"
              sx={{ fontWeight: 500 }}
            >
              OPERATIONAL
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Navigation menu */}
      <Box sx={{ flex: 1, px: 1 }}>
        <List disablePadding>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ListItem disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    onClick={() => handleItemClick(item.path)}
                    sx={{
                      borderRadius: 2,
                      mx: 1,
                      transition: 'all 0.3s ease',
                      background: isActive
                        ? 'linear-gradient(45deg, rgba(0, 212, 255, 0.1), rgba(0, 212, 255, 0.05))'
                        : 'transparent',
                      border: isActive
                        ? '1px solid rgba(0, 212, 255, 0.3)'
                        : '1px solid transparent',
                      '&:hover': {
                        background: isActive
                          ? 'linear-gradient(45deg, rgba(0, 212, 255, 0.15), rgba(0, 212, 255, 0.08))'
                          : 'rgba(255, 255, 255, 0.05)',
                        borderColor: 'rgba(0, 212, 255, 0.2)',
                        boxShadow: isActive
                          ? '0 4px 15px rgba(0, 212, 255, 0.2)'
                          : '0 2px 8px rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: isActive ? '#00d4ff' : 'rgba(255, 255, 255, 0.7)',
                        minWidth: 40,
                        transition: 'color 0.3s ease',
                        filter: isActive
                          ? 'drop-shadow(0 0 5px rgba(0, 212, 255, 0.5))'
                          : 'none',
                      }}
                    >
                      <Icon />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        variant: 'body2',
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
                        fontSize: '0.875rem',
                      }}
                    />
                    {item.badge && (
                      <Chip
                        label={item.badge}
                        size="small"
                        color={item.badgeColor || 'primary'}
                        sx={{
                          height: 20,
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          minWidth: 24,
                          '& .MuiChip-label': {
                            px: 1,
                          },
                        }}
                      />
                    )}
                  </ListItemButton>
                </ListItem>
              </motion.div>
            );
          })}
        </List>
      </Box>

      {/* Footer info */}
      <Box sx={{ p: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <Typography
          variant="caption"
          sx={{
            color: 'rgba(255, 255, 255, 0.4)',
            display: 'block',
            textAlign: 'center',
            fontFamily: 'Fira Code, monospace',
          }}
        >
          v1.1.0 • Enterprise
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: 'rgba(255, 255, 255, 0.3)',
            display: 'block',
            textAlign: 'center',
            fontSize: '0.65rem',
            mt: 0.5,
          }}
        >
          © 2024 AktibGuard
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;