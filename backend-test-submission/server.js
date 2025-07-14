const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const shortUrlRoutes = require('./routes/shortUrlRoutes');
require('dotenv').config();

const app=express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB connection error:',err));

app.use('/shorturls',shortUrlRoutes);

app.use('/', require('./routes/redirectRoute'));

app.use("/frontend-log", require("./routes/logRoute"));

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});