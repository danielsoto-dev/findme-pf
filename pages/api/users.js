import { dbConnect } from "../../lib/dbConnect";
import UserModel from "../../models/User";
export default async function handler(req, res) {
  dbConnect();

  switch (req.method) {
    case "GET":
      await get(req, res);
      break;
    case "POST":
      await post(req, res);
      break;
    case "PUT":
      await put(req, res);
      break;
    case "DELETE":
      await delete_(req, res);
      break;
    default:
      res.status(500).end();
  }
}
const post = async (req, res) => {
  const { email, sub } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      const newUser = await new UserModel({ email, sub }).save();
      console.log("new user created", newUser);
      res.status(201).json(newUser);
    } else {
      console.log("User already exists:", user);
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};