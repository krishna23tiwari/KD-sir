const mongoose = require("mongoose");

const VisitorSchema = new mongoose.Schema({
  ip: { 
    type: String, 
    required: true, 
  
},

//   date: 
//   { type: Date, 
//     default: Date.now 
// }

 date: { type: String, required: true }
},{timestamps: true, versionKey : false});

module.exports = mongoose.model("Visitor", VisitorSchema);
