import AWS from "aws-sdk";
const { AWS_KEY_VALUE, AWS_SECRET_KEY_VALUE, AWS_REGION_VALUE, BUCKET_NAME } =
  process.env;
if (!AWS_KEY_VALUE || !AWS_REGION_VALUE || !AWS_SECRET_KEY_VALUE)
  throw new Error("Missing aws enviroment vars");

console.table([
  AWS_KEY_VALUE,
  AWS_SECRET_KEY_VALUE,
  AWS_REGION_VALUE,
  BUCKET_NAME,
]);
const S3 = new AWS.S3({
  accessKeyId: AWS_KEY_VALUE,
  secretAccessKey: AWS_SECRET_KEY_VALUE,
  region: AWS_REGION_VALUE,
});

export const uploadImg = async (req, res) => {
  const {
    file,
    body: { collectionName, name_id },
  } = req;
  //   console.log("req ->", req);
  if (!file) return res.status(400).send();
  const { originalname, mimetype, buffer } = file;
  const params = {
    Bucket: BUCKET_NAME,
    Key: originalname,
    Body: buffer,
    ContentType: mimetype,
  };
  try {
    const response = await S3.upload(params).promise();
    return res.send(response);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error });
  }
};
