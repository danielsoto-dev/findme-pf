import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    sub: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.models.User || mongoose.model("User", UserSchema);
