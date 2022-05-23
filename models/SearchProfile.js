import mongoose, { Schema, model, models } from "mongoose";

const SearchProfileSchema = new Schema({
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
  gender: {
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
    type: Float32Array,
  },
  departmentOfLastSighting: {
    type: String,
  },
  cityOfLastSighting: {
    type: String,
  },
  lat: {
    type: Float32Array,
  },
  lng: {
    type: Float32Array,
  },
  imgUrl: {
    type: String,
  },
});
export default mongoose.models.MissingPerson ||
  mongoose.model("SearchProfile", SearchProfileSchema);
