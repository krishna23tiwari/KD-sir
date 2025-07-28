const requestIp = require("request-ip");
const Visitor = require("../Model/Visitors");
const Counter = require("../Model/Counter");
const moment = require("moment");
const { getLocationFromIP } = require("../Utility/ipLocation");
const { getDeviceInfo } = require("../Utility/deviceinfo");
const crypto = require("crypto");

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