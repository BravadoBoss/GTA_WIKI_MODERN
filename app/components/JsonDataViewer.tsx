'use client';

import {
  Box,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CodeIcon from '@mui/icons-material/Code';

interface JsonDataViewerProps {
  data: any;
  title?: string;
}

export default function JsonDataViewer({ data, title }: JsonDataViewerProps) {
  const renderValue = (value: any, key: string = ''): React.ReactNode => {
    if (value === null || value === undefined) {
      return (
        <Chip 
          label="null" 
          size="small" 
          variant="outlined" 
          color="default"
          sx={{ fontFamily: 'monospace' }}
        />
      );
    }

    if (typeof value === 'boolean') {
      return (
        <Chip 
          label={value.toString()} 
          size="small" 
          variant="outlined" 
          color={value ? 'success' : 'default'}
          sx={{ fontFamily: 'monospace' }}
        />
      );
    }

    if (typeof value === 'number') {
      return (
        <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'primary.main' }}>
          {value.toLocaleString()}
        </Typography>
      );
    }

    if (typeof value === 'string') {
      if (value.startsWith('0x') || /^[A-F0-9]{8}$/i.test(value)) {
        return (
          <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'info.main' }}>
            {value}
          </Typography>
        );
      }
      return (
        <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
          {value}
        </Typography>
      );
    }

    if (Array.isArray(value)) {
      if (value.length === 0) {
        return (
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            Empty array []
          </Typography>
        );
      }
      return (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
              Array [{value.length} items]
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ pl: 2 }}>
              {value.map((item, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
                    [{index}]
                  </Typography>
                  <Box sx={{ pl: 2, mt: 1 }}>
                    {typeof item === 'object' && item !== null ? (
                      <JsonDataViewer data={item} />
                    ) : (
                      renderValue(item, `${key}[${index}]`)
                    )}
                  </Box>
                </Box>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      );
    }

    if (typeof value === 'object') {
      const keys = Object.keys(value);
      if (keys.length === 0) {
        return (
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            Empty object {}
          </Typography>
        );
      }
      return (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
              Object {'{'} {keys.length} properties {'}'}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer component={Box}>
              <Table size="small">
                <TableBody>
                  {keys.map((k) => (
                    <TableRow key={k}>
                      <TableCell sx={{ fontWeight: 600, fontFamily: 'monospace', width: '30%' }}>
                        {k}
                      </TableCell>
                      <TableCell>
                        {typeof value[k] === 'object' && value[k] !== null ? (
                          <JsonDataViewer data={value[k]} />
                        ) : (
                          renderValue(value[k], k)
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      );
    }

    return (
      <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
        {String(value)}
      </Typography>
    );
  };

  return (
    <Box>
      {title && (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <CodeIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" fontWeight={600}>
            {title}
          </Typography>
        </Box>
      )}
      <Paper elevation={0} sx={{ p: 2 }}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, width: '30%' }}>Property</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(data).map((key) => (
                <TableRow key={key}>
                  <TableCell sx={{ fontWeight: 600, fontFamily: 'monospace', width: '30%' }}>
                    {key}
                  </TableCell>
                  <TableCell>
                    {typeof data[key] === 'object' && data[key] !== null ? (
                      renderValue(data[key], key)
                    ) : (
                      renderValue(data[key], key)
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

