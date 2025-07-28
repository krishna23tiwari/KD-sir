const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  ip: String,
  location: {
    country: String,
    region: String,
    city: String,
     isp: String,
    lat: Number,
    lon: Number,
  },

    deviceInfo: {
    os: String,
    device: String,
    browser: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, {timestamps : true, versionKey : false});

module.exports = mongoose.model("Visitor", visitorSchema);