const requestIp = require("request-ip");
const Visitor = require("../Model/Visitors");
const Counter = require("../Model/Counter");
const moment = require("moment");
const { getLocationFromIP } = require("../Utility/ipLocation");
const { getDeviceInfo } = require("../Utility/deviceinfo");
const crypto = require("crypto");

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

// exports.trackVisitor = async (req, res) => {
//   // const ip = requestIp.getClientIp(req) || req.ip || req.connection.remoteAddress || "Unknown";

//   const ip =
//   req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
//   req.connection?.remoteAddress ||
//   req.socket?.remoteAddress ||
//   requestIp.getClientIp(req) ||
//   "Unknown";

//   console.log("🟡 Headers:", req.headers);
// console.log("🟡 IP Detected:", ip);


// console.log("Visitor IP:", ip);

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

//       const location = await getLocationFromIP(ip);
//       await Visitor.create({ ip, date: today, location });
//     } else if (!existingVisitor) {
//       const location = await getLocationFromIP(ip);
//       await Visitor.create({ ip, date: today, location });

//       counter.todayCount += 1;
//       counter.totalCount += 1;
//       await counter.save();
//     }

//     res.status(200).json({
//       todayCount: counter.todayCount,
//       totalCount: counter.totalCount,
//     });
//   } catch (err) {
//     console.error("❌ TrackVisitor error:", err.message);
//     console.error(err.stack);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };


// exports.trackVisitor = async (req, res) => {
//   const fingerprint = req.body.fingerprint;

//   const ip =
//     req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
//     req.connection?.remoteAddress ||
//     req.socket?.remoteAddress ||
//     requestIp.getClientIp(req) ||
//     "Unknown";

//   const today = moment().format("YYYY-MM-DD");

//   try {
//     let counter = await Counter.findOne({ date: today });

//     const existingVisitor = await Visitor.findOne({
//       $or: [
//         { ip, date: today },
//         { fingerprint, date: today },
//       ],
//     });

//     if (!existingVisitor) {
//       // New visitor today
//       const location = await getLocationFromIP(ip);

//       await Visitor.create({
//         ip,
//         fingerprint: fingerprint || null,
//         date: today,
//         location,
//       });

//       if (!counter) {
//         // First visitor today
//         const lastCounter = await Counter.findOne().sort({ _id: -1 });
//         const totalCount = lastCounter?.totalCount || 0;

//         counter = await Counter.create({
//           date: today,
//           todayCount: 1,
//           totalCount: totalCount + 1,
//         });
//       } else {
//         counter.todayCount += 1;
//         counter.totalCount += 1;
//         await counter.save();
//       }
//     }

//     const todayCount = counter?.todayCount || 0;
//     const totalCount = counter?.totalCount || 0;

//     res.status(200).json({ todayCount, totalCount });
//   } catch (err) {
//     console.error("❌ TrackVisitor error:", err.message);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };


exports.trackVisitor = async (req, res) => {
  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
             req.connection?.remoteAddress ||
             req.socket?.remoteAddress ||
             "Unknown";

  const today = moment().format("YYYY-MM-DD");

  try {
    const location = await getLocationFromIP(ip);
    const deviceInfo = getDeviceInfo(req);
    const deviceHash = crypto
      .createHash("sha256")
      .update(`${deviceInfo.os}-${deviceInfo.device}-${deviceInfo.browser}`)
      .digest("hex");

    let counter = await Counter.findOne({ date: today });

    const isUnique = !counter?.uniqueVisitors?.some(
      (v) => v.ip === ip && v.deviceHash === deviceHash
    );

    if (isUnique) {
      // Save new visitor
      await Visitor.create({ ip, location, deviceInfo });

      if (!counter) {
        const lastCounter = await Counter.findOne().sort({ createdAt: -1 });
        const totalCount = lastCounter ? lastCounter.totalCount : 0;

        counter = await Counter.create({
          date: today,
          todayCount: 1,
          totalCount: totalCount + 1,
          uniqueVisitors: [{ ip, deviceHash }],
        });
      } else {
        counter.todayCount += 1;
        counter.totalCount += 1;
        counter.uniqueVisitors.push({ ip, deviceHash });
        await counter.save();
      }
    }

    res.status(200).json({
      message: isUnique ? "Visitor tracked" : "Already counted today",
      ip,
      location,
      deviceInfo,
    });
  } catch (err) {
    console.error("❌ Visitor tracking failed:", err);
    res.status(500).json({ error: "Failed to track visitor" });
  }
};



exports.test = async(req, res) => {
    try {
    const doc = await Counter.create({
      date: "2025-07-24",
      todayCount: 1,
      totalCount: 1,
      uniqueVisitors: [{ ip: "1.1.1.1", deviceHash: "abcd1234" }],
    });

    res.status(201).json({ message: "Created", doc });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create" });
  }
}

exports.getCounts = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const record = await Counter.findOne({ date: today });

    if (!record) {
      return res.status(200).json({ todayCount: 0, totalCount: 0 });
    }

    return res.status(200).json({
      todayCount: record.todayCount,
      totalCount: record.totalCount,
    });
  } catch (error) {
    console.error("Failed to fetch counts:", error);
    res.status(500).json({ message: "Failed to fetch counts" });
  }
};