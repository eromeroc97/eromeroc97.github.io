import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { label: 'Inicio', path: '/' },
  { label: 'Proyectos', path: '/' },
  { label: 'Sobre mí', path: '/about' },
];

const Navbar = ({ mode, toggleColorMode }) => {
  return (
    <AppBar 
      position="static" // Es static relativo a su contenedor (el sticky box del layout)
      elevation={0}
      sx={{ 
        width: '100%', // Ocupa todo el ancho del folio
        borderBottom: '1px solid',
        borderColor: 'divider',
        // Efecto cristal
        bgcolor: mode === 'dark' ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        
        {/* IZQUIERDA: LOGO */}
        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/" 
          sx={{ 
            fontWeight: 'bold', 
            textDecoration: 'none', 
            color: 'text.primary',
            fontFamily: 'monospace', // Toque hacker
            letterSpacing: 2
          }}
        >
          &lt;RC /&gt;
        </Typography>

        {/* CENTRO: MENÚ (Solo en desktop) */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          {navItems.map((item) => (
            <Button 
                key={item.label} 
                component={RouterLink} 
                to={item.path} 
                sx={{ color: 'text.primary', fontWeight: 500 }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* DERECHA: TOGGLE */}
        <ThemeToggle colorMode={mode} toggleColorMode={toggleColorMode} />

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;