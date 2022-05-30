import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    sub: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    mobilePhone: {
      type: String,
    },
    hasFilledProfile: {
      type: Boolean,
      default: false,
      required: true,
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
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    cityOfBirth: {
      type: String,
    },
    departmentOfBirth: {
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
    searchingProfiles: [{ type: Schema.Types.ObjectId, ref: "SearchProfile" }],
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.models.User || mongoose.model("User", UserSchema);
