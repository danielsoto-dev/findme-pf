import React, { useRef } from "react";

const fetchPost = async ({ current: form }) => {
  const formData = new FormData(form);
  console.log("form", formData);
  try {
    const response = await fetch("/api/aws/uploadS3", {
      method: "POST",
      body: formData,
    });
    console.log(response);
    const data = await response.json();
    console.log("addFace", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
const handleSubmit = async (e, formRef) => {
  console.log("handleSubmit");
  e.preventDefault();
  const res = await fetchPost(formRef);
  console.log(res);
};
export const AddFace = () => {
  const formRef = useRef();
  return (
    <>
      <h2 className="text-xl mb-6">Add Face to collection</h2>
      <form
        ref={formRef}
        onSubmit={(e) => handleSubmit(e, formRef)}
        action="POST"
        id="form-add-face"
      >
        <label htmlFor="addFace"></label>
        <input
          type="file"
          name="addFace"
          id="addFace"
          className="mb-4"
          accept="image/*"
        />
        <label htmlFor="collectionName">Collection Name</label>
        <input
          className="mb-4 block w-full py-2 pl-6 pr-2 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
          type="text"
          name="collectionName"
          placeholder="Collection Name"
          id="collectionName"
        />
        <label htmlFor="name_id">Name_id</label>
        <input
          className="mb-4 block w-full py-2 pl-6 pr-2 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
          type="text"
          name="name_id"
          id="name_id"
        />
        <button
          className="bg-blue-400 px-2 py-1 rounded-md text-white"
          onClick={(e) => handleSubmit(e, formRef)}
          id="btn-add-face"
        >
          Submit
        </button>
      </form>
    </>
  );
};
// document
//         .querySelector("#btn-add-face")
//         .addEventListener("click", async function (e) {
//           e.preventDefault();
//           try {
//             const response = await fetch("/addFace", {
//               method: "POST",
//               body: new FormData(document.querySelector("#form-add-face")),
//             });
//             const data = await response.json();
//             console.log("addFace", data);
//           } catch (error) {
//             console.log(error);
//           }
//         });
