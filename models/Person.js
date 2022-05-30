import mongoose, { Schema, model, models } from "mongoose";

const PersonSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    secondLastName: {
      type: String,
    },
    birthDate: {
      type: Date,
    },
    documentType: {
      type: String,
    },
    mobilePhone: {
      type: String,
    },
    documentNumber: {
      type: String,
    },
    sex: {
      type: String,
    },
    eyeColor: {
      type: String,
    },
    skinColor: {
      type: String,
    },
    hairType: {
      type: String,
    },
    hairColor: {
      type: String,
    },
    height: {
      type: Number,
    },
    departmentOfLastSighting: {
      type: String,
    },
    cityOfLastSighting: {
      type: String,
    },
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
    imgUrl: {
      type: String,
    },
    contactEmail: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.models.Person || mongoose.model("Person", PersonSchema);
