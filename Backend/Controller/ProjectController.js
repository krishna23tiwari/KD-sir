const Project = require("../Model/ProjectModel");
const{uploadFile} = require('../Utility/ImagesUpload')


exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};


exports.addProject = async (req, res) => {
  try {
    console.log("Received body:", req.body);
    console.log("Received files:", req.files);

    const file = req.files?.image;
    let imageUrl = "";

    if (file) {
      const uploaded = await uploadFile(file); 
      imageUrl = uploaded.secure_url;
    }

    const newProject = new Project({
      name: req.body.name,
      description: req.body.description,
      image: imageUrl,
      link: req.body.link,
      source_code_link: req.body.source_code_link,
      tags: JSON.parse(req.body.tags),
    });

    await newProject.save();

    return res.status(201).json({ message: "Project added successfully", project: newProject });
  } catch (error) {
    console.error("Add Project Error:", error);
    return res.status(500).json({ message: "Failed to add project", error: error.message });
  }
};

