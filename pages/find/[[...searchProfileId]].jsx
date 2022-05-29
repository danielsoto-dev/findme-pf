import { useEffect, useState, useRef, forwardRef } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { Card } from "../../components/Card";
import { Header } from "../../components/Header";
import { useRouter } from "next/router";
import Image from "next/image";
import { SearchBar } from "../../components/SearchBar";
import { toast } from "react-hot-toast";
import { FilterMenu } from "../../components/FilterMenu";
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
  const [searchProfile, setSearchProfile] = useState(null);
  useEffect(() => {
    //fetch search profile
    async function getSearchProfile() {
      try {
        const response = await fetch(
          `/api/search-profiles/${searchProfileId}?type=one`
        );
        const searchProfile = await response.json();
        setSearchProfile(searchProfile);
      } catch (error) {
        console.log("error", error);
      }
    }
    if (searchProfileId) {
      getSearchProfile();
    }
  }, [searchProfileId]);
  async function fetchPersons(isMounted) {
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
  useEffect(() => {
    let isMounted = true;

    fetchPersons(isMounted);
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
    e.preventDefault();
    try {
      let faceMatches;
      if (searchProfile) {
        faceMatches = await getMatchesFromSearchProfileImg(searchProfile);
      } else {
        faceMatches = await getMatchesFromInputImg(ref);
      }
      if (faceMatches) getPersonsFromFaceMatches(faceMatches);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header />
      <h2 className="text-center text-3xl h-[80px] my-8">
        Aquí podrás encontrar a los usuarios que coincidan con tu búsqueda
      </h2>
      <div className="gap-y-8 px-12">
        {!searchProfile?.imgUrl ? (
          <FormImg ref={ref} onSubmit={searchFace} />
        ) : (
          <div className="">
            <p className="text-xl font-bold"> Foto de perfil de busqueda:</p>
            <div className="mt-2">
              <Image
                src={searchProfile.imgUrl}
                width="100"
                height="100"
                alt="Human"
              />
            </div>
            <button
              className="ml-4 px-4 py-2 rounded-md text-white font-bold bg-gray-400 hover:bg-slate-300"
              onClick={searchFace}
            >
              Buscar
            </button>
          </div>
        )}
        <FilterMenu searchProfile={searchProfile} setPersons={setPersons} />
        <button
          onClick={() => fetchPersons(true)}
          className=" inline-block mt-4 px-4 py-2 rounded-md text-white font-bold bg-red-400 hover:bg-slate-300"
        >
          Resetear filtros
        </button>
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

const FormImg = forwardRef(function Form({ onSubmit }, ref) {
  return (
    <form ref={ref} onSubmit={onSubmit} encType="multipart/form-data">
      <label
        htmlFor="formFile"
        className="form-label  block mb-2 text-gray-700 text-xl font-bold"
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
        onClick={onSubmit}
      >
        Submit
      </button>
    </form>
  );
});

const getMatchesFromInputImg = async (ref) => {
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
  return faceMatches;
};
const getMatchesFromSearchProfileImg = async ({ imgUrl }) => {
  const imgName = imgUrl.split("/").pop();

  const response = await fetch(`/api/aws/searchFaceByUrl?imgName=${imgName}`, {
    method: "POST",
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
  return faceMatches;
};

export default Recommended;
