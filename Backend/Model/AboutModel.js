const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema({
  intro: String,
  overview: String,
  degree: String,
  cgpa: String,
  email: String,
  services: [
    {
      title: String,
      icon: String,
    },
  ],
});

module.exports = mongoose.model("About", AboutSchema);
