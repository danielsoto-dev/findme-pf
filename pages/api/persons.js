import { dbConnect } from "../../lib/dbConnect";
import PersonModel from "../../models/Person";
import UserModel from "../../models/User";
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
  switch (req.query.type) {
    case "all":
      await getAll(req, res);
      break;
    case "one":
      await getOne(req, res);
      break;
    case "byIds":
      await getByIds(req, res);
      break;
    case "withFilter":
      await getWithFilter(req, res);
      break;
    case "withFilterAutocomplete":
      await getWithFilterAutocomplete(req, res);
      break;
    default:
      res.status(500).json({ error: "Invalid type" });
  }
};
const getWithFilterAutocomplete = async (req, res) => {
  const filter = req.query;
  delete filter.type;
  //delete all empty fields
  Object.keys(filter).forEach((key) => {
    if (filter[key] === "" || !filter[key]) {
      delete filter[key];
    }
  });
  const autocompleteFields = [
    "firstName",
    "middleName",
    "secondLastName",
    "lastName",
    "mobilePhone",
    "documentNumber",
  ];
  const queries = autocompleteFields
    .filter((field) => {
      return filter[field];
    })
    .map((field) => {
      return {
        autocomplete: {
          query: filter[field],
          path: field,
        },
      };
    });

  //remove autocomplete fields from filter
  autocompleteFields.forEach((field) => {
    delete filter[field];
  });
  console.log(queries);
  try {
    const persons = await PersonModel.aggregate().search({
      index: "searchText",
      compound: {
        must: [...queries],
      },
    });
    console.log("persons", persons);
    res.status(200).json(persons);
  } catch (error) {
    console.log("error getting persons with autocomplete", error);
    res.status(500).json([]);
  }
};
const getWithFilter = async (req, res) => {
  //fetch persons collection and bring all documents that match the filter
  const filter = req.query;
  delete filter.type;
  for (let key in filter) {
    if (filter[key] === "" || !filter[key]) {
      delete filter[key];
    }
  }
  try {
    const persons = await PersonModel.find(filter).exec();
    res.status(200).json(persons);
  } catch (error) {
    console.log("error getting persons", error);
    res.status(500).json({ error: "error getting persons" });
  }
};

const getByIds = async (req, res) => {
  try {
    const { FaceId: FaceIds } = req.query;
    console.log("FaceIds", FaceIds);
    const persons = await PersonModel.find({ _id: { $in: FaceIds } });
    res.json(persons);
  } catch (error) {
    console.log("error getting persons", error);
    res.status(500).json({ error });
  }
};

const getAll = async (req, res) => {
  try {
    const persons = await PersonModel.find({});
    res.json(persons);
  } catch (error) {
    res.status(500).json({ error });
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
