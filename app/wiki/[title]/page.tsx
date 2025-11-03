'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Typography,
  Box,
  Paper,
  CircularProgress,
  Alert,
  Grid,
  Chip,
  Button,
  Breadcrumbs,
  Link,
} from '@mui/material';
import DashboardLayout from '../../components/DashboardLayout';
import { fetchWikiPage, WikiPage } from '../../lib/api';
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function WikiPageDetail() {
  const params = useParams();
  const router = useRouter();
  const title = params?.title as string;
  const decodedTitle = title ? decodeURIComponent(title) : '';
  
  const [pageData, setPageData] = useState<WikiPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!decodedTitle) return;

    async function loadPage() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchWikiPage(decodedTitle);
        setPageData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load page');
      } finally {
        setLoading(false);
      }
    }

    loadPage();
  }, [decodedTitle]);

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
          <Typography color="text.primary">{decodedTitle}</Typography>
        </Breadcrumbs>

        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{ mb: 3 }}
        >
          Back
        </Button>

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

        {!loading && !pageData && !error && (
          <Alert severity="warning">
            Page not found: {decodedTitle}
          </Alert>
        )}

        {!loading && pageData && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <InfoIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h4" component="h1" fontWeight={600}>
                    {pageData.title}
                  </Typography>
                </Box>
                
                {pageData.thumbnail && (
                  <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
                    <img
                      src={pageData.thumbnail.source}
                      alt={pageData.title}
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                        maxHeight: '500px',
                        borderRadius: '8px',
                        border: '1px solid rgba(194, 224, 255, 0.08)',
                      }}
                    />
                  </Box>
                )}

                {pageData.extract ? (
                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="body1"
                      paragraph
                      color="text.secondary"
                      sx={{ lineHeight: 1.8, whiteSpace: 'pre-wrap' }}
                    >
                      {pageData.extract}
                    </Typography>
                  </Box>
                ) : (
                  <Alert severity="info" sx={{ mb: 3 }}>
                    Content preview not available. Click "View on Wiki" below to view the full page.
                  </Alert>
                )}

                {pageData.links && pageData.links.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mb: 1 }}>
                      Related Pages:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {pageData.links.slice(0, 12).map((link, index) => (
                        <Chip
                          key={index}
                          label={link.title}
                          size="small"
                          variant="outlined"
                          component="a"
                          href={`/wiki/${encodeURIComponent(link.title)}`}
                          clickable
                          sx={{
                            textDecoration: 'none',
                            '&:hover': {
                              backgroundColor: 'primary.main',
                              color: 'primary.contrastText',
                              borderColor: 'primary.main',
                            },
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}

                <Box sx={{ display: 'flex', gap: 1, mt: 3, flexWrap: 'wrap', alignItems: 'center' }}>
                  <Chip
                    label={`Page ID: ${pageData.pageid}`}
                    size="small"
                    variant="outlined"
                  />
                  {pageData.fullurl && (
                    <Button
                      variant="outlined"
                      size="small"
                      href={pageData.fullurl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on GTA Fandom Wiki
                    </Button>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>
    </DashboardLayout>
  );
}

