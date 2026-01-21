import { useState, useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material'; // CssBaseline es vital
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { createCustomTheme } from './theme/theme';
import MainLayout from './layout/MainLayout';

// Componentes temporales
const Home = () => <div><h1>Homepage</h1><p>Aquí irán tus secciones.</p></div>;
const About = () => <div><h1>Sobre mí</h1></div>;

function App() {
  const [mode, setMode] = useState('dark');

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(() => createCustomTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Esto resetea los márgenes del navegador */}
      <Router>
        {/* IMPORTANTE: MainLayout es el primer elemento, sin Container padre */}
        <MainLayout mode={mode} toggleColorMode={toggleColorMode}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;