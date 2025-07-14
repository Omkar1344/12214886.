const mongoose = require('mongoose');

const shortUrlSchema = new mongoose.Schema({
    originalUrl: {
        type:String,
        required: true
    },
    shortCode:{
        type:String,
        unique:true,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    expiryDate:{
        type:Date,
        require:true
    },
    clicks:[
        {
        timestamp:Date,
        referrer:String,
        geoLocation:String
        }
    ]
});

module.exports=mongoose.model('ShortUrl',shortUrlSchema);
