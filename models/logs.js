//import Mongoose db
const mongoose = require("mongoose");

//create Schema
const logSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    entry: { type: String, required: true },
    shipIsBroken: { type: Boolean, default: true },
  },
  { timestamps: true }
);

//create model based on Schema
const Log = mongoose.model("Log", logSchema);

//export model
module.exports = Log;
