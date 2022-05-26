export const uploadToS3FromInput = async () => {
  try {
    const $input = document.querySelector("#input-upload-img");
    const formData = new FormData();
    formData.append("input-upload-img", $input.files[0]);
    const response = await fetch("/api/aws/uploadS3", {
      method: "POST",
      body: formData,
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log(
      `Error trying to upload img from #input-upload img to S3: ${error}`
    );
  }
};
