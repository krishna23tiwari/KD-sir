const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
  date: {
     type: String, 
    required: true 
}, 
  todayCount: { 
    type: Number, 
    default: 0 
},
  totalCount: { 
    type: Number, 
    default: 0 
}
},{timestamps: true, versionKey : false});

module.exports = mongoose.model("Counter", CounterSchema);
