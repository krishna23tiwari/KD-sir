const requestIp = require("request-ip");
const Visitor = require("../Model/Visitors");
const Counter = require("../Model/Counter");
const moment = require("moment");
const { getLocationFromIP } = require("../Utility/ipLocation");

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


// exports.trackVisitor = async (req, res) => {
//   const ip = requestIp.getClientIp(req);
//   const today = moment().format("YYYY-MM-DD");

//   try {
//     const existingVisitor = await Visitor.findOne({ ip, date: today });
//     let counter = await Counter.findOne({ date: today });

//     if (!counter) {
//       const lastCounter = await Counter.findOne().sort({ _id: -1 });
//       const totalCount = lastCounter?.totalCount || 0;

//       counter = await Counter.create({
//         date: today,
//         todayCount: 1,
//         totalCount: totalCount + 1,
//       });

//       await Visitor.create({ ip, date: today });
//     } else if (!existingVisitor) {
//       try {
//         await Visitor.create({ ip, date: today });
//         counter.todayCount += 1;
//         counter.totalCount += 1;
//         await counter.save();
//       } catch (e) {
//         if (e.code !== 11000) throw e;
//       }
//     }

//     res.status(200).json({ todayCount: counter.todayCount, totalCount: counter.totalCount });
//   } catch (err) {
//     console.error("❌ TrackVisitor error:", err.message);
//     console.error(err.stack);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

exports.trackVisitor = async (req, res) => {
  const ip = requestIp.getClientIp(req);
  const today = moment().format("YYYY-MM-DD");

  try {
    const existingVisitor = await Visitor.findOne({ ip, date: today });
    let counter = await Counter.findOne({ date: today });

    if (!counter) {
      await Visitor.deleteMany({}); // reset daily visitors
      counter = await Counter.create({
        date: today,
        todayCount: 1,
        totalCount: (await Counter.findOne().sort({ _id: -1 }))?.totalCount + 1 || 1,
      });

      const location = await getLocationFromIP(ip);
      await Visitor.create({ ip, date: today, location });
    } else if (!existingVisitor) {
      const location = await getLocationFromIP(ip);
      await Visitor.create({ ip, date: today, location });
      counter.todayCount += 1;
      counter.totalCount += 1;
      await counter.save();
    }

    res.status(200).json({ todayCount: counter.todayCount, totalCount: counter.totalCount });
  } catch (error) {
    console.error("TrackVisitor error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
