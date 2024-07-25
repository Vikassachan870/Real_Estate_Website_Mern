const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String, 
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobileno: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String
  },
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Property',unique:true }],
  requests: [{ type: Schema.Types.ObjectId, ref: "requests" }],
  seenrequest: [{ type: Schema.Types.ObjectId, ref: "requests" }],
  notseenrequest: [{ type: Schema.Types.ObjectId, ref: "requests" }],
  role: {
    type: String,
    default: "viewer",
    enum:['viewer','admin']
  },
  createdAt: {
    type: Date,
  },
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);