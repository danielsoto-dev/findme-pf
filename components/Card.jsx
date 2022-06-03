import Image from "next/image";
import { useRouter } from "next/router";
import { format } from "date-fns";
const valueToSexColor = (value) => {
  if (value === "Masculino") {
    return "#1B1BE4";
  } else if (value === "Femenino") {
    return "#FF49A4";
  } else {
    return "gray";
  }
};
import { calculateAge, calculateFullAge } from "../utils/time";
export const Card = ({
  _id,
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
  departmentOfLastSighting = "",
  cityOfLastSighting = "",
  imgUrl = "",
  contactEmail = "",
}) => {
  const router = useRouter();
  let usableDate = "";
  if (birthDate !== "") {
    usableDate = format(new Date(birthDate), "dd/MM/yyyy");
  }
  const age = calculateAge(usableDate);
  const names = `${firstName} ${middleName} `;
  const lastNames = `${lastName} ${secondLastName}`;
  const handleOnClick = () => {
    router.push(`/person/${_id}`);
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
        <div className="font-bold mb-2">
          <span className="underline">{names}</span>
          {lastNames}
        </div>
        <p>
          <span className="">Edad actual: {age}</span>
        </p>
        {similarity !== "" && (
          <p>
            Similaridad:{" "}
            <span className="text-red-700 font-bold">
              {Number(similarity).toFixed(3)}%
            </span>
          </p>
        )}
        <p>
          Sexo: <span style={{ color: valueToSexColor(sex) }}>{sex}</span>
        </p>

        {height && <p>Estatura: {Number(height) / 100}m</p>}
        {departmentOfLastSighting && (
          <p className="  mb-2 text-blue-500">
            Ultima ubicación: {departmentOfLastSighting}
            {cityOfLastSighting ? `, ${cityOfLastSighting}` : ""}
          </p>
        )}
      </div>
    </div>
  );
};
