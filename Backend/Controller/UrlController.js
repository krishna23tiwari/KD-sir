// const urlModel = require('../Model/UrlModel')

// exports.url = async(req, res) => {

//       try {
//     const doc = await urlModel.findOne({ key: "aws_url" });
//     return res.json({ awsUrl: doc ? doc.value : "https://aws.amazon.com" });
//   } catch (err) {
//     console.error("Failed to fetch aws_url:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// }


// exports.update = async(req, res) =>{
//      try {
//     const { awsUrl } = req.body;
//     if (!awsUrl) return res.status(400).json({ message: "awsUrl required" });

//     const updated = await urlModel.findOneAndUpdate(
//       { key: "aws_url" },
//       { value: awsUrl },
//       { upsert: true, new: true, setDefaultsOnInsert: true }
//     );
//     res.json({ awsUrl: updated.value });
//   } catch (err) {
//     console.error("Failed to update aws_url:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// }


const urlModel = require('../Model/UrlModel');

// Get the stored URL (default if none exists)
exports.getUrl = async (req, res) => {
  try {
    const doc = await urlModel.findOne({ key: "main_link" });
    return res.json({ url: doc ? doc.value : "https://example.com" });
  } catch (err) {
    console.error("Failed to fetch URL:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update or create the URL
exports.updateUrl = async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ message: "URL is required" });

    const updated = await urlModel.findOneAndUpdate(
      { key: "main_link" },
      { value: url },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({ url: updated.value });
  } catch (err) {
    console.error("Failed to update URL:", err);
    res.status(500).json({ message: "Server error" });
  }
};
