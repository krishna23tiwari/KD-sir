// const mongoose = require("mongoose");

// const AboutSchema = new mongoose.Schema({
//   intro: String,
//   overview: String,
//   degree: String,
//   cgpa: String,
//   email: String,
//   services: [
//     {
//       title: String,
//       icon: String,
//     },
//   ],
// });

// module.exports = mongoose.model("About", AboutSchema);


// const mongoose = require("mongoose");

// const aboutSchema = new mongoose.Schema(
//   {
//     introduction: { type: String, required: true }, // The intro paragraph
//     services: [
//       {
//         title: { type: String, required: true },
//         icon: { type: String, required: true }, // URL or filename of icon
//       },
//     ],

//     resumelink : { type : String}
//   },
//   { timestamps: true, versionKey: false }
// );

// module.exports = mongoose.model("About", aboutSchema);


const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
  {
    introduction: { type: String, required: true }, // The intro paragraph
    services: [
      {
        title: { type: String, required: true },
        description: { type: String },  // 👈 add this
        icon: { type: String, required: false }, // URL or filename of icon
      },
    ],
    resumelink : { type : String }
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("About", aboutSchema);
