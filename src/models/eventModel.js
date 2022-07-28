const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId


const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    createdBy: { type: ObjectId, ref:"user32", required: true },
    invitees:[{
        invitee:{
            type:ObjectId,
            ref : 'User32',
            required : true
        },
        invitedAt:{
            timestamps:true
        }
    }],
    isDeleted:{
      type:Boolean,
      default:false
  }
  },
  { timestamps: true }
);
module.exports = mongoose.model("events",eventSchema)
