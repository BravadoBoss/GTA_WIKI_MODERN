import { Container, Typography, Box } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          GTA WIKI Modern
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Welcome to your modern GTA WIKI dashboard
        </Typography>
        <Typography variant="body1">
          Your dashboard will go here. Start building amazing features!
        </Typography>
      </Box>
    </Container>
  );
}

