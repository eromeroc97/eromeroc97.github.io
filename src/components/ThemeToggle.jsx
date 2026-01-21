import { IconButton, useTheme } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const ThemeToggle = ({ colorMode, toggleColorMode }) => {
  const theme = useTheme();
  
  const iconVariants = {
    initial: { rotate: -180, scale: 0.5, opacity: 0 },
    animate: { rotate: 0, scale: 1, opacity: 1 },
    exit: { rotate: 180, scale: 0.5, opacity: 0 } 
  };

  return (
    <IconButton 
      onClick={toggleColorMode} 
      // EL CAMBIO CLAVE ESTÁ AQUÍ:
      // Usamos 'text.primary' para que en modo Light sea oscuro (negro/gris) 
      // y en modo Dark sea claro (blanco/gris).
      sx={{ 
        color: 'text.primary',
        // OPCIONAL: Si quieres que el Sol sea naranja y la Luna azul, descomenta esto:
        // color: theme.palette.mode === 'dark' ? '#90caf9' : '#ffb74d'
      }}
    >
      <div style={{ position: 'relative', width: 24, height: 24 }}>
        <AnimatePresence mode='wait' initial={false}>
          <motion.div
            key={theme.palette.mode}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, ease: "easeInOut" }} // Ajusté un poco la velocidad para que se sienta ágil
            variants={iconVariants}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
          >
            {theme.palette.mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
          </motion.div>
        </AnimatePresence>
      </div>
    </IconButton>
  );
};

export default ThemeToggle;