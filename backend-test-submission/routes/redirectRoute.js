const express = require('express');
const router = express.Router();
const ShortUrl = require('../models/shortUrl');
const log = require('../middleware/log');

router.get('/:shortcode', async (req, res) => {
    const { shortcode } = req.params;

    try {
        const record = await ShortUrl.findOne({ shortCode: shortcode });

        if (!record) {
            await log("backend", "warn", "route", `Redirection failed - shortcode not found: ${shortcode}`);
            return res.status(404).json({ message: 'Shortcode not found' });
        }

        if (record.expiryDate < new Date()) {
            await log("backend", "info", "route", `Redirection failed - shortcode expired: ${shortcode}`);
            return res.status(410).json({ message: 'Link has expired' });
        }

        const clickData = {
            timestamp: new Date(),
            referrer: req.get('Referrer') || 'unknown',
            geoLocation: req.ip // IP address (coarse-grained)
        };

        record.clicks.push(clickData);
        await record.save();

        await log("backend", "info", "route", `Redirection successful: ${shortcode}`);
        res.redirect(record.originalUrl);
    } catch (err) {
        await log("backend", "fatal", "route", "Redirection error: " + err.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;