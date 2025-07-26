const requestIp = require("request-ip");
const Visitor = require("../Model/Visitors");
const Counter = require("../Model/Counter");
const moment = require("moment");

// exports.trackVisitor = async (req, res) => {
//   // const ip = req.ip || req.connection.remoteAddress;

//   const ip =
//   req.headers["x-forwarded-for"]?.split(",")[0] || 
//   req.connection.remoteAddress || 
//   req.ip;

//   const today = moment().format("YYYY-MM-DD");

//   try {
//     const existingVisitor = await Visitor.findOne({ ip });

//     let counter = await Counter.findOne({ date: today });

//     if (!counter) {
      
//       await Visitor.deleteMany({});
//       counter = await Counter.create({
//         date: today,
//         todayCount: 1,
//         totalCount: (await Counter.findOne().sort({ _id: -1 }))?.totalCount + 1 || 1
//       });
//       await Visitor.create({ ip });
//     } else if (!existingVisitor) {
     
//       await Visitor.create({ ip });
//       counter.todayCount += 1;
//       counter.totalCount += 1;
//       await counter.save();
//     }

//     res.status(200).json({ todayCount: counter.todayCount, totalCount: counter.totalCount });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.trackVisitor = async (req, res) => {
//   const ip = requestIp.getClientIp(req); // <-- ✅ reliable IP extraction
//   console.log("Detected IP:", ip);

//   const today = moment().format("YYYY-MM-DD");

//   try {
//     const existingVisitor = await Visitor.findOne({ ip });

//     let counter = await Counter.findOne({ date: today });

//     if (!counter) {
//       await Visitor.deleteMany({});
//       counter = await Counter.create({
//         date: today,
//         todayCount: 1,
//         totalCount: (await Counter.findOne().sort({ _id: -1 }))?.totalCount + 1 || 1
//       });
//       await Visitor.create({ ip });
//     } else if (!existingVisitor) {
//       await Visitor.create({ ip });
//       counter.todayCount += 1;
//       counter.totalCount += 1;
//       await counter.save();
//     }

//     res.status(200).json({ todayCount: counter.todayCount, totalCount: counter.totalCount });
//   } catch (err) {
//     console.error("TrackVisitor error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };


exports.trackVisitor = async (req, res) => {
  const ip = requestIp.getClientIp(req);
  const today = moment().format("YYYY-MM-DD");

  try {
    // Check if this IP has already visited today
    const existingVisitor = await Visitor.findOne({ ip, date: today });

    let counter = await Counter.findOne({ date: today });

    if (!counter) {
      // First visit today: create counter, store IP
      await Visitor.deleteMany({}); // optional if you're using date in Visitor now
      counter = await Counter.create({
        date: today,
        todayCount: 1,
        totalCount: (await Counter.findOne().sort({ _id: -1 }))?.totalCount + 1 || 1,
      });
      await Visitor.create({ ip, date: today });
    } else if (!existingVisitor) {
      // New IP for today
      await Visitor.create({ ip, date: today });
      counter.todayCount += 1;
      counter.totalCount += 1;
      await counter.save();
    }

    res.status(200).json({ todayCount: counter.todayCount, totalCount: counter.totalCount });
  } catch (err) {
    console.error("TrackVisitor error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
