'use client';

import { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  TextField,
  InputAdornment,
  Chip,
  Link,
  Tooltip,
} from '@mui/material';
import DashboardLayout from '../components/DashboardLayout';
import { getAllWeapons, filterWeapons, Weapon } from '../lib/data';
import SearchIcon from '@mui/icons-material/Search';
import CodeIcon from '@mui/icons-material/Code';

export default function WeaponsPage() {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const allWeapons = getAllWeapons();
    setWeapons(allWeapons);
  }, []);

  const filteredWeapons = searchQuery 
    ? filterWeapons(searchQuery)
    : weapons;

  const itemsPerPage = 50;
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedWeapons = filteredWeapons.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredWeapons.length / itemsPerPage);

  return (
    <DashboardLayout>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CodeIcon sx={{ mr: 1, color: 'primary.main', fontSize: 32 }} />
            <Typography variant="h4" component="h1" fontWeight={600}>
              Weapons Reference
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Complete documentation of all weapons in Grand Theft Auto V
          </Typography>
          
          <TextField
            fullWidth
            placeholder="Search by name, category, damage type, or ammo type..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3, maxWidth: 500 }}
          />
        </Box>

        {filteredWeapons.length === 0 && (
          <Typography variant="body1" color="text.secondary">
            No weapons found matching your search.
          </Typography>
        )}

        {filteredWeapons.length > 0 && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredWeapons.length)} of {filteredWeapons.length.toLocaleString()} weapons
              </Typography>
            </Box>
            
            <TableContainer component={Paper} elevation={0}>
              <Table size="small" sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontFamily: 'monospace' }}>Internal Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Damage Type</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Ammo Type</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontFamily: 'monospace' }}>Hash</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>DLC</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedWeapons.map((weapon) => (
                    <TableRow 
                      key={weapon.Hash}
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: 'rgba(144, 202, 249, 0.08)' 
                        } 
                      }}
                    >
                      <TableCell>
                        <Link
                          href={`/weapons/${encodeURIComponent(weapon.TranslatedLabel?.English || weapon.Name)}`}
                          sx={{
                            color: 'primary.main',
                            textDecoration: 'none',
                            fontWeight: 500,
                            '&:hover': {
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          {weapon.TranslatedLabel?.English || weapon.Name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Tooltip title={weapon.Name}>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                            {weapon.Name.length > 25 ? `${weapon.Name.substring(0, 25)}...` : weapon.Name}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        {weapon.Category && (
                          <Chip 
                            label={weapon.Category} 
                            size="small" 
                            color="primary"
                            variant="outlined"
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {weapon.DamageType && (
                          <Chip 
                            label={weapon.DamageType} 
                            size="small" 
                            variant="outlined"
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                          {weapon.AmmoType || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Tooltip title={`IntHash: ${weapon.IntHash} | Hash: ${weapon.Hash}`}>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'info.main' }}>
                            {weapon.Hash.toString(16).toUpperCase().padStart(8, '0')}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        {weapon.DlcName && (
                          <Chip 
                            label={weapon.DlcName} 
                            size="small" 
                            variant="outlined"
                            color="secondary"
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/weapons/${encodeURIComponent(weapon.TranslatedLabel?.English || weapon.Name)}`}
                          sx={{
                            color: 'primary.main',
                            textDecoration: 'none',
                            fontSize: '0.875rem',
                            '&:hover': {
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          View Details
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, value) => setPage(value)}
                  color="primary"
                  showFirstButton
                  showLastButton
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </DashboardLayout>
  );
}

