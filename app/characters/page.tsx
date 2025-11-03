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
import { getAllPeds, filterPeds, Ped } from '../lib/data';
import SearchIcon from '@mui/icons-material/Search';
import CodeIcon from '@mui/icons-material/Code';

export default function CharactersPage() {
  const [characters, setCharacters] = useState<Ped[]>([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const allPeds = getAllPeds();
    setCharacters(allPeds);
  }, []);

  const filteredCharacters = searchQuery 
    ? filterPeds(searchQuery)
    : characters;

  const itemsPerPage = 50;
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedCharacters = filteredCharacters.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);

  return (
    <DashboardLayout>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CodeIcon sx={{ mr: 1, color: 'primary.main', fontSize: 32 }} />
            <Typography variant="h4" component="h1" fontWeight={600}>
              Characters Reference
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Complete documentation of all characters (peds) in Grand Theft Auto V
          </Typography>
          
          <TextField
            fullWidth
            placeholder="Search by name, type, or DLC..."
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

        {filteredCharacters.length === 0 && (
          <Typography variant="body1" color="text.secondary">
            No characters found matching your search.
          </Typography>
        )}

        {filteredCharacters.length > 0 && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredCharacters.length)} of {filteredCharacters.length.toLocaleString()} characters
              </Typography>
            </Box>
            
            <TableContainer component={Paper} elevation={0}>
              <Table size="small" sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontFamily: 'monospace' }}>Internal Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>DLC</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontFamily: 'monospace' }}>Hash</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedCharacters.map((character) => (
                    <TableRow 
                      key={character.Hash}
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: 'rgba(144, 202, 249, 0.08)' 
                        } 
                      }}
                    >
                      <TableCell>
                        <Link
                          href={`/characters/${encodeURIComponent(character.TranslatedDirectorName?.English || character.Name)}`}
                          sx={{
                            color: 'primary.main',
                            textDecoration: 'none',
                            fontWeight: 500,
                            '&:hover': {
                              textDecoration: 'underline',
                            },
                          }}
                        >
                          {character.TranslatedDirectorName?.English || character.Name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Tooltip title={character.Name}>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                            {character.Name.length > 25 ? `${character.Name.substring(0, 25)}...` : character.Name}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        {character.Pedtype && (
                          <Chip 
                            label={character.Pedtype} 
                            size="small" 
                            color="primary"
                            variant="outlined"
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        {character.DlcName && (
                          <Chip 
                            label={character.DlcName} 
                            size="small" 
                            variant="outlined"
                            color="secondary"
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <Tooltip title={`Signed: ${character.SignedHash} | Unsigned: ${character.Hash}`}>
                          <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'info.main' }}>
                            {character.HexHash || `0x${character.Hash.toString(16).toUpperCase().padStart(8, '0')}`}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/characters/${encodeURIComponent(character.TranslatedDirectorName?.English || character.Name)}`}
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


