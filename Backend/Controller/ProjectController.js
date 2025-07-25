const Project = require("../Model/ProjectModel");
const{uploadFile} = require('../Utility/ImagesUpload')
const fs = require('fs')


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

exports.delete = async(req, res) => {
    try {
        const {id} = req.params

        const user = await Project.findByIdAndDelete(id)

        if(!user){
            return res.status(404).json({ message: "Project not found" });
        }
        return res.status(200).json({ message: "Project deleted successfully" });

    } catch (error) {

        console.error("Delete Project Error:", error);
        return res.status(500).json({ message: "Failed to delete project", error: error.message });
    }
}

exports.update = async (req, res) => {
  try {
    const projectId = req.params.id;
    const existingProject = await Project.findById(projectId);

    if (!existingProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    let imageUrl = existingProject.image;

    if (req.files && req.files.image) {
      const uploaded = await uploadFile(req.files.image);
      imageUrl = uploaded.secure_url;
    }

    const { name, description, link, source_code_link, tags } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        name,
        description,
        link,
        source_code_link,
        image: imageUrl,
        tags: JSON.parse(tags),
      },
      { new: true }
    );

    return res.status(200).json({ message: "Project updated", project: updatedProject });
  } catch (error) {
    console.error("Update Project Error:", error);
    return res.status(500).json({ message: "Failed to update project", error: error.message });
  }
};

