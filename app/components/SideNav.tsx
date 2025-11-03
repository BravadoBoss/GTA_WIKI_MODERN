'use client';

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Box,
  alpha,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SearchIcon from '@mui/icons-material/Search';
import { usePathname } from 'next/navigation';

const drawerWidth = 240;

interface SideNavProps {
  open: boolean;
  onClose: () => void;
  mobile: boolean;
}

const menuItems = [
  { text: 'Dashboard', icon: <HomeIcon />, path: '/' },
  { text: 'Characters', icon: <PeopleIcon />, path: '/characters' },
  { text: 'Vehicles', icon: <DirectionsCarIcon />, path: '/vehicles' },
  { text: 'Weapons', icon: <LocalFireDepartmentIcon />, path: '/weapons' },
  { text: 'Search', icon: <SearchIcon />, path: '/search' },
];

export default function SideNav({ open, onClose, mobile }: SideNavProps) {
  const pathname = usePathname();

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Toolbar sx={{ minHeight: '64px !important' }} />
      <Divider />
      <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', py: 1 }}>
        <List sx={{ py: 0 }}>
          {menuItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/' && pathname?.startsWith(item.path));
            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  selected={isActive}
                  onClick={mobile ? onClose : undefined}
                  href={item.path}
                  sx={{
                    borderRadius: 1,
                    mx: 1,
                    my: 0.5,
                    minHeight: 44,
                    '&.Mui-selected': {
                      backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.15),
                      borderLeft: (theme) => `3px solid ${theme.palette.primary.main}`,
                      '&:hover': {
                        backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.2),
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'primary.main',
                      },
                      '& .MuiListItemText-primary': {
                        fontWeight: 600,
                        color: 'primary.main',
                      },
                    },
                    '&:hover': {
                      backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.08),
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: isActive ? 'primary.main' : 'text.secondary',
                    minWidth: 40,
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{
                      fontSize: '0.95rem',
                      fontWeight: isActive ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      {mobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              position: 'fixed',
              top: 64,
              left: 0,
              height: 'calc(100vh - 64px)',
              overflowY: 'auto',
              overflowX: 'hidden',
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}

