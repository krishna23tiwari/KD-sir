const cron = require("node-cron");
const Visitor = require("../Model/Visitors");

const scheduleVisitorReset = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      await Visitor.deleteMany({});
      console.log("✅ Visitor IPs reset at midnight.");
    } catch (error) {
      console.error("❌ Failed to reset visitor IPs:", error);
    }
  },
   {
      timezone: "Asia/Kolkata", // Set timezone to IST
    }

);
};

module.exports = scheduleVisitorReset;
