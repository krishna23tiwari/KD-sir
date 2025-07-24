const Visitor = require("../Model/Visitors");
const Counter = require("../Model/Counter");
const moment = require("moment");

exports.trackVisitor = async (req, res) => {
  const ip = req.ip || req.connection.remoteAddress;
  const today = moment().format("YYYY-MM-DD");

  try {
    const existingVisitor = await Visitor.findOne({ ip });

    let counter = await Counter.findOne({ date: today });

    if (!counter) {
      
      await Visitor.deleteMany({});
      counter = await Counter.create({
        date: today,
        todayCount: 1,
        totalCount: (await Counter.findOne().sort({ _id: -1 }))?.totalCount + 1 || 1
      });
      await Visitor.create({ ip });
    } else if (!existingVisitor) {
     
      await Visitor.create({ ip });
      counter.todayCount += 1;
      counter.totalCount += 1;
      await counter.save();
    }

    res.status(200).json({ todayCount: counter.todayCount, totalCount: counter.totalCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
