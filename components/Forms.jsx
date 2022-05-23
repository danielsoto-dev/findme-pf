import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import { SchemaPersonalData } from "../utils/FormModels/yup-validations";
import { FormikSelect } from "./FormikSelect";
import { FormikInput } from "./FormikInput";
import { useUser } from "@auth0/nextjs-auth0";
import { useColombiaData } from "../hooks/useColombiaData";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
export const Forms = () => {
  const { colombiaData, departments } = useColombiaData();
  const { user } = useUser();
  const router = useRouter();
  // useEffect(() => {
  //   const handleRouteChange = (url, { shallow }) => {
  //     const wantToLeave = window.confirm("¿Estas seguro de que quieres salir?");
  //     if (!wantToLeave) return;
  //   };

  //   router.events.on("beforeHistoryChange", handleRouteChange);

  //   // If the component is unmounted, unsubscribe
  //   // from the event with the `off` method:
  //   return () => {
  //     router.events.off("beforeHistoryChange", handleRouteChange);
  //   };
  // }, []);
  return (
    <Formik
      initialValues={{
        firstName: "",
        middleName: "",
        lastName: "",
        secondLastName: "",
        documentType: "",
        documentNumber: "",
        birthDate: "",
        departmentOfBirth: "",
        cityOfBirth: "",
        mobilePhone: "",
        gender: "",
        address: "",
      }}
      validationSchema={SchemaPersonalData}
      onSubmit={async (values) => {
        const { email, sub } = user;
        try {
          const res = await fetch("/api/users", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: { ...values, email, sub } }),
          });
          const data = await res.json();
          toast.success(data.message);
          router.push("/");
        } catch (error) {
          toast.error("An error has ocurred");
        }
      }}
    >
      {(formik) => (
        <div className="flex flex-col items-center mt-auto">
          <h1 className="font-VarelaRound text-first-color text-3xl m-2">
            Complete la siguiente información
          </h1>
          <h3 className="font-OpenSans text-xl text-gray-900 font-bold  mb-2">
            Información Personal
          </h3>
          <Form className="grid gap-4 grid-cols-4  border w-3/4 h-fit p-6 shadow-xl  border-solid border-inherit rounded-lg">
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
            <FormikInput
              styles="lg:col-span-1 col-span-2"
              label="Dirección"
              name="address"
              type="text"
            />
            <div className="grid grid-cols-2 col-span-2 gap-1">
              <label className="col-span-2 font-VarelaRound text-sm text-center text-first-color">
                Ciudad y pais de nacimiento
              </label>
              <FormikSelect
                styles="col-span"
                name="departmentOfBirth"
                options={departments}
              />
              <FormikSelect
                name="cityOfBirth"
                disabled={formik.values.departmentOfBirth === ""}
                options={
                  colombiaData.find(
                    (i) =>
                      i.departamento.normalize() ==
                      formik.values.departmentOfBirth
                  )?.ciudades
                }
              />
            </div>
            <button
              className="bg-black text-white font-medium text-OpenSans rounded-md p-2 min-w-full col-span-4"
              type="submit"
            >
              Registrar
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
};
