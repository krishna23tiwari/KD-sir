const About = require('../Model/AboutModel')
const { uploadFile } = require('../Utility/ImagesUpload');

exports.saveintro = async (req, res) => {
  try {
    const { introduction, services } = req.body;
    const parsedServices = JSON.parse(services || "[]"); 
    const savedServices = [];

    for (let i = 0; i < parsedServices.length; i++) {
      const service = parsedServices[i];
      let iconUrl = service.icon || "";

     
      if (req.files && req.files[`icon${i}`]) {
        const uploaded = await uploadFile(req.files[`icon${i}`]);
        iconUrl = uploaded.secure_url;
      }

      savedServices.push({
        title: service.title,
        description: service.description,
        icon: iconUrl,
       
      });
    }

    const about = new About({
      introduction,
      services: savedServices,
    });

    await about.save();
    res.status(201).json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.showintro = async(req, res) => {
    try {
    const about = await About.findOne(); 
    if (!about) return res.status(404).json({ message: "No intro found" });
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.editintro = async (req, res) => {
  try {
    const { introduction, services } = req.body;

    const about = await About.findById(req.params.id);
    if (!about) {
      return res.status(404).json({ message: "About not found" });
    }

    if (introduction) {
      about.introduction = introduction;
    }

   
    
    let parsedServices = [];
    if (services) {
      parsedServices = Array.isArray(services) ? services : JSON.parse(services);
    }

    if (parsedServices.length > 0) {
      const updatedServices = [];

      for (let i = 0; i < parsedServices.length; i++) {
        const service = parsedServices[i];

        let iconUrl = service.icon || about.services?.[i]?.icon || "";

      
        if (req.files && req.files[`icon${i}`]) {
          const uploaded = await uploadFile(req.files[`icon${i}`]);
          iconUrl = uploaded.secure_url;
        }

        updatedServices.push({
          title: service.title || about.services?.[i]?.title,
          description: service.description || about.services?.[i]?.description,
          icon: iconUrl,
        });
      }

     
      about.services = updatedServices;
    }

    const updated = await about.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



