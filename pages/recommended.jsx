import { useUser } from "@auth0/nextjs-auth0";
import { Card } from "../components/Card";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
const peopleInfo = [
  {
    fullName: "Daniel Soto Jaimes",
    age: 18,
    location: "Barranquilla, Atlántico",
  },
  {
    fullName: "Daniel Soto Jaimes",
    age: 18,
    location: "Barranquilla, Atlántico",
  },
  {
    fullName: "Daniel Soto Jaimes",
    age: 18,
    location: "Barranquilla, Atlántico",
  },
  {
    fullName: "Daniel Soto Jaimes",
    age: 18,
    location: "Barranquilla, Atlántico",
  },
  {
    fullName: "Daniel Soto Jaimes",
    age: 18,
    location: "Barranquilla, Atlántico",
  },
  {
    fullName: "Daniel Soto Jaimes",
    age: 18,
    location: "Barranquilla, Atlántico",
  },
  {
    fullName: "Daniel Soto Jaimes",
    age: 18,
    location: "Barranquilla, Atlántico",
  },
  {
    fullName: "Daniel Soto Jaimes",
    age: 18,
    location: "Barranquilla, Atlántico",
  },
  {
    fullName: "Daniel Soto Jaimes",
    age: 18,
    location: "Barranquilla, Atlántico",
  },
  {
    fullName: "Daniel Soto Jaimes",
    age: 18,
    location: "Barranquilla, Atlántico",
  },
  {
    fullName: "Daniel Soto Jaimes",
    age: 18,
    location: "Barranquilla, Atlántico",
  },
  {
    fullName: "Daniel Soto Jaimes",
    age: 18,
    location: "Barranquilla, Atlántico",
  },
];
const Recommended = () => {
  const { user, error, isLoading } = useUser();
  console.log(user);
  return (
    <>
      <Header />{" "}
      <h2 className="text-center text-3xl h-[80px] my-8">
        These are the top X persons that match your searching params
      </h2>
      <div className="gap-y-8 px-12">
        <SearchBar />
        <RecommendedGrid />
      </div>
    </>
  );
};
const RecommendedGrid = () => {
  return (
    <>
      <div className="grid row-auto grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4 ">
        {peopleInfo.map((person) => {
          return <Card {...person} />;
        })}
      </div>
    </>
  );
};
export default Recommended;
