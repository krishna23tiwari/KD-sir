const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
    },
  description: {
    type:  String,
  },

  image: {
    type: String
 },

  link: { 
    type : String
  },

  source_code_link: {
    type: String
},
  tags: [
    {
      name: String,
      color: String,
    },
  ],
},{timestamps: true, versionKey : false});

module.exports = mongoose.model("Project", ProjectSchema);
