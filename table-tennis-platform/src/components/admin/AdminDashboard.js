
// src/components/admin/AdminDashboard.js
import React, { useState } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Paper,
  Button,
  Card,
  CardContent,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  People,
  SportsTennis,
  Settings,
  Assessment,
  ExitToApp,
} from '@mui/icons-material';

const AdminDashboard = () => {
  const [open, setOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState('dashboard');

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, id: 'dashboard' },
    { text: 'Users', icon: <People />, id: 'users' },
    { text: 'Events', icon: <SportsTennis />, id: 'events' },
    { text: 'Analytics', icon: <Assessment />, id: 'analytics' },
    { text: 'Settings', icon: <Settings />, id: 'settings' },
  ];

  const stats = [
    { title: 'Total Users', value: '2,345' },
    { title: 'Premium Users', value: '892' },
    { title: 'Active Events', value: '15' },
    { title: 'Total Revenue', value: '$12,456' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? 240 : 70,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? 240 : 70,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => setSelectedMenu(item.id)}
                selected={selectedMenu === item.id}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                {open && <ListItemText primary={item.text} />}
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem button>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              {open && <ListItemText primary="Logout" />}
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Grid container spacing={3}>
          {stats.map((stat) => (
            <Grid item xs={12} sm={6} md={3} key={stat.title}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography color="textSecondary" gutterBottom>
                  {stat.title}
                </Typography>
                <Typography variant="h4">{stat.value}</Typography>
              </Paper>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button variant="contained" color="primary">
                    Add Event
                  </Button>
                  <Button variant="contained" color="secondary">
                    Manage Users
                  </Button>
                  <Button variant="contained">
                    View Reports
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;