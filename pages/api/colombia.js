// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import colombia from "../../config/colombia.json";
export default function handler(req, res) {
  res.status(200).json(colombia);
}
