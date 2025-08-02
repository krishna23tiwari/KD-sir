// const cron = require("node-cron");
// const Visitor = require("../Model/Visitors");

// const scheduleVisitorReset = () => {
//   cron.schedule("0 0 * * *", async () => {
//     try {
//       await Visitor.deleteMany({});
//       console.log("✅ Visitor IPs reset at midnight.");
//     } catch (error) {
//       console.error("❌ Failed to reset visitor IPs:", error);
//     }
//   },
//    {
//       timezone: "Asia/Kolkata", 
//     }

// );
// };

// module.exports = scheduleVisitorReset;

// const cron = require("node-cron");
// const Visitor = require("../Model/Visitors");
// const Counter = require("../Model/Counter");
// const moment = require("moment");

// const scheduleVisitorReset = () => {
//   cron.schedule(
//     "* * * * *", // every day at 00:00
//     async () => {
//       const today = moment().format("YYYY-MM-DD");

//       try {
//         // Delete all visitors (optional if you're tracking by Counter only)
//         await Visitor.deleteMany({});
//         console.log("✅ Visitor IPs reset at midnight.");

//         // Reset today's counter
//         const result = await Counter.findOneAndUpdate(
//           { date: today },
//           { $set: { todayCount: 0, uniqueVisitors: [] } }
//         );

//         if (result) {
//           console.log("✅ Today's counter reset.");
//         } else {
//           console.log("ℹ️ No counter found for today.");
//         }
//       } catch (error) {
//         console.error("❌ Failed to reset data:", error);
//       }
//     },
//     {
//       timezone: "Asia/Kolkata",
//     }
//   );
// };

// module.exports = scheduleVisitorReset;

// const cron = require("node-cron");
// const Visitor = require("../Model/Visitors");
// const Counter = require("../Model/Counter");

// const scheduleVisitorReset = () => {
//   cron.schedule(
//     "0 0 * * *", // every midnight
//     async () => {
//       try {
//         await Visitor.deleteMany({});
//         console.log("✅ Visitor IPs reset at midnight.");

//         // Get latest counter document (sorted by created date)
//         const latestCounter = await Counter.findOne({}, {}, { sort: { createdAt: -1 } });

//         if (latestCounter) {
//           latestCounter.todayCount = 0;
//           latestCounter.uniqueVisitors = [];
//           await latestCounter.save();

//           console.log("✅ Latest counter reset:", latestCounter.date);
//         } else {
//           console.log("ℹ️ No counter found to reset.");
//         }
//       } catch (error) {
//         console.error("❌ Cron reset failed:", error);
//       }
//     },
//     {
//       timezone: "Asia/Kolkata",
//     }
//   );
// };

// module.exports = scheduleVisitorReset;


const cron = require("node-cron");
const momentz = require("moment-timezone");
const Counter = require("../Model/Counter");

const scheduleVisitorReset = () => {
  cron.schedule(
    "0 0 * * *", // every midnight IST
    async () => {
      try {
        const today = momentz().tz("Asia/Kolkata").format("YYYY-MM-DD");

        let todayCounter = await Counter.findOne({ date: today });

        if (todayCounter) {
          // Reset existing today's counter
          todayCounter.todayCount = 0;
          todayCounter.uniqueVisitors = [];
          await todayCounter.save();
          console.log(`✅ Existing counter for ${today} reset.`);
        } else {
          // Create new counter for today, carrying forward totalCount
          const latest = await Counter.findOne().sort({ date: -1 });
          const carryTotal = latest ? latest.totalCount : 0;

          todayCounter = await Counter.create({
            date: today,
            todayCount: 0,
            totalCount: carryTotal,
            uniqueVisitors: [],
          });
          console.log(`✅ Created new counter for ${today}:`, todayCounter);
        }
      } catch (error) {
        console.error("❌ Cron reset failed:", error);
      }
    },
    {
      timezone: "Asia/Kolkata",
    }
  );
};

module.exports = scheduleVisitorReset;
