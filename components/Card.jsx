import Image from "next/image";
import { format } from "date-fns";
import { calculateAge, calculateFullAge } from "../utils/time";
export const Card = ({
  similarity = "",
  firstName = "",
  middleName = "",
  lastName = "",
  secondLastName = "",
  documentType = "",
  documentNumber = "",
  birthDate = "",
  mobilePhone = "",
  sex = "",
  eyeColor = "",
  skinColor = "",
  hairType = "",
  hairColor = "",
  height = "",
  departmentOfBirth = "",
  cityOfBirth = "",
  imgUrl = "",
  contactEmail = "",
}) => {
  let usableDate = "";
  if (birthDate !== "") {
    usableDate = format(new Date(birthDate), "dd/MM/yyyy");
  }
  const age = calculateAge(usableDate);
  const fullName = `${firstName} ${middleName} ${lastName} ${secondLastName}`;
  const handleOnClick = () => {
    alert("Redirect to detail");
  };
  return (
    <div
      onClick={handleOnClick}
      className="hover:cursor-pointer p-3 rounded overflow-hidden shadow-lg text-center  hover:bg-gray-100 "
    >
      {imgUrl ? (
        <Image src={imgUrl} width={200} height={200} alt="A person" />
      ) : (
        <div className="w-48 h-48 flex justify-center items-center text-3xl mx-auto bg-gray-400 opacity-40">
          No image
        </div>
      )}
      <div className="px-6 py-4">
        <div className="font-bold mb-2">{fullName}</div>
        <p>
          <span className="">Edad actual: {age}</span>
        </p>
        {similarity !== "" && <p>Similarity: {similarity}</p>}
        <p>Sexo:{sex}</p>
        <p>Estature: {Number(height) / 100}m</p>
        <p className="  mb-2 text-blue-500"></p>
      </div>
    </div>
  );
};
