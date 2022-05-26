import React, { useState, useEffect } from "react";
import { uploadToS3FromInput } from "../utils/s3-client";
import { Button } from "./Button";
import { PersonalDataForm } from "./PersonalDataForm";
import { Formik, Form, useFormikContext } from "formik";
import { useUser } from "@auth0/nextjs-auth0";
import { PhysicalForm } from "./PhysicalForm";
import { appendLatLngFromCity } from "../utils/geo";
import { FormikInput } from "./FormikInput";
import { SchemaPerson as validationSchema } from "../utils/FormModels/yup-validations";
import { personInitialValues } from "../utils/FormModels/formInitialValues";
import toast from "react-hot-toast";
const steps = [
  "Información de la persona",
  "Caracteristicas fisicas",
  "Fotografía",
];

function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <PersonalDataForm nicknameField={false} />;
    case 1:
      return <PhysicalForm />;
    case 2:
      return <Img />;
    default:
      return <div>Not Found</div>;
  }
}
const addPerson = async (values) => {
  try {
    const response = await fetch(`/api/persons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
const uploadFaceToCollection = async (id, imgKey) => {
  try {
    const response = await fetch(`/api/aws/addFace`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, imgKey }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const PersonForm = () => {
  const { user, error, isLoading } = useUser();
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  async function _submitForm(values, actions) {
    try {
      let imgUrl = "";
      let imgKey = "";
      if (values["input-upload-img"] !== "") {
        const { Location, key } = await uploadToS3FromInput();
        imgUrl = Location;
        imgKey = key;
      }
      if (values.cityOfLastSighting !== "") {
        console.log(values);
        values = appendLatLngFromCity(values, values.cityOfLastSighting);
      }
      values.imgUrl = imgUrl;
      values.sub = user.sub;
      const newPerson = await addPerson(values);
      if (imgKey !== "") {
        let _res = await uploadFaceToCollection(newPerson._id, imgKey);
        console.log(_res);
      }
      toast.success("Persona agregada");
    } catch (error) {
      console.log(error);
      toast.error("Error al agregar persona");
    }
    actions.setSubmitting(false);
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  return (
    <Formik
      initialValues={personInitialValues}
      validationSchema={currentValidationSchema}
      onSubmit={_handleSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <h2 className="text-center text-2xl font-bold my-10">
            {steps[activeStep]}
          </h2>
          {_renderStepContent(activeStep)}
          <div className="text-center mt-6 flex gap-4 justify-center">
            {activeStep !== 0 && (
              <Button type="button" onClick={_handleBack}>
                Atrás
              </Button>
            )}

            <Button disabled={isSubmitting} type="submit">
              {isLastStep ? "Submit" : "Next"}
            </Button>
            {isSubmitting && <p>Subiendo formulario...</p>}
          </div>
        </Form>
      )}
    </Formik>
  );
};

const Img = () => {
  return (
    <>
      <div className="flex flex-col items-center mt-auto">
        <label htmlFor="input-upload-img">Upload an img</label>
        <FormikInput
          type="file"
          name="input-upload-img"
          id="input-upload-img"
          className="mb-4"
          accept="image/*"
        />
        <FormikInput
          label="Email de contacto"
          type="email"
          name="contactEmail"
          id="contactEmail"
          className="border rounded bg-slate-50 h-7 mb-4"
        />
      </div>
    </>
  );
};
