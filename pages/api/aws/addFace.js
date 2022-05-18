import nextConnect from "next-connect";
import multer from "multer";
import { addFaceToCollection } from "../../../utils/rekognition";
const upload = multer();
const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single("addFace"));

apiRoute.post((req, res) => {
  addFaceToCollection(req, res);
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

// // import nextConnect from "next-connect";
// import withMulter from "../../../hooks/middlewares/withMulter";
// import { addFaceToCollection } from "../../../utils/rekognition";
// const handler = async (req, res) => {
//   const { method } = req;
//   if (method != "POST") {
//     return res.status(400).json({
//       succes: false,
//       message: "This endpoint only handle POST request",
//     });
//   }
//   addFaceToCollection
// };

// export default withMulter(handler, { type: "single", fieldName: "addFace" });

// // };
