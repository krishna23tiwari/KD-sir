const Experience = require("../Model/Experience");
const { uploadFile } = require("../Utility/ImagesUpload");


exports.getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// exports.addExperience = async (req, res) => {
//   try {
//     const experience = new Experience(req.body);
//     await experience.save();
//     res.status(201).json(experience);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };


// exports.updateExperience = async (req, res) => {
//   try {
//     const updated = await Experience.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(updated);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };


exports.addExperience = async (req, res) => {
  try {
    console.log(`>>>body>>>`, req.body)
    let iconUrl = "";

    // If logo is uploaded
    if (req.files && req.files.icon) {
      const uploaded = await uploadFile(req.files.icon);
      iconUrl = uploaded.secure_url;
    }

    const experience = new Experience({
      ...req.body,
      icon: iconUrl || req.body.icon, // fallback if user provides direct URL
    });

    await experience.save();
    res.status(201).json({message: "api hit" ,experience});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }



};

// Update Experience with optional new image
exports.updateExperience = async (req, res) => {
  try {
    let updateData = { ...req.body };

    // If new logo is uploaded
    if (req.files && req.files.icon) {
      const uploaded = await uploadFile(req.files.icon);
      updateData.icon = uploaded.secure_url;
    }

    const updated = await Experience.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.deleteExperience = async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ message: "Experience deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
