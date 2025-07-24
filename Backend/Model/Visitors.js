const mongoose = require("mongoose");

const VisitorSchema = new mongoose.Schema({
  ip: { 
    type: String, 
    required: true, 
    unique: true 
},

  date: 
  { type: Date, 
    default: Date.now 
}
},{timestamps: true, versionKey : false});

module.exports = mongoose.model("Visitor", VisitorSchema);
