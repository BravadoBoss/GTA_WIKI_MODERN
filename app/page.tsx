'use client';

import { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
} from '@mui/material';
import DashboardLayout from './components/DashboardLayout';
import { getAllVehicles, getAllWeapons, getAllPeds } from './lib/data';
import InfoIcon from '@mui/icons-material/Info';
import PeopleIcon from '@mui/icons-material/People';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SearchIcon from '@mui/icons-material/Search';

export default function Home() {
  const [stats, setStats] = useState({
    vehicles: 0,
    weapons: 0,
    characters: 0,
  });

  useEffect(() => {
    const vehicles = getAllVehicles();
    const weapons = getAllWeapons();
    const characters = getAllPeds();
    
    setStats({
      vehicles: vehicles.length,
      weapons: weapons.length,
      characters: characters.length,
    });
  }, []);

  return (
    <DashboardLayout>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom fontWeight={600}>
            Grand Theft Auto V Wiki
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Your comprehensive guide to Grand Theft Auto V - characters, vehicles, weapons, and more.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={0} sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <InfoIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h5" component="h2" fontWeight={600}>
                  Welcome to GTA V Wiki
                </Typography>
              </Box>
              
              <Typography variant="body1" paragraph color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
                Grand Theft Auto V is an action-adventure game developed by Rockstar North and published by Rockstar Games. 
                Set within the fictional state of San Andreas, the game follows the story of three protagonists: Michael De Santa, 
                Trevor Philips, and Franklin Clinton. Players can switch between these characters at almost any time during gameplay.
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                Browse our comprehensive database of vehicles, weapons, and characters from Grand Theft Auto V.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PeopleIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="h6" component="h3">
                        Characters
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Explore all characters in GTA V
                    </Typography>
                    <Typography variant="h6" color="primary.main">
                      {stats.characters.toLocaleString()} characters
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href="/characters">
                      View Characters
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <DirectionsCarIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="h6" component="h3">
                        Vehicles
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Browse all vehicles in GTA V
                    </Typography>
                    <Typography variant="h6" color="primary.main">
                      {stats.vehicles.toLocaleString()} vehicles
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href="/vehicles">
                      View Vehicles
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <LocalFireDepartmentIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="h6" component="h3">
                        Weapons
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Browse all weapons in GTA V
                    </Typography>
                    <Typography variant="h6" color="primary.main">
                      {stats.weapons.toLocaleString()} weapons
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href="/weapons">
                      View Weapons
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <SearchIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="h6" component="h3">
                        Search Wiki
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Search for any GTA V content
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" href="/search">
                      Search
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}
