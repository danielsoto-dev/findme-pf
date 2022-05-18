import React, { useRef, useState } from "react";

const fetchPost = async ({ current: form }) => {
  try {
    const response = await fetch("/api/aws/searchFace", {
      method: "POST",
      body: new FormData(form),
    });
    console.log(response);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
const handleSubmit = async (e, formRef, setFaces) => {
  console.log("handleSubmit");
  e.preventDefault();
  const { faceMatches = [] } = await fetchPost(formRef);
  setFaces(faceMatches);
};
export const SearchFace = () => {
  const formRef = useRef();
  const [faces, setFaces] = useState([]);
  return (
    <>
      <h2 className="text-xl mb-6">Search Face</h2>
      <form
        ref={formRef}
        onSubmit={(e) => handleSubmit(e, formRef, setFaces)}
        action="POST"
        id="form-add-face"
      >
        <label className="block" htmlFor="searchFace"></label>
        <input
          type="file"
          name="searchFace"
          id="searchFace"
          className="mb-4 block"
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

        <button
          className="bg-blue-400 px-2 py-1 rounded-md text-white"
          onClick={(e) => handleSubmit(e, formRef, setFaces)}
          id="btn-add-face"
        >
          Submit
        </button>
      </form>
      <ul>
        {faces.map(
          ({ Face: { ExternalImageId, FaceId, Confidence }, Similarity }) => (
            <li key={FaceId}>
              {ExternalImageId} ={Similarity} similarity and a confidence of{" "}
              {Confidence}
            </li>
          )
        )}
      </ul>
    </>
  );
};
