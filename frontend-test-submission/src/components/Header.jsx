import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import LinkIcon from "@mui/icons-material/Link";
import Box from "@mui/material/Box";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static" color="primary" elevation={2} sx={{ boxShadow: '0 2px 12px 0 rgba(60,60,120,0.08)' }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LinkIcon sx={{ fontSize: 32, color: 'white' }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 1 }}>
            URL Shortener
          </Typography>
        </Box>
        <Button
          color={location.pathname === "/" ? "secondary" : "inherit"}
          variant={location.pathname === "/" ? "contained" : "text"}
          onClick={() => navigate("/")}
          sx={{ mr: 2 }}
        >
          Shorten URL
        </Button>
        <Button
          color={location.pathname === "/stats" ? "secondary" : "inherit"}
          variant={location.pathname === "/stats" ? "contained" : "text"}
          onClick={() => navigate("/stats")}
        >
          View Stats
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 