import { dbConnect } from "../../../lib/dbConnect";
import SearchProfileModel from "../../../models/SearchProfile";
import User from "../../../models/User";
export default async function handler(req, res) {
  await dbConnect();

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
  const { sub, searchingProfiles } = req.query;
  console.log(req.query);
  try {
    if (sub) {
      const userPopulated = await User.findOne({ sub }).populate(
        "searchingProfiles"
      );
      res.status(200).json(userPopulated.searchingProfiles);
    } else {
      console.log("Cant get a search profile without user", sub);
      res.status(200).json(sub);
    }
  } catch (error) {
    console.log("error adding search profile", error);
    res.status(500).json(error);
  }
};
const post = async (req, res) => {
  const values = req.body;
  console.log("values", values);
  try {
    const user = await User.findOne({ sub: values.sub });
    console.log(user);
    if (user) {
      const newSearchProfile = await new SearchProfileModel(values);
      console.log(
        `new search profile added to ${values.sub}`,
        newSearchProfile
      );
      await newSearchProfile.save();
      user.searchingProfiles.push(newSearchProfile);
      await user.save();
      res.status(201).json(newSearchProfile);
    } else {
      console.log("Cant add a search profile without user", user);
      res.status(200).json(user);
    }
  } catch (error) {
    console.log("error adding search profile", error);
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
