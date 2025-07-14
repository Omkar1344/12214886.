// src/pages/ShortenPage.jsx
import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Typography, Card, CardContent, Alert, IconButton, Tooltip, Stack, Box, Paper, Fade } from "@mui/material";
import axios from "axios";
import log from "../middleware/log";
import { useNavigate } from "react-router-dom";
// Inside component



const ShortenPage = () => {
  const [urls, setUrls] = useState([{ url: "", validity: "", shortCode: "" }]);
  const [results, setResults] = useState([]);
  const [copySuccess, setCopySuccess] = useState("");
  const [linkHistory, setLinkHistory] = useState(() => {
    const saved = localStorage.getItem("shortLinkHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const navigate = useNavigate();
<Button onClick={() => navigate("/stats")}>View Stats</Button>

  useEffect(() => {
    localStorage.setItem("shortLinkHistory", JSON.stringify(linkHistory));
  }, [linkHistory]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const addUrlField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { url: "", validity: "", shortCode: "" }]);
    }
  };

  const handleSubmit = async () => {
    const responses = [];
    const newLinks = [];
    for (const data of urls) {
      try {
        const res = await axios.post("http://localhost:5000/shorturls", {
          url: data.url,
          validity: parseInt(data.validity) || 30,
          shortCode: data.shortCode || undefined,
        });
        responses.push(res.data);
        newLinks.push({
          shortLink: res.data.shortLink,
          shortCode: res.data.shortLink.split("/").pop(),
          originalUrl: data.url,
          expiry: res.data.expiry
        });
        await log("frontend", "info", "page", `Shortened: ${data.url}`);
      } catch (err) {
        await log("frontend", "error", "page", `Error shortening: ${data.url}`);
        responses.push({ error: err.response?.data?.message || "Error" });
      }
    }
    setResults(responses);
    if (newLinks.length > 0) {
      setLinkHistory(prev => [...newLinks, ...prev].slice(0, 20)); // keep last 20
    }
  };

  const handleCopy = (link) => {
    navigator.clipboard.writeText(link);
    setCopySuccess("Copied!");
    setTimeout(() => setCopySuccess(""), 1500);
  };

  return (
    <Stack alignItems="center" justifyContent="center" sx={{ minHeight: '80vh', background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)' }}>
      <Card sx={{ maxWidth: 600, width: '100%', boxShadow: 4, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom fontWeight={700} align="center" color="primary.main">
            URL Shortener
          </Typography>
          {urls.map((input, index) => (
            <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
              <Grid item xs={12} md={5}>
                <TextField
                  label="Original URL"
                  fullWidth
                  value={input.url}
                  onChange={(e) => handleChange(index, "url", e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <TextField
                  label="Validity (min)"
                  fullWidth
                  value={input.validity}
                  onChange={(e) => handleChange(index, "validity", e.target.value)}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6} md={4}>
                <TextField
                  label="Shortcode (optional)"
                  fullWidth
                  value={input.shortCode}
                  onChange={(e) => handleChange(index, "shortCode", e.target.value)}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          ))}
          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <Button onClick={addUrlField} disabled={urls.length >= 5} variant="outlined">
              + Add Another
            </Button>
            <Button onClick={handleSubmit} variant="contained">
              Shorten
            </Button>
          </Stack>
          {copySuccess && <Alert severity="success" sx={{ mb: 2 }}>{copySuccess}</Alert>}
          <Stack spacing={1} sx={{ mt: 2 }}>
            {results.map((res, i) =>
              res.shortLink ? (
                <Alert key={i} icon={false} severity="info" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>
                    <b>Short Link:</b> <a href={res.shortLink} target="_blank" rel="noopener noreferrer">{res.shortLink}</a> | <b>Expires:</b> {res.expiry}
                  </span>
                  <Tooltip title="Copy to clipboard">
                    <IconButton color="primary" onClick={() => handleCopy(res.shortLink)} size="small">
                      <i className="fa-regular fa-copy"></i>
                    </IconButton>
                  </Tooltip>
                </Alert>
              ) : (
                <Alert key={i} severity="error">Error: {res.error}</Alert>
              )
            )}
          </Stack>
        </CardContent>
      </Card>
      {linkHistory.length > 0 && (
        <Fade in={true} timeout={600}>
          <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 6, width: '100%' }}>
            <Paper elevation={3} sx={{ maxWidth: 700, width: '100%', borderRadius: 3, p: 2, background: '#f4f6fa' }}>
              <Typography variant="h6" gutterBottom align="center">Recent Short Links</Typography>
              <Box sx={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95em' }}>
                  <thead>
                    <tr style={{ background: '#e0e7ff' }}>
                      <th style={{ padding: 8, borderBottom: '1px solid #ccc' }}>Short Link</th>
                      <th style={{ padding: 8, borderBottom: '1px solid #ccc' }}>Shortcode</th>
                      <th style={{ padding: 8, borderBottom: '1px solid #ccc' }}>Original URL</th>
                      <th style={{ padding: 8, borderBottom: '1px solid #ccc' }}>Expires</th>
                    </tr>
                  </thead>
                  <tbody>
                    {linkHistory.map((item, idx) => (
                      <tr key={idx} style={{ background: idx % 2 === 0 ? '#fff' : '#f0f4ff' }}>
                        <td style={{ padding: 8 }}><a href={item.shortLink} target="_blank" rel="noopener noreferrer">{item.shortLink}</a></td>
                        <td style={{ padding: 8 }}>{item.shortCode}</td>
                        <td style={{ padding: 8, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.originalUrl}</td>
                        <td style={{ padding: 8 }}>{item.expiry}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Paper>
          </Box>
        </Fade>
      )}
    </Stack>
  );
};

export default ShortenPage;
