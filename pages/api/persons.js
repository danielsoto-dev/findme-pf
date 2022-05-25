import { dbConnect } from "../../lib/dbConnect";
import PersonModel from "../../models/Person";
import User from "../../models/User";
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
const get = async (req, res) => {
  const { query } = req;
  try {
    const data = await PersonModel.find(query);
    res.status(200).json(data);
  } catch (error) {
    console.log("error getting persons", error);
    res.status(500).json(error);
  }
};
const post = async (req, res) => {
  const values = req.body;
  try {
    const newPerson = await new PersonModel(values);
    const data = await newPerson.save();
    res.status(201).json(data);
  } catch (error) {
    console.log("error adding Person", error);
    res.status(500).json(error);
  }
};

const put = async (req, res) => {
  //update user with new data from form
  const { data } = req.body;
  console.log("data from form", data);
  const { email, sub } = data;
  const filter = { sub };
  const update = {
    $set: { ...data, hasFilledProfile: true },
  };
  try {
    let doc = await UserModel.findOneAndUpdate(filter, update, {
      new: true,
    });
    console.log("doc ->", doc);
    res.status(200).json({ message: "User updated" });
  } catch (error) {
    console.log("error updating user", error);
    res.status(500).json(error);
  }
};
