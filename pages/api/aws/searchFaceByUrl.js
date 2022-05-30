import nextConnect from "next-connect";
import { searchFaceByImageUrl } from "../../../utils/rekognition";

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

apiRoute.post((req, res) => {
  searchFaceByImageUrl(req, res);
});

export default apiRoute;
