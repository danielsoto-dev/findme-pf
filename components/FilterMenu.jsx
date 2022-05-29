import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { filtersInitialValues } from "../utils/FormModels/formInitialValues";
import { SchemaPersonFilter } from "../utils/FormModels/yup-validations";
import { FormikSelect } from "./FormikSelect";
import { FormikInput } from "./FormikInput";
import { useColombiaData } from "../hooks/useColombiaData";
import toast from "react-hot-toast";
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
            <div className="flex gap-2 " role="group" by="searchMode">
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
