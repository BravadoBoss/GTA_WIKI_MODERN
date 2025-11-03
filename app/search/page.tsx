'use client';

import { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Paper,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  InputAdornment,
  Pagination,
  Chip,
} from '@mui/material';
import DashboardLayout from '../components/DashboardLayout';
import { searchWiki, SearchResult } from '../lib/api';
import SearchIcon from '@mui/icons-material/Search';
import LinkIcon from '@mui/icons-material/Link';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      setTotalHits(0);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setPage(1);
      
      const result = await searchWiki(query);
      
      if (result) {
        setResults(result.query.search || []);
        setTotalHits(result.query.searchinfo?.totalhits || 0);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedResults = results.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(results.length / itemsPerPage);

  return (
    <DashboardLayout>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <SearchIcon sx={{ mr: 1, color: 'primary.main', fontSize: 32 }} />
            <Typography variant="h4" component="h1" fontWeight={600}>
              Search GTA V Wiki
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Search for any content in the Grand Theft Auto V wiki
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3, maxWidth: 600 }}>
            <TextField
              fullWidth
              placeholder="Search for characters, vehicles, weapons, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              onClick={() => handleSearch(searchQuery)}
              disabled={loading}
              sx={{ minWidth: 100 }}
            >
              Search
            </Button>
          </Box>
        </Box>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {!loading && totalHits > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Found {totalHits} result{totalHits !== 1 ? 's' : ''}
            </Typography>
          </Box>
        )}

        {!loading && results.length === 0 && searchQuery && !error && (
          <Alert severity="info">
            No results found. Try a different search term.
          </Alert>
        )}

        {!loading && paginatedResults.length > 0 && (
          <>
            <Grid container spacing={3}>
              {paginatedResults.map((result) => (
                <Grid item xs={12} key={result.pageid}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'start', mb: 1 }}>
                        <Typography variant="h6" component="h3" sx={{ flexGrow: 1 }}>
                          {result.title}
                        </Typography>
                        <Chip
                          label={`${Math.ceil(result.wordcount / 100)} words`}
                          size="small"
                          variant="outlined"
                          sx={{ ml: 2 }}
                        />
                      </Box>
                      {result.snippet && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2 }}
                          dangerouslySetInnerHTML={{ __html: result.snippet }}
                        />
                      )}
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
                        <Typography variant="caption" color="text.secondary">
                          Page ID: {result.pageid} • Size: {result.size} bytes
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        href={`/wiki/${encodeURIComponent(result.title)}`}
                        startIcon={<LinkIcon />}
                      >
                        View Page
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, value) => setPage(value)}
                  color="primary"
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </DashboardLayout>
  );
}

