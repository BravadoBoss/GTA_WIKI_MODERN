'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  InputBase,
  alpha,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

interface TopNavProps {
  onMenuClick?: () => void;
}

export default function TopNav({ onMenuClick }: TopNavProps) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: { sm: `calc(100% - 240px)` },
        ml: { sm: '240px' },
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuClick}
          sx={{ 
            mr: 2,
            display: { sm: 'none' },
          }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography
          variant="h6"
          component="div"
          sx={{ 
            flexGrow: 0, 
            mr: 4, 
            fontWeight: 700,
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          GTA V Wiki
        </Typography>

        <Box
          sx={{
            position: 'relative',
            borderRadius: 2,
            backgroundColor: alpha('#ffffff', 0.1),
            '&:hover': {
              backgroundColor: alpha('#ffffff', 0.15),
            },
            marginLeft: 0,
            width: '100%',
            maxWidth: 450,
            display: { xs: 'none', sm: 'block' },
            transition: 'all 0.2s ease',
          }}
        >
          <Box
            sx={{
              padding: (theme) => theme.spacing(0, 2),
              height: '100%',
              position: 'absolute',
              pointerEvents: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <SearchIcon sx={{ opacity: 0.7 }} />
          </Box>
          <InputBase
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              color: 'inherit',
              width: '100%',
              '& .MuiInputBase-input': {
                padding: (theme) => theme.spacing(1.25, 1, 1.25, 0),
                paddingLeft: (theme) => `calc(1em + ${theme.spacing(4)})`,
                transition: (theme) => theme.transitions.create('width'),
                fontSize: '0.9rem',
              },
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

