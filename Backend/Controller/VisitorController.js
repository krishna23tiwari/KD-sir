const requestIp = require("request-ip");
const Visitor = require("../Model/Visitors");
const Counter = require("../Model/Counter");
const moment = require("moment");
const { getLocationFromIP } = require("../Utility/ipLocation");
const { getDeviceInfo } = require("../Utility/deviceinfo");
const crypto = require("crypto");
const momentz = require("moment-timezone");

// exports.trackVisitor = async (req, res) => {
//   const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
//              req.connection?.remoteAddress ||
//              req.socket?.remoteAddress ||
//              req.ip ||
//              "Unknown";

//              console.log("🧠 IP:", ip);

//              console.log("📩 Visitor route hit");


//   // const fingerprint = req.body.fingerprint || null;

//   // const today = moment().format("YYYY-MM-DD");
//   const today = momentz().tz("Asia/Kolkata").format("YYYY-MM-DD");

//   //  if (!fingerprint) {
//   //     return res.status(400).json({ message: "Missing fingerprint" });
//   //   }

//   try {
//     const location = await getLocationFromIP(ip);
//     const deviceInfo = getDeviceInfo(req);
//     const deviceHash = crypto
//       .createHash("sha256")
//       .update(`${deviceInfo.os}-${deviceInfo.device}-${deviceInfo.browser}`)
//       .digest("hex");

//       console.log("🔐 Device Hash:", deviceHash);

//     let counter = await Counter.findOne({ date: today });

//     // const isUnique = !counter?.uniqueVisitors?.some(
//     //    v.deviceHash === deviceHash
//     // );

//        const isUnique = !counter?.uniqueVisitors?.some(
//       (v) => v.ip === ip && v.deviceHash === deviceHash
//     );



//     if (isUnique) {
//       // Save new visitor
//         // const cleanLocation = {
//         // lat: isNaN(location.lat) ? null : Number(location.lat),
//         // lon: isNaN(location.lon) ? null : Number(location.lon),
//         // };
//       await Visitor.create({ ip, location, deviceInfo });

//       if (!counter) {
//         const lastCounter = await Counter.findOne().sort({ createdAt: -1 });
//         const totalCount = lastCounter ? lastCounter.totalCount : 0;

//         counter = await Counter.create({
//           date: today,
//           todayCount: 1,
//           totalCount: totalCount + 1,
//           uniqueVisitors: [{ ip, deviceHash }],
//         });
//       } else {
//         counter.todayCount += 1;
//         counter.totalCount += 1;
//         counter.uniqueVisitors.push({ ip, deviceHash });
//         await counter.save();
//       }
//     }

//     res.status(200).json({
//       message: isUnique ? "Visitor tracked" : "Already counted today",
//       ip,
//       location,
//       deviceInfo,
//     });
//   } catch (err) {
//     console.error("❌ Visitor tracking failed:", err);
//     res.status(500).json({ error: "Failed to track visitor" });
//   }
// };


// exports.trackVisitor = async (req, res) => {
//   const ip =
//     req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
//     req.socket?.remoteAddress ||
//     req.connection?.remoteAddress ||
//     req.ip ||
//     "Unknown";

//   console.log("Extracted IP:", ip);

//   const today = moment().format("YYYY-MM-DD");
//   // const today = momentz().tz("Asia/Kolkata").format("YYYY-MM-DD");

//   try {
//     const location = await getLocationFromIP(ip);
//     const deviceInfo = getDeviceInfo(req);
//     const deviceHash = crypto
//       .createHash("sha256")
//       .update(`${deviceInfo.os}-${deviceInfo.device}-${deviceInfo.browser}`)
//       .digest("hex");

//     let counter = await Counter.findOne({ date: today });

//     const isUnique = !counter?.uniqueVisitors?.some(
//       (v) => v.ip === ip && v.deviceHash === deviceHash
//     );

//     if (isUnique) {
//       await Visitor.create({ ip, location, deviceInfo });

//       if (!counter) {
//         const lastCounter = await Counter.findOne().sort({ createdAt: -1 });
//         const totalCount = lastCounter ? lastCounter.totalCount : 0;

//         counter = await Counter.create({
//           date: today,
//           todayCount: 1,
//           totalCount: totalCount + 1,
//           uniqueVisitors: [{ ip, deviceHash }],
//         });
//       } else {
//         counter.todayCount += 1;
//         counter.totalCount += 1;
//         counter.uniqueVisitors.push({ ip, deviceHash });
//         await counter.save();
//       }
//     }

//     res.status(200).json({
//       message: isUnique ? "Visitor tracked" : "Already counted today",
//       ip,
//     });
//   } catch (err) {
//     console.error("❌ Visitor tracking failed:", err);
//     res.status(500).json({ error: "Failed to track visitor" });
//   }
// };



// exports.trackVisitor = async (req, res) => {
//   const ip =
//     req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
//     req.socket?.remoteAddress ||
//     req.connection?.remoteAddress ||
//     req.ip ||
//     "Unknown";

//   console.log("🧠 IP:", ip);
//   console.log("📩 Visitor route hit");

  
//   const today = momentz().tz("Asia/Kolkata").format("YYYY-MM-DD");

