import { useEffect, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { Card } from "../components/Card";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
const fetchPersons = async () => {
  try {
    const response = await fetch(`/api/persons`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
const Recommended = () => {
  const { user, error, isLoading } = useUser();
  const [persons, setPersons] = useState([]);
  useEffect(() => {
    async function fetchPersons() {
      const persons = await fetchPersons();
      setPersons(persons);
    }
    fetchPersons();
  }, [user]);

  return (
    <>
      <Header />{" "}
      <h2 className="text-center text-3xl h-[80px] my-8">
        These are the top X persons that match your searching params
      </h2>
      <div className="gap-y-8 px-12">
        <SearchBar />
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
