import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { PersonalDataForm } from "./PersonalDataForm";
import { Formik, Form, useFormikContext } from "formik";
import { useUser } from "@auth0/nextjs-auth0";
import { PhysicalForm } from "./PhysicalForm";
import { FormikSelect } from "./FormikSelect";
import { cityToCoordinates } from "../utils/geo";
import { FormikInput } from "./FormikInput";
import { SchemaMissingPerson as validationSchema } from "../utils/FormModels/yup-validations";
import { missingPersonInitialValues } from "../utils/FormModels/formInitialValues";
import { useColombiaData } from "../hooks/useColombiaData";
const steps = [
  "Información Personal",
  "Caracteristicas fisicas",
  "Ubicacion geografica",
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
    console.log(response);
    const data = await response.json();
    console.log("uploadFromForm", data);
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
      return <ImgAndLocation />;
    default:
      return <div>Not Found</div>;
  }
}

export const MissingForm = () => {
  const { user, error, isLoading } = useUser();
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  async function _submitForm(values, actions) {
    const { Location } = await fetchPost();
    console.log("Location", Location);
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

    alert(JSON.stringify(values, null, 2));
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
      initialValues={missingPersonInitialValues}
      validationSchema={currentValidationSchema}
      onSubmit={_handleSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <h1 className="text-center text-3xl">
            You are on the Step #{activeStep}
          </h1>
          {_renderStepContent(activeStep)}
          <div className="text-center mt-6 flex gap-4 justify-center">
            {activeStep !== 0 && (
              <Button type="button" onClick={_handleBack}>
                Back
              </Button>
            )}

            <Button disabled={isSubmitting} type="submit">
              {isLastStep ? "Submit" : "Next"}
            </Button>
            {isSubmitting && <p>Submiting...</p>}
          </div>
        </Form>
      )}
    </Formik>
  );
};

const ImgAndLocation = () => {
  const { colombiaData, departments } = useColombiaData();
  const { values } = useFormikContext();

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
