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
import { getAllVehicles, filterVehicles, Vehicle } from '../lib/data';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import SearchIcon from '@mui/icons-material/Search';
import CodeIcon from '@mui/icons-material/Code';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const allVehicles = getAllVehicles();
    setVehicles(allVehicles);
  }, []);

  const filteredVehicles = searchQuery 
    ? filterVehicles(searchQuery)
    : vehicles;

  const itemsPerPage = 50;
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedVehicles = filteredVehicles.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);

  return (
    <DashboardLayout>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CodeIcon sx={{ mr: 1, color: 'primary.main', fontSize: 32 }} />
            <Typography variant="h4" component="h1" fontWeight={600}>
              Vehicles Reference
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Complete documentation of all vehicles in Grand Theft Auto V
          </Typography>
          
          <TextField
            fullWidth
            placeholder="Search by name, manufacturer, class, or type..."
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

        {filteredVehicles.length === 0 && (
          <Typography variant="body1" color="text.secondary">
            No vehicles found matching your search.
          </Typography>
        )}

        {filteredVehicles.length > 0 && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredVehicles.length)} of {filteredVehicles.length.toLocaleString()} vehicles
              </Typography>
            </Box>
            
            <TableContainer component={Paper} elevation={0}>
              <Table size="small" sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontFamily: 'monospace' }}>Internal Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Manufacturer</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Class</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontFamily: 'monospace' }}>Hash</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>DLC</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedVehicles.map((vehicle) => (
                    <TableRow 
                      key={vehicle.Hash}
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: 'rgba(144, 202, 249, 0.08)' 
                        } 
                      }}
                    >
                      <TableCell>
                        <Link
                          href={`/vehicles/${encodeURIComponent(vehicle.DisplayName?.English || vehicle.Name)}`}
                          sx={{
                            color: 'primary.main',
                            textDecoration: 'none',
                            fontWeight: 500,
                            '&:hover': {
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          {vehicle.DisplayName?.English || vehicle.Name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Tooltip title={vehicle.Name}>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                            {vehicle.Name.length > 20 ? `${vehicle.Name.substring(0, 20)}...` : vehicle.Name}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        {vehicle.ManufacturerDisplayName?.English ? (
                          <Chip 
                            label={vehicle.ManufacturerDisplayName.English} 
                            size="small" 
                            variant="outlined"
                          />
                        ) : (
                          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                            {vehicle.Manufacturer}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        {vehicle.Class && (
                          <Chip 
                            label={vehicle.Class} 
                            size="small" 
                            color="primary"
                            variant="outlined"
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {vehicle.Type || '-'}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Tooltip title={`Signed: ${vehicle.SignedHash} | Unsigned: ${vehicle.Hash}`}>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'info.main' }}>
                            {vehicle.HexHash || `0x${vehicle.Hash.toString(16).toUpperCase().padStart(8, '0')}`}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        {vehicle.DlcName && (
                          <Chip 
                            label={vehicle.DlcName} 
                            size="small" 
                            variant="outlined"
                            color="secondary"
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/vehicles/${encodeURIComponent(vehicle.DisplayName?.English || vehicle.Name)}`}
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

