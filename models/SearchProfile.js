import mongoose, { Schema, model, models } from "mongoose";

const SearchProfileSchema = new Schema(
  {
    nickname: {
      type: String,
      index: true,
    },
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
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.models.SearchProfile ||
  mongoose.model("SearchProfile", SearchProfileSchema);
