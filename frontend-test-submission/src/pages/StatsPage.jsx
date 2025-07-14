// src/pages/StatsPage.jsx
import React, { useState } from "react";
import { TextField, Button, Typography, Box, Divider, Card, CardContent, Alert, CircularProgress, List, ListItem, ListItemIcon, ListItemText, Paper } from "@mui/material";
import axios from "axios";
import log from "../middleware/log";
import { useNavigate } from "react-router-dom";
// Inside component



const StatsPage = () => {
  const [shortCode, setShortCode] = useState("");
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();
<Button onClick={() => navigate("/stats")}>View Stats</Button>
  const handleFetchStats = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/shorturls/${shortCode}`);
      setStats(res.data);
      setError("");
      await log("frontend", "info", "page", `Fetched stats for ${shortCode}`);
    } catch (err) {
      setStats(null);
      const msg = err.response?.data?.message || "Failed to fetch stats";
      setError(msg);
      await log("frontend", "error", "page", `Stats fetch failed for ${shortCode}: ${msg}`);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ p: 4, minHeight: '80vh', background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Paper elevation={4} sx={{ maxWidth: 600, width: '100%', borderRadius: 3, boxShadow: 4, p: 2, mt: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom fontWeight={700} align="center" color="primary.main">
            Short URL Statistics
          </Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 3, justifyContent: 'center' }}>
            <TextField
              label="Enter Shortcode"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              variant="outlined"
            />
            <Button variant="contained" onClick={handleFetchStats} disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Get Stats"}
            </Button>
          </Box>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {stats && (
            <Box sx={{ mt: 3 }}>
              <Typography><b>Original URL:</b> {stats.originalUrl}</Typography>
              <Typography><b>Created At:</b> {new Date(stats.createdAt).toLocaleString()}</Typography>
              <Typography><b>Expiry Date:</b> {new Date(stats.expiryDate).toLocaleString()}</Typography>
              <Typography><b>Total Clicks:</b> {stats.totalClicks}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">Click Logs:</Typography>
              {stats.clicks.length === 0 && <Typography>No clicks recorded yet.</Typography>}
              <List>
                {stats.clicks.map((click, i) => (
                  <ListItem key={i}>
                    <ListItemIcon>
                      <i className="fa-regular fa-clock" style={{ color: '#1976d2' }}></i>
                    </ListItemIcon>
                    <ListItemText
                      primary={`Time: ${new Date(click.timestamp).toLocaleString()}`}
                      secondary={`Referrer: ${click.referrer} | Location/IP: ${click.geoLocation}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </CardContent>
      </Paper>
    </Box>
  );
};

export default StatsPage;
