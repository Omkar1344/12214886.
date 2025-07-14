import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Footer = () => (
  <Box sx={{ width: '100%', py: 2, mt: 4, textAlign: 'center', color: '#888', fontSize: '0.95em' }}>
    <Typography variant="body2">
      &copy; {new Date().getFullYear()} Omkar Pradip More &mdash; URL Shortener Project
    </Typography>
  </Box>
);

export default Footer; 