//   try {
//     const location = await getLocationFromIP(ip);
//     const deviceInfo = getDeviceInfo(req);
//     const deviceHash = crypto
//       .createHash("sha256")
//       .update(`${deviceInfo.os}-${deviceInfo.device}-${deviceInfo.browser}`)
//       .digest("hex");

//     console.log("🔐 Device Hash:", deviceHash);

//     let counter = await Counter.findOne({ date: today });

//     const isUnique = !counter?.uniqueVisitors?.some(
//       (v) => v.ip === ip && v.deviceHash === deviceHash
//     );

//     if (isUnique) {
//       await Visitor.create({ ip, location, deviceInfo });

//       if (!counter) {
//         const lastCounter = await Counter.findOne().sort({ createdAt: -1 });
//         const totalCount = lastCounter ? lastCounter.totalCount : 0;

//         counter = await Counter.create({
//           date: today,
//           todayCount: 1,
//           totalCount: totalCount + 1,
//           uniqueVisitors: [{ ip, deviceHash }],
//         });
//       } else {
//         counter.todayCount += 1;
//         counter.totalCount += 1;
//         counter.uniqueVisitors.push({ ip, deviceHash });
//         await counter.save();
//       }
//     }

//     res.status(200).json({
//       message: isUnique ? "Visitor tracked" : "Already counted today",
//       ip,
//       location,
//       deviceInfo,
//     });
//   } catch (err) {
//     console.error("❌ Visitor tracking failed:", err);
//     res.status(500).json({ error: "Failed to track visitor" });
//   }
// };


exports.trackVisitor = async (req, res) => {
  // Extract IP (falls back through various possible sources)
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.socket?.remoteAddress ||
    req.connection?.remoteAddress ||
    req.ip ||
    "Unknown";

  console.log("🧠 IP:", ip);
  console.log("📩 Visitor route hit");
  console.log("Headers snapshot:", {
    "user-agent": req.headers["user-agent"],
    accept: req.headers["accept"],
    "x-forwarded-for": req.headers["x-forwarded-for"],
  });

  // Ignore internal/local traffic
  if (ip === "::1" || ip === "127.0.0.1") {
    return res.status(200).json({ message: "Ignored internal request", ip });
  }

  // Optional: ignore very minimalistic requests that look like health checks or probes.
  const ua = (req.headers["user-agent"] || "").toLowerCase();
  if (
    !req.headers["accept"] || // missing normal browser headers
    ua.includes("render") || // heuristic: Render internal checks might include identifiable substrings; adjust after inspecting real logs
    ua === "" // blank UA
  ) {
    return res.status(200).json({ message: "Ignored probe/internal-like request", ip });
  }

  // Use consistent IST date
  const today = momentz().tz("Asia/Kolkata").format("YYYY-MM-DD");
  console.log("Tracking date (IST):", today);

  try {
    // Fetch location and device info (wrap for resilience if necessary)
    let location = {};
    try {
      location = await getLocationFromIP(ip);
    } catch (e) {
      console.warn("Location lookup failed, proceeding with empty location", e);
    }

    let deviceInfo = {};
    try {
      deviceInfo = getDeviceInfo(req);
    } catch (e) {
      console.warn("Device info extraction failed, proceeding with empty deviceInfo", e);
    }

    const deviceHash = crypto
      .createHash("sha256")
      .update(`${deviceInfo.os || ""}-${deviceInfo.device || ""}-${deviceInfo.browser || ""}`)
      .digest("hex");

    console.log("🔐 Device Hash:", deviceHash);

    // Fetch today's counter
    let counter = await Counter.findOne({ date: today });
    console.log("Existing counter for today:", counter ? "FOUND" : "NOT FOUND");

    // Check uniqueness: ip + deviceHash pair
    const alreadySeen = counter?.uniqueVisitors?.some(
      (v) => v.ip === ip && v.deviceHash === deviceHash
    );
    const isUnique = !alreadySeen;
    console.log("Is unique visitor today?", isUnique);

    if (isUnique) {
      // Save visitor record
      await Visitor.create({ ip, location, deviceInfo });

      if (!counter) {
        // No counter for today yet: create fresh
        const latest = await Counter.findOne().sort({ createdAt: -1 });
        const totalCount = latest ? latest.totalCount : 0;

        counter = await Counter.create({
          date: today,
          todayCount: 1,
          totalCount: totalCount + 1,
          uniqueVisitors: [{ ip, deviceHash }],
        });

        console.log("Created new counter for today:", counter);
      } else {
        // Update existing counter atomically-ish
        counter = await Counter.findOneAndUpdate(
          { date: today },
          {
            $inc: { todayCount: 1, totalCount: 1 },
            $addToSet: { uniqueVisitors: { ip, deviceHash } },
          },
          { new: true }
        );
        console.log("Updated existing counter:", counter);
      }
    }

    // Respond
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
   
    const today = momentz().tz("Asia/Kolkata").format("YYYY-MM-DD");
    // console.log("Today's date (IST):", today);

  
    const record = await Counter.findOne({ date: today });

    if (!record) {
     
      const latest = await Counter.findOne().sort({ date: -1 });

      if (!latest) {
        console.log("No records found at all.");
        return res.status(200).json({ todayCount: 0, totalCount: 0 });
      }

      console.log("No record for today. Showing latest available:", latest.date);
      return res.status(200).json({
        todayCount: 0,
        totalCount: latest.totalCount || 0,
      });
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
