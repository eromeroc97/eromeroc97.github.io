import { Box, Typography, IconButton, Divider } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box 
        component="footer" 
        sx={{ 
            py: 4, 
            px: 2,
            mt: 'auto', 
            width: '100%',
            bgcolor: 'background.paper', // Mismo color que el folio
            borderTop: '1px solid',
            borderColor: 'divider'
        }}
    >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
            
            <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                <IconButton color="inherit" href="https://github.com/eromeroc97" target="_blank">
                    <GitHubIcon />
                </IconButton>
                <IconButton color="inherit" href="https://linkedin.com" target="_blank">
                    <LinkedInIcon />
                </IconButton>
            </Box>

            <Typography variant="body2" fontWeight="bold">
                Tu Nombre
            </Typography>
            
            <Typography variant="caption" color="text.secondary">
                Security Research & Development
            </Typography>

            <Typography variant="caption" color="text.disabled" sx={{ mt: 1 }}>
              © {new Date().getFullYear()}
            </Typography>

        </Box>
    </Box>
  );
};

export default Footer;