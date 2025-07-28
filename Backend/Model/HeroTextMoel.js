const mongoose = require("mongoose");

const heroTextSchema = new mongoose.Schema({
  titles: [String], 
  subheading: String,
}, { timestamps: true });

module.exports = mongoose.model("HeroText", heroTextSchema);
