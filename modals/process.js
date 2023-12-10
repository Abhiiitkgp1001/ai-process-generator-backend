const mongoose = require("mongoose");

const ProcessSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  description:{
    type: String,
  },
  steps:[
    {
        number: {
            type: Number,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    }
  ]
});

module.exports = mongoose.model("ProcessSchema", ProcessSchema);
