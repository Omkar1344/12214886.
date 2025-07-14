const ShortUrl = require('../models/shortUrl');
const generateShortcode = require('../utils/generateShortcode');
const axios = require('axios');
const log = require('../middleware/log');

const BASE_URL = 'http://localhost:5000';

const getExpiryDate = (validity) => {
    return new Date(Date.now() + validity * 60 * 1000);
};

const createShortUrl = async (req, res) => {
    try {
        const { url, validity = 30, shortCode } = req.body;

        if (!url || typeof url !== 'string') {
            await log("backend", "error", "handler", "Invalid or missing URL input");
            return res.status(400).json({ message: "Invalid or missing URL" });
        }

        let finalCode = shortCode;

        if (shortCode) {
            const existing = await ShortUrl.findOne({ shortCode });
            if (existing) {
                await log("backend", "warn", "handler", "Shortcode already exists");
                return res.status(409).json({ message: "Shortcode already exists" });
            }
        } else {
            // Auto-generate unique code
            do {
                finalCode = generateShortcode();
            } while (await ShortUrl.findOne({ shortCode: finalCode }));
        }

        const expiryDate = getExpiryDate(validity);

        const shortUrl = new ShortUrl({
            originalUrl: url,
            shortCode: finalCode, // Make sure you're saving with this field
            expiryDate,
            clicks: []
        });

        await shortUrl.save();

        await log("backend", "info", "controller", `Short URL created: ${finalCode}`);

        res.status(201).json({
            shortLink: `${BASE_URL}/${finalCode}`,
            expiry: expiryDate.toISOString()
        });
    } catch (err) {
        await log("backend", "fatal", "controller", "Error creating short URL: " + err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


const getShortUrlStats = async (req, res) => {
    try {
        const { shortcode } = req.params; // ✅ fixed: use 'shortcode' as in route param

        const entry = await ShortUrl.findOne({ shortCode: shortcode }); // ✅ use shortcode value
        if (!entry) {
            await log("backend", "warn", "controller", `Shortcode not found: ${shortcode}`);
            return res.status(404).json({ message: "Shortcode not found" });
        }

        const stats = {
            originalUrl: entry.originalUrl,
            createdAt: entry.createdAt,
            expiryDate: entry.expiryDate,
            totalClicks: entry.clicks.length,
            clicks: entry.clicks
        };

        await log("backend", "info", "controller", `Stats retrieved for shortcode: ${shortcode}`);
        res.status(200).json(stats);
    } catch (err) {
        await log("backend", "fatal", "controller", "Error retrieving stats: " + err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {createShortUrl, getShortUrlStats};