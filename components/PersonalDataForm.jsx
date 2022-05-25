import React, { useEffect, useState } from "react";
import { FormikSelect } from "./FormikSelect";
import { FormikInput } from "./FormikInput";
import { useFormikContext } from "formik";
export const PersonalDataForm = ({ nicknameField = true }) => {
  const [colombiaInfo, setColombiaInfo] = useState([]);
  const [departments, setDepartments] = useState([]);
  const { values } = useFormikContext();
  useEffect(() => {
    async function fetchColombia() {
      const response = await fetch("/api/colombia");
      const data = await response.json();
      const cleanDepartments = data.map((i) => i.departamento.normalize());
      setColombiaInfo(data);
      setDepartments(cleanDepartments);
    }
    fetchColombia();
  }, []);

  return (
    <div className="flex flex-col items-center mt-auto">
      <div className="grid gap-4 grid-cols-4  border w-3/4 h-fit p-6 shadow-xl  border-solid border-inherit rounded-lg">
        {nicknameField && (
          <FormikInput
            styles="lg:col-span-2 col-span-4"
            label="Nombre del perfil de busqueda"
            name="nickname"
            type="text"
          />
        )}
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
        <FormikSelect
          styles="lg:col-span-1 col-span-2"
          label="Sexo de nacimiento"
          name="sex"
          type="text"
          options={["Masculino", "Femenino", "Intersexual"]}
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
            Departamento y ciudad de nacimiento
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
