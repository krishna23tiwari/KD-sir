// models/Config.js
const mongoose = require("mongoose");

const configSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Config", configSchema);
