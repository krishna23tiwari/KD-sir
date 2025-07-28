const About = require("../Model/AboutModel");

exports.getAboutInfo = async (req, res) => {
  try {
    const data = await About.findOne();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch about data" });
  }
};

// exports.updateAboutInfo = async (req, res) => {
//   try {
//     const updated = await About.findOneAndUpdate({}, req.body, { new: true, upsert: true });
//     res.status(200).json(updated);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to update about info" });
//   }
// };

// POST: Create new about info or overwrite the existing one
exports.createOrUpdateAbout = async (req, res) => {
  try {
    const data = req.body;

    // Upsert the document (insert if none exists, update otherwise)
    const result = await About.findOneAndUpdate({}, data, { upsert: true, new: true });
    res.status(200).json({ message: "About info saved successfully", data: result });
  } catch (err) {
    res.status(500).json({ message: "Failed to save about info", error: err.message });
  }
};

