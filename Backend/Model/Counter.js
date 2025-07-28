// const mongoose = require("mongoose");

// const CounterSchema = new mongoose.Schema({
//   date: {
//      type: String, 
//     required: true 
// }, 
//   todayCount: { 
//     type: Number, 
//     default: 0 
// },
//   totalCount: { 
//     type: Number, 
//     default: 0 
// }
// },{timestamps: true, versionKey : false});

// module.exports = mongoose.model("Counter", CounterSchema);

const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
  date: {
    type: String, 
    required: true,
    // unique: true,
  },
  todayCount: {
    type: Number,
    default: 0,
  },
  totalCount: {
    type: Number,
    default: 0,
  },
  uniqueVisitors: [
    {
      ip: String,
      deviceHash: String, // hashed device info to check uniqueness
    },
  ],
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("Counter", counterSchema);

