import { Box, useTheme } from '@mui/material'; // Importamos useTheme
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = ({ children, mode, toggleColorMode }) => {
  const theme = useTheme(); // Accedemos a los colores del tema

  return (
    // 1. LA MESA (Fondo Exterior)
    <Box 
      sx={{ 
        minHeight: '100vh',
        width: '100vw',
        overflowX: 'hidden',
        // Usamos el color suave que definimos en el tema
        bgcolor: theme.palette.custom.background,
        // Transición suave al cambiar de tema
        transition: 'background-color 0.3s ease',
      }}
    >
      
      {/* 2. EL FOLIO (Contenido Central) */}
      <Box 
        sx={{ 
          // --- ANCHURA AUMENTADA ---
          width: { 
            xs: '100%',  // Móvil
            sm: '98%',   // Tablet
            md: '90%',   // Laptop (Antes 80%) -> Más ancho
            lg: '85%',   // Monitor (Antes 70%) -> Mucho más espacio
            xl: '70%'    // Monitor Ultrawide (Antes 50%)
          },
          mx: 'auto', 
          
          minHeight: '100vh',
          bgcolor: 'background.default',
          
          // --- SEPARACIÓN SUAVE (Borde + Sombra leve) ---
          // En lugar de una sombra negra fuerte, usamos un borde sutil y una sombra difusa
          borderLeft: { sm: `1px solid ${theme.palette.custom.border}` },
          borderRight: { sm: `1px solid ${theme.palette.custom.border}` },
          boxShadow: mode === 'dark' 
            ? 'none' // En dark mode a veces es mejor sin sombra, solo borde (estilo clean)
            : '0px 0px 20px rgba(0,0,0,0.03)', // Sombra muy muy sutil en light mode
          
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          transition: 'background-color 0.3s ease, border-color 0.3s ease', // Animación suave
        }}
      >
        
        {/* Navbar Sticky */}
        <Box sx={{ position: 'sticky', top: 0, zIndex: 100 }}>
            <Navbar mode={mode} toggleColorMode={toggleColorMode} />
        </Box>

        {/* Cuerpo */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            // Ajustamos padding para aprovechar el nuevo ancho
            px: { xs: 2, md: 8, lg: 12 }, 
            py: 6,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
            {children}
        </Box>

        <Footer />

      </Box>
    </Box>
  );
};

export default MainLayout;