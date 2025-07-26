// const mongoose = require("mongoose");

// const VisitorSchema = new mongoose.Schema({
//   ip: { 
//     type: String, 
//     required: true, 
  
// },

// //   date: 
// //   { type: Date, 
// //     default: Date.now 
// // }

//  date: { type: String, required: true }
// },{timestamps: true, versionKey : false});

// module.exports = mongoose.model("Visitor", VisitorSchema);


// const mongoose = require("mongoose");

// const VisitorSchema = new mongoose.Schema({
//   ip: { type: String, required: true },
//   date: { type: String, required: true },
//   country: String,
//   region: String,
//   city: String,
//   isp: String,
//   lat: Number,
//   lon: Number,
// }, { timestamps: true, versionKey: false });

// module.exports = mongoose.model("Visitor", VisitorSchema);


// const mongoose = require("mongoose");

// const visitorSchema = new mongoose.Schema({
//   ip: String,
//   date: String,
//   location: String,
// },{timestamps: true, versionKey: false});

// module.exports = mongoose.model("Visitor", visitorSchema);


// models/Visitor.js
const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  ip: String,
  date: String,
  location: {
    country: String,
    region: String,
    city: String,
    isp: String,
    lat: Number,
    lon: Number,
  },
}, { timestamps: true, versionKey: false });

module.exports = mongoose.model("Visitor", visitorSchema);


