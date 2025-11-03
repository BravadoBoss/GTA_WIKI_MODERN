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
import { getWeaponByName, Weapon } from '../../lib/data';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

export default function WeaponDetailPage() {
  const params = useParams();
  const router = useRouter();
  const weaponName = params?.name as string;
  const decodedName = weaponName ? decodeURIComponent(weaponName) : '';
  
  const [weapon, setWeapon] = useState<Weapon | undefined>(undefined);

  useEffect(() => {
    if (!decodedName) return;
    const found = getWeaponByName(decodedName);
    setWeapon(found);
  }, [decodedName]);

  if (!weapon) {
    return (
      <DashboardLayout>
        <Box sx={{ width: '100%' }}>
          <Typography variant="h5" color="error">
            Weapon not found: {decodedName}
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
            onClick={() => router.push('/weapons')}
            sx={{ 
              color: 'text.secondary',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
              cursor: 'pointer',
            }}
          >
            Weapons
          </Link>
          <Typography color="text.primary">{weapon.TranslatedLabel?.English || weapon.Name}</Typography>
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
            <LocalFireDepartmentIcon sx={{ mr: 1, color: 'primary.main', fontSize: 32 }} />
            <Box>
              <Typography variant="h4" component="h1" fontWeight={600}>
                {weapon.TranslatedLabel?.English || weapon.Name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                {weapon.Name}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Quick Info
            </Typography>
            <Grid container spacing={2}>
              {weapon.Category && (
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="caption" color="text.secondary">Category</Typography>
                  <Chip label={weapon.Category} size="small" />
                </Grid>
              )}
              {weapon.DamageType && (
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="caption" color="text.secondary">Damage Type</Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {weapon.DamageType}
                  </Typography>
                </Grid>
              )}
              {weapon.AmmoType && (
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="caption" color="text.secondary">Ammo Type</Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {weapon.AmmoType}
                  </Typography>
                </Grid>
              )}
              {weapon.DlcName && (
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="caption" color="text.secondary">DLC</Typography>
                  <Chip label={weapon.DlcName} size="small" variant="outlined" />
                </Grid>
              )}
              {weapon.Hash && (
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="caption" color="text.secondary">Hash</Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'info.main' }}>
                    {weapon.Hash.toString(16).toUpperCase().padStart(8, '0')}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>

          <Divider sx={{ my: 3 }} />

          <JsonDataViewer data={weapon} title="Complete Weapon Data" />
        </Paper>
      </Box>
    </DashboardLayout>
  );
}

