import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useRouter } from "next/router";
import { format } from "date-fns";
import { calculateAge } from "../../utils/time";
import {
  skinColors,
  hairColors,
  eyeColors,
  hairTypes,
} from "../../utils/dictOfPhysical";
import Image from "next/image";

const valueToSexColor = (value) => {
  if (value === "Masculino") {
    return "#1B1BE4";
  } else if (value === "Femenino") {
    return "#FF49A4";
  } else {
    return "gray";
  }
};
const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [person, setPerson] = useState(null);
  let usableDate = "";
  if (person?.birthDate && person?.birthDate !== "") {
    usableDate = format(new Date(person.birthDate), "dd/MM/yyyy");
  }
  useEffect(() => {
    const fetchPerson = async () => {
      const response = await fetch(`/api/persons/?type=one&id=${id}`);
      const person = await response.json();
      setPerson(person);
    };
    try {
      if (id) {
        fetchPerson();
      }
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  //tailwind detail information
  return (
    <>
      <Header />
      <div className="container shadow-md mx-auto p-8">
        <h1 className="text-3xl mb-10 text-center">Información</h1>
        <div className="flex flex-wrap justify-center ">
          <div className="w-full md:w-1/2 p-4 flex flex-col items-center justify-center">
            {person?.imgUrl && (
              <Image
                alt="Person"
                className="rounded-full w-32 h-32 mr-4"
                src={person.imgUrl}
                width="200"
                height="200"
              />
            )}
            <div className="flex flex-col gap-3 items-start mt-10">
              <div>
                <p className="mb-4">Color de Ojos: </p>
                <span
                  className="w-9 h-9 rounded-full ring-2 ring-black inline-block"
                  style={{ backgroundColor: eyeColors[person?.eyeColor] }}
                ></span>
              </div>
              <div>
                <p className="mb-4">Color de pelo: </p>
                <span
                  className="w-9 h-9 rounded-full ring-2 ring-black inline-block"
                  style={{ backgroundColor: hairColors[person?.hairColor] }}
                ></span>
              </div>

              <div>
                <p className="mb-4">Color de piel: </p>
                <span
                  className="w-9 h-9 rounded-full ring-2 ring-black inline-block"
                  style={{ backgroundColor: skinColors[person?.skinColor] }}
                ></span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 gap-3 p-4 flex flex-col justify-center">
            <p>
              <span className="font-semibold">Nombres: </span>
              {person?.firstName} {person?.middleName}
            </p>
            <p>
              <span className="font-semibold">Apellidos: </span>
              {person?.lastName} {person?.secondLastName}
            </p>
            <p>
              <span className="font-semibold">Ultima ubicación conocida: </span>
              {person?.departmentOfLastSighting}, {person?.cityOfLastSighting}
            </p>
            <p>
              <span className="font-semibold">Sexo:</span>{" "}
              <span
                className="font-semibold"
                style={{ color: valueToSexColor(person?.sex) }}
              >
                {person?.sex}
              </span>
            </p>
            <p>
              <span className="font-semibold">Edad a día de hoy: </span>
              {calculateAge(usableDate)} años
            </p>
            <p>
              <span className="font-semibold">Contact Email:</span>{" "}
              {person?.contactEmail ? person.contactEmail : "findme@ayuda.com"}
            </p>
            <p>
              <span className="font-semibold">Tipo de Pelo: </span>
              {hairTypes[person?.hairType]}
            </p>
            <p>
              <span className="font-semibold">Identificación</span>:{" "}
              <span>{person?.documentType}</span> {person?.documentNumber}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Detail;
