
// src/components/user/UserDashboard.js
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
  Card,
  CardContent,
  Button,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  SportsTennis,
  Stars,
  Person,
  Settings,
} from '@mui/icons-material';

const UserDashboard = () => {
  const [open, setOpen] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState('home');

  const menuItems = [
    { text: 'Home', icon: <Home />, id: 'home' },
    { text: 'Events', icon: <SportsTennis />, id: 'events' },
    { text: 'My Tips', icon: <Stars />, id: 'tips' },
    { text: 'Profile', icon: <Person />, id: 'profile' },
    { text: 'Settings', icon: <Settings />, id: 'settings' },
  ];

  const upcomingEvents = [
    {
      title: 'World Championship Finals',
      date: '2024-10-25',
      premium: true,
    },
    {
      title: 'European Open',
      date: '2024-10-26',
      premium: false,
    },
    {
      title: 'Asian Cup',
      date: '2024-10-27',
      premium: true,
    },
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
            User Dashboard
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
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Upcoming Events
                </Typography>
                <Grid container spacing={2}>
                  {upcomingEvents.map((event, index) => (
                    <Grid item xs={12} key={index}>
                      <Paper sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <Typography variant="h6">{event.title}</Typography>
                            <Typography color="textSecondary">
                              {event.date}
                            </Typography>
                          </div>
                          <div>
                            {event.premium ? (
                              <Chip label="Premium" color="secondary" />
                            ) : (
                              <Chip label="Free" />
                            )}
                            <Button
                              variant="contained"
                              color="primary"
                              sx={{ ml: 1 }}
                            >
                              View
                            </Button>
                          </div>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Your Stats
                </Typography>
                <Typography variant="body1">
                  Tips Success Rate: 75%
                </Typography>
                <Typography variant="body1">
                  Tips Viewed: 24
                </Typography>
                <Typography variant="body1">
                  Premium Status: Active
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserDashboard;
