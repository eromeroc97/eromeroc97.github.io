// src/theme/theme.js
import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      // Un Cyan/Azul eléctrico brillante que destaca genial sobre gris azulado
      main: mode === 'dark' ? '#38bdf8' : '#0288d1',
    },
    secondary: {
      main: '#a855f7', // Un morado para detalles de investigación
    },
    background: {
      // === EL FOLIO (Zona de contenido) ===
      // Dark: Usamos un "Gris Carbón Azulado" (#1e293b). 
      // Es oscuro, pero CLARAMENTE no es negro. Se lee muy bien.
      default: mode === 'dark' ? '#1e293b' : '#ffffff', 
      
      // Papel secundario (para tarjetas dentro del folio)
      paper: mode === 'dark' ? '#334155' : '#f8fafc', 
    },
    text: {
      // Dark: Blanco "roto" (#f1f5f9). El blanco puro quema la retina en dark mode.
      primary: mode === 'dark' ? '#f1f5f9' : '#1e293b',
      secondary: mode === 'dark' ? '#94a3b8' : '#64748b',
    },
    // === LA MESA (Fondo vacío) ===
    custom: {
      // Dark: Un tono más oscuro que el folio, pero con "color" (#0f172a).
      // Crea profundidad sin parecer que el monitor está apagado.
      background: mode === 'dark' ? '#0f172a' : '#e2e8f0', 
      
      // Borde: Un gris suave para delimitar el folio elegantemente
      border: mode === 'dark' ? '#334155' : '#cbd5e1',
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"Roboto Slab", serif', fontWeight: 700 },
    h2: { fontFamily: '"Roboto Slab", serif', fontWeight: 600 },
    h3: { fontFamily: '"Roboto Slab", serif', fontWeight: 600 },
    // Mono para código o estética hacker
    code: { fontFamily: '"Fira Code", monospace' },
  },
  // Ajuste de componentes globales para suavizar bordes
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600 }, // Botones más modernos sin mayúsculas forzadas
      },
    },
  },
});

export const createCustomTheme = (mode) => createTheme(getDesignTokens(mode));