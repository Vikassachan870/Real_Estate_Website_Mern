const mongoose = require("mongoose");
const { Schema } = mongoose;

const PropertySchema = new Schema(
  {
    images:[String],
    name: {
      type: String
    },
    propertytype: {
      type: String,
      enum: ["Plot", "Flat/Apartment", "Bunglow", "Villa", "Builder Floor"],
    },
    location: {
      type: String
    },
    propertyArea: {
      type: String
    },
    nearbylocations: {
      nearbylocation: [String]
    },
    dimensions:{
      type: String
    },
    constructionstatus: {
      type: String
    },
    roadwidth: {
      type: String
    },
    propertyface: {
      type: String
    },
    price: {
      type: String
    },
    negotiable: {
      type: String,
      default: "yes",
    },
    typeofownership: {
      type: String
    },
    bookingamount: {
      type: String
    },
    noofbathroom: {
      type: String
    },
    noofbedroom: {
      type: String
    },
    detaileddescrip: {
      type: String
    },
  },
  { timestamps: true }
);

module.exports=mongoose.model("Property",PropertySchema)