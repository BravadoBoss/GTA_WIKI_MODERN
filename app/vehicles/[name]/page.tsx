'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Typography,
  Box,
  Paper,
  Breadcrumbs,
  Link,
  Button,
  Chip,
  Grid,
  Divider,
} from '@mui/material';
import DashboardLayout from '../../components/DashboardLayout';
import JsonDataViewer from '../../components/JsonDataViewer';
import { getVehicleByName, Vehicle } from '../../lib/data';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

export default function VehicleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const vehicleName = params?.name as string;
  const decodedName = vehicleName ? decodeURIComponent(vehicleName) : '';
  
  const [vehicle, setVehicle] = useState<Vehicle | undefined>(undefined);

  useEffect(() => {
    if (!decodedName) return;
    const found = getVehicleByName(decodedName);
    setVehicle(found);
  }, [decodedName]);

  if (!vehicle) {
    return (
      <DashboardLayout>
        <Box sx={{ width: '100%' }}>
          <Typography variant="h5" color="error">
            Vehicle not found: {decodedName}
          </Typography>
          <Button startIcon={<ArrowBackIcon />} onClick={() => router.back()} sx={{ mt: 2 }}>
            Go Back
          </Button>
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Box sx={{ width: '100%' }}>
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link
            component="button"
            variant="body1"
            onClick={() => router.push('/')}
            sx={{ 
              color: 'text.secondary',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
              cursor: 'pointer',
            }}
          >
            <HomeIcon sx={{ mr: 0.5, fontSize: 16, verticalAlign: 'middle' }} />
            Home
          </Link>
          <Link
            component="button"
            variant="body1"
            onClick={() => router.push('/vehicles')}
            sx={{ 
              color: 'text.secondary',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
              cursor: 'pointer',
            }}
          >
            Vehicles
          </Link>
          <Typography color="text.primary">{vehicle.DisplayName?.English || vehicle.Name}</Typography>
        </Breadcrumbs>

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{ mb: 3 }}
        >
          Back
        </Button>

        <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <DirectionsCarIcon sx={{ mr: 1, color: 'primary.main', fontSize: 32 }} />
            <Box>
              <Typography variant="h4" component="h1" fontWeight={600}>
                {vehicle.DisplayName?.English || vehicle.Name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                {vehicle.Name}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Quick Info
            </Typography>
            <Grid container spacing={2}>
              {vehicle.ManufacturerDisplayName?.English && (
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="caption" color="text.secondary">Manufacturer</Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {vehicle.ManufacturerDisplayName.English}
                  </Typography>
                </Grid>
              )}
              {vehicle.Class && (
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="caption" color="text.secondary">Class</Typography>
                  <Chip label={vehicle.Class} size="small" />
                </Grid>
              )}
              {vehicle.Type && (
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="caption" color="text.secondary">Type</Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {vehicle.Type}
                  </Typography>
                </Grid>
              )}
              {vehicle.DlcName && (
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="caption" color="text.secondary">DLC</Typography>
                  <Chip label={vehicle.DlcName} size="small" variant="outlined" />
                </Grid>
              )}
              {vehicle.Hash && (
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="caption" color="text.secondary">Hash</Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'info.main' }}>
                    {vehicle.HexHash || `0x${vehicle.Hash.toString(16).toUpperCase().padStart(8, '0')}`}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>

          <Divider sx={{ my: 3 }} />

          <JsonDataViewer data={vehicle} title="Complete Vehicle Data" />
        </Paper>
      </Box>
    </DashboardLayout>
  );
}

