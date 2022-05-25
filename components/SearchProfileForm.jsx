import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { PersonalDataForm } from "./PersonalDataForm";
import { Formik, Form, useFormikContext } from "formik";
import { useUser } from "@auth0/nextjs-auth0";
import { PhysicalForm } from "./PhysicalForm";
import { FormikSelect } from "./FormikSelect";
import { cityToCoordinates } from "../utils/geo";
import { FormikInput } from "./FormikInput";
import { SchemaSearchProfile as validationSchema } from "../utils/FormModels/yup-validations";
import { searchProfileInitialValues } from "../utils/FormModels/formInitialValues";
import { useColombiaData } from "../hooks/useColombiaData";
const steps = [
  "Información de la persona",
  "Caracteristicas fisicas",
  "Fotografía",
];

function _sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const fetchPost = async () => {
  try {
    const $input = document.querySelector("#input-upload-img");
    const formData = new FormData();
    console.log($input);
    formData.append("input-upload-img", $input.files[0]);
    console.log(formData);
    const response = await fetch("/api/aws/uploadS3", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <PersonalDataForm />;
    case 1:
      return <PhysicalForm />;
    case 2:
      return <Img />;
    default:
      return <div>Not Found</div>;
  }
}
const fetchSearchProfile = async (values) => {
  try {
    const response = await fetch(`/api/search-profiles`, {
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
export const SearchProfileForm = () => {
  const { user, error, isLoading } = useUser();
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  async function _submitForm(values, actions) {
    let Location = "";
    if (values["input-upload-img"] !== "") {
      const res = await fetchPost();
      Location = res?.Location;
    }
    if (values.cityOfLastSighting !== "") {
      const [lat = null, lng = null] =
        cityToCoordinates[values.cityOfLastSighting];
      console.log(lat, lng);
      values = {
        ...values,
        lat,
        lng,
      };
    }
    values.imgUrl = Location;
    values.sub = user.sub;
    const result = await fetchSearchProfile(values);
    console.log(result);
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
      initialValues={searchProfileInitialValues}
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
      </div>
    </>
  );
};
