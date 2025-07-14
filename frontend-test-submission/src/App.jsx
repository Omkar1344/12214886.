// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShortenPage from "./pages/ShortenPage";
import StatsPage from "./pages/StatsPage";
import Header from "./components/Header";
import Box from "@mui/material/Box";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)' }}>
        <Box sx={{ flex: 1, width: '100%', maxWidth: 900, px: 2, py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Routes>
            <Route path="/" element={<ShortenPage />} />
            <Route path="/stats" element={<StatsPage />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;
