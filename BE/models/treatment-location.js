const mongoose = require("mongoose");

const TreatmentLocation = new mongoose.Schema({
  name: {
    type: String,
  },
  capacity: {
    type: Number,
  },
  currentAllocation: {
    type: Number,
  }
});

module.exports = mongoose.model('TreatmentLocation', TreatmentLocation);