import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { filtersInitialValues } from "../utils/FormModels/formInitialValues";
import { SchemaPersonFilter } from "../utils/FormModels/yup-validations";
import { FormikSelect } from "./FormikSelect";
import { FormikInput } from "./FormikInput";
import { useColombiaData } from "../hooks/useColombiaData";
import toast from "react-hot-toast";
const skinColors = ["#fbd8ba", "#e9b48c", "#a76743", "#7c4522", "#452a17"];
// Brown, Amber, Hazel, Green, Blue, Gray;

const eyeColors = [
  "#210500",
  "#9c6d38",
  "#73582d",
  "#8d987f",
  "#659bbd",
  "#9d9e9c",
];
// const hairTypes = ["Straight", "Wavy", "Curly", "Coily"];
const hairColors = ["#19140f", "#8e4a24", "#d0b48b", "#df7126", "#f0efed"];
const hairTypes = ["Lacio", "Ondulado", "Rizado", "Crespo"];
export const FilterMenu = ({ setPersons, searchProfile }) => {
  const { colombiaData, departments } = useColombiaData();
  console.log("searchProfile", searchProfile);
  if (searchProfile) {
    for (let key in filtersInitialValues) {
      if (filtersInitialValues[key] === "") {
        filtersInitialValues[key] = searchProfile[key];
      }
      if (!filtersInitialValues[key]) {
        filtersInitialValues[key] = "";
      }
    }
  }
  return (
    <Formik
      initialValues={filtersInitialValues}
      validationSchema={SchemaPersonFilter}
      onSubmit={async (values) => {
        const { searchMode, ...filters } = values;
        if (searchMode)
          try {
            const res = await fetch(
              `/api/persons?type=${searchMode}&${new URLSearchParams(filters)}`
            );
            const data = await res.json();
            setPersons(data);
          } catch (error) {
            toast.error("An error has ocurred");
          }
      }}
    >
      {(formik) => (
        <>
          <p className="mt-4 text-xl font-bold">Filtros de busqueda</p>
          <Form className=" mt-4 grid gap-4 grid-cols-4 h-fit border-solid border-inherit rounded-lg">
            <div className="flex flex-wrap gap-2 " role="group" by="searchMode">
              <label className="">
                <span className="mr-2">Estandar</span>
                <Field type="radio" name="searchMode" value="withFilter" />
              </label>
              <label className="">
                <span className="mr-2">Autocompletado</span>
                <Field
                  type="radio"
                  name="searchMode"
                  value="withFilterAutocomplete"
                />
              </label>
              <label className="">
                <span className="mr-2">Fuzzy</span>
                <Field type="radio" name="searchMode" value="withFilterFuzzy" />
              </label>
            </div>
            <FormikInput label="Primer nombre" name="firstName" type="text" />
            <FormikInput label="Segundo nombre" name="middleName" type="text" />
            <FormikInput label="Primer apellido" name="lastName" type="text" />
            <FormikInput
              label="Segundo apellido"
              name="secondLastName"
              type="text"
            />
            <FormikInput
              label="Fecha de nacimiento"
              name="birthDate"
              type="date"
            />
            <FormikSelect
              canSelectEmpty={true}
              label="Sexo de nacimiento"
              name="sex"
              type="text"
              options={["Masculino", "Femenino", "Intersexual"]}
            />
            <FormikSelect
              canSelectEmpty={true}
              label="Tipo de documento"
              name="documentType"
              options={["CC", "TI", "CE", "Pasaporte"]}
            />
            <FormikInput
              label="Número de documento"
              name="documentNumber"
              type="text"
            />
            <FormikInput
              label="Número de celular"
              name="mobilePhone"
              type="text"
            />
            <div className="grid grid-cols-2 col-span-2 gap-1">
              <label className="col-span-2 font-VarelaRound text-sm text-center text-first-color">
                Departamento y ciudad
              </label>
              <FormikSelect
                styles="col-span"
                name="departmentOfLastSighting"
                options={departments}
                canSelectEmpty={true}
              />
              <FormikSelect
                name="cityOfLastSighting"
                canSelectEmpty={true}
                options={
                  colombiaData.find(
                    (i) =>
                      i.departamento.normalize() ==
                      formik.values.departmentOfLastSighting
                  )?.ciudades
                }
              />
            </div>
            <FormikSelect
              label="Color de piel"
              styles="col-span"
              name="skinColor"
              customOptions={skinColors.map((skin, idx) => {
                return (
                  <option
                    key={skin}
                    className="text-white font-bold"
                    style={{ backgroundColor: skin }}
                  >
                    {idx}
                  </option>
                );
              })}
              canSelectEmpty={true}
            />
            <FormikSelect
              label="Color de ojos"
              styles="col-span"
              name="hairColor"
              customOptions={hairColors.map((color, idx) => {
                return (
                  <option
                    key={color}
                    className="text-white font-bold"
                    style={{ backgroundColor: color }}
                  >
                    {idx}
                  </option>
                );
              })}
              canSelectEmpty={true}
            />
            <FormikSelect
              label="Tipo de pelo"
              styles="col-span"
              name="hairType"
              customOptions={hairTypes.map((type, idx) => {
                return (
                  <option key={type} value={idx}>
                    {type}
                  </option>
                );
              })}
              canSelectEmpty={true}
            />
            <FormikSelect
              label="Color de ojos"
              styles="col-span"
              name="eyeColor"
              customOptions={eyeColors.map((color, idx) => {
                return (
                  <option
                    key={color}
                    className="text-white font-bold"
                    style={{ backgroundColor: color }}
                  >
                    {idx}
                  </option>
                );
              })}
              canSelectEmpty={true}
            />
            <button
              //   onClick={() => alert(JSON.stringify(formik.values))}
              type="submit"
              className="inline-block mt-4 px-4 py-2 rounded-md text-white font-bold bg-gray-400 hover:bg-slate-300"
            >
              Aplicar Filtros
            </button>
          </Form>
        </>
      )}
    </Formik>
  );
};
