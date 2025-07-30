const HeroText = require("../Model/HeroTextMoel");

exports.getHeroText = async (req, res) => {
  try {
    const data = await HeroText.findOne();
    // console.log("Hero data:", data);
    res.json(data);
  } catch (err) {
    console.error("Error fetching:", err);
    res.status(500).json({ message: "Failed to fetch hero text" });
  }
};

exports.gettingdata =  async (req, res) => {
  const { titles, subheading } = req.body;
  const newHero = new HeroText({ titles, subheading });
  await newHero.save();
  res.json(newHero);
};

exports.delete = async (req, res) => {
  await HeroText.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

exports.updateHeroText = async (req, res) => {
  try {
    const { titles, subheading } = req.body;
    let data = await HeroText.findOne();

    if (data) {
      data.titles = titles;
      data.subheading = subheading;
      await data.save();
    } else {
      data = await HeroText.create({ titles, subheading });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to update hero text" });
  }
};
