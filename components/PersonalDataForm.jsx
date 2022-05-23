import React, { useEffect, useState } from "react";
import { FormikSelect } from "./FormikSelect";
import { FormikInput } from "./FormikInput";
import { useFormikContext } from "formik";
export const PersonalDataForm = () => {
  const [colombiaInfo, setColombiaInfo] = useState([]);
  const [departments, setDepartments] = useState([]);
  const { values } = useFormikContext();
  useEffect(async () => {
    const response = await fetch("/api/colombia");
    const data = await response.json();
    const cleanDepartments = data.map((i) => i.departamento.normalize());
    setColombiaInfo(data);
    setDepartments(cleanDepartments);
  }, []);

  return (
    <div className="flex flex-col items-center mt-auto">
      <h1 className="font-VarelaRound text-first-color text-3xl m-2">
        Complete la siguiente información
      </h1>
      <h3 className="font-OpenSans text-xl text-gray-900 font-bold  mb-2">
        Información Personal
      </h3>
      <div className="grid gap-4 grid-cols-4  border w-3/4 h-fit p-6 shadow-xl  border-solid border-inherit rounded-lg">
        <FormikInput
          styles="lg:col-span-2 col-span-4"
          label="Primer nombre"
          name="firstName"
          type="text"
        />
        <FormikInput
          styles="lg:col-span-2 col-span-4"
          label="Segundo nombre"
          name="middleName"
          type="text"
        />
        <FormikInput
          styles="lg:col-span-2 col-span-4"
          label="Primer apellido"
          name="lastName"
          type="text"
        />
        <FormikInput
          styles="lg:col-span-2 col-span-4"
          label="Segundo apellido"
          name="secondLastName"
          type="text"
        />
        <FormikInput
          styles="lg:col-span-1 col-span-2"
          label="Fecha de nacimiento"
          name="birthDate"
          type="date"
        />
        <FormikInput
          styles="lg:col-span-1 col-span-2"
          label="Genero"
          name="gender"
          type="text"
        />
        <FormikSelect
          styles="lg:col-span-1 col-span-2"
          label="Tipo de documento"
          name="documentType"
          options={["CC", "TI", "CE", "Pasaporte"]}
        />
        <FormikInput
          styles="lg:col-span-1 col-span-2"
          label="Número de documento"
          name="documentNumber"
          type="text"
        />
        <FormikInput
          styles="lg:col-span-1 col-span-2"
          label="Número de celular"
          name="mobilePhone"
          type="text"
        />
        <div className="grid grid-cols-2 col-span-2 gap-1">
          <label className="col-span-2 font-VarelaRound text-sm text-center text-first-color">
            Ciudad y pais de nacimiento
          </label>
          <FormikSelect
            styles="col-span"
            name="departmentOfLastSighting"
            options={departments}
          />
          <FormikSelect
            name="cityOfLastSighting"
            disabled={values.departmentOfLastSighting === ""}
            options={
              colombiaInfo.find(
                (i) =>
                  i.departamento.normalize() == values.departmentOfLastSighting
              )?.ciudades
            }
          />
        </div>
      </div>
    </div>
  );
};
