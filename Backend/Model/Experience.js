
const mongoose = require("mongoose");

const experienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company_name: { type: String, required: true },
    icon: { type: String, required: true },
    iconBg: { type: String, default: "#fff" },
    date: { type: String, required: true },
    link: { type: String },
    points: [{ type: String, required: true }]
  },
  { timestamps: true, versionKey:false }
);

module.exports = mongoose.model("Experience", experienceSchema);
