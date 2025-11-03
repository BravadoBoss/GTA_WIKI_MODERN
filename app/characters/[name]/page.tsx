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
import { getPedByName, Ped } from '../../lib/data';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PeopleIcon from '@mui/icons-material/People';

export default function CharacterDetailPage() {
  const params = useParams();
  const router = useRouter();
  const characterName = params?.name as string;
  const decodedName = characterName ? decodeURIComponent(characterName) : '';
  
  const [character, setCharacter] = useState<Ped | undefined>(undefined);

  useEffect(() => {
    if (!decodedName) return;
    const found = getPedByName(decodedName);
    setCharacter(found);
  }, [decodedName]);

  if (!character) {
    return (
      <DashboardLayout>
        <Box sx={{ width: '100%' }}>
          <Typography variant="h5" color="error">
            Character not found: {decodedName}
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
            onClick={() => router.push('/characters')}
            sx={{ 
              color: 'text.secondary',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
              cursor: 'pointer',
            }}
          >
            Characters
          </Link>
          <Typography color="text.primary">{character.TranslatedDirectorName?.English || character.Name}</Typography>
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
            <PeopleIcon sx={{ mr: 1, color: 'primary.main', fontSize: 32 }} />
            <Box>
              <Typography variant="h4" component="h1" fontWeight={600}>
                {character.TranslatedDirectorName?.English || character.Name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                {character.Name}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom fontWeight={600}>
              Quick Info
            </Typography>
            <Grid container spacing={2}>
              {character.Pedtype && (
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="caption" color="text.secondary">Type</Typography>
                  <Chip label={character.Pedtype} size="small" />
                </Grid>
              )}
              {character.DlcName && (
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="caption" color="text.secondary">DLC</Typography>
                  <Chip label={character.DlcName} size="small" variant="outlined" />
                </Grid>
              )}
              {character.Hash && (
                <Grid item xs={12} sm={6} md={4}>
                  <Typography variant="caption" color="text.secondary">Hash</Typography>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'info.main' }}>
                    {character.HexHash || `0x${character.Hash.toString(16).toUpperCase().padStart(8, '0')}`}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>

          <Divider sx={{ my: 3 }} />

          <JsonDataViewer data={character} title="Complete Character Data" />
        </Paper>
      </Box>
    </DashboardLayout>
  );
}

