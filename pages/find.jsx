import { useEffect, useState, useRef } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { Card } from "../components/Card";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
const Recommended = () => {
  const { user, error, isLoading } = useUser();
  const ref = useRef(null);
  const [persons, setPersons] = useState([]);
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
  const getPersonsFromIds = async (ids) => {
    try {
      const response = await fetch(
        `/api/persons?${new URLSearchParams([["type", "byIds"], ...ids])}`
      );
      const persons = await response.json();

      setPersons(persons);
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
      console.log(response);
      const { faceMatches = [] } = await response.json();
      console.log(faceMatches);
      const facesIDs = faceMatches.map((face) => {
        return ["FaceId", face.Face.ExternalImageId];
      });
      getPersonsFromIds(facesIDs);
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
          <input
            type="file"
            name="searchFace"
            id="searchFace"
            accept="image/*"
          />
          <button onClick={searchFace}>submit</button>
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
      <div className="grid row-auto grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 ">
        {persons &&
          persons.map((person, idx) => {
            return <Card key={person._id} {...person} />;
          })}
      </div>
    </>
  );
};
export default Recommended;
