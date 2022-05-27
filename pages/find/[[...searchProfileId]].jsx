import { useEffect, useState, useRef } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import { useRouter } from "next/router";
import { SearchBar } from "../../components/SearchBar";
import { toast } from "react-hot-toast";
const Recommended = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const searchProfileIdArray = router.query.searchProfileId;
  let searchProfileId;
  if (searchProfileIdArray) {
    searchProfileId = searchProfileIdArray[0];
  }
  const ref = useRef(null);
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    //fetch search profile
    async function getSearchProfile() {
      try {
        const response = await fetch(`/api/search-profiles/${searchProfileId}`);
        const searchProfile = await response.json();
        console.log(searchProfile);
      } catch (error) {
        console.log("error", error);
      }
    }
    if (searchProfileId) {
      console.log("called");
      getSearchProfile();
    }
  }, [searchProfileId]);

  useEffect(() => {
    let isMounted = true;
    async function fetchPersons() {
      try {
        const response = await fetch(
          `/api/persons?${new URLSearchParams({ type: "all" })}`
        );
        const persons = await response.json();
        console.log(persons);
        if (isMounted) {
          setPersons(persons);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchPersons();
    return () => {
      isMounted = false;
    };
  }, [user]);
  const getPersonsFromFaceMatches = async (faceMatches) => {
    const facesIds = faceMatches.map((face) => {
      return ["FaceId", face.Face.ExternalImageId];
    });
    try {
      const response = await fetch(
        `/api/persons?${new URLSearchParams([["type", "byIds"], ...facesIds])}`
      );
      const persons = await response.json();
      const personsWithSimilarity = persons.map((person) => {
        const findMatch = faceMatches.find(
          (match) => match.Face.ExternalImageId === person._id
        );
        const similarity = findMatch.Similarity;
        return { ...person, similarity };
      });
      setPersons(personsWithSimilarity);
    } catch (error) {
      console.log(error);
    }
  };
  const searchFace = async (e) => {
    console.log(ref);
    e.preventDefault();
    try {
      const response = await fetch(`/api/aws/searchFace`, {
        method: "POST",
        body: new FormData(ref.current),
      });
      const { faceMatches = [] } = await response.json();
      if (faceMatches.length == 0) {
        toast("No se encontraron coincidencias", {
          icon: "ℹ",
          id: "searchFace",
          duration: 3000,
        });
        return;
      }
      getPersonsFromFaceMatches(faceMatches);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header />{" "}
      <h2 className="text-center text-3xl h-[80px] my-8">
        These are the top X persons that match your searching params
      </h2>
      <div className="gap-y-8 px-12">
        <form ref={ref} onSubmit={searchFace} encType="multipart/form-data">
          <label
            htmlFor="formFile"
            className="form-label block mb-2 text-gray-700 text-lg font-semibold"
          >
            Ingrese una foto para buscar
          </label>
          <input
            className="form-control

    w-[200p]
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="file"
            name="searchFace"
            id="searchFace"
            accept="image/*"
          />
          <button
            className="ml-4 px-4 py-2 rounded-md text-white font-bold bg-gray-400 hover:bg-slate-300"
            onClick={searchFace}
          >
            Submit
          </button>
        </form>
        {/* <SearchBar />
         */}
        <RecommendedGrid persons={persons} />
      </div>
    </>
  );
};
const RecommendedGrid = ({ persons }) => {
  return (
    <>
      <div className="mt-10 grid row-auto grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 ">
        {persons &&
          persons.map((person, idx) => {
            return <Card key={person._id} {...person} />;
          })}
      </div>
    </>
  );
};
export default Recommended;
