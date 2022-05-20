import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { PersonalDataForm } from "./PersonalDataForm";
import { Formik, Form } from "formik";
import { useUser } from "@auth0/nextjs-auth0";
import { PhysicalForm } from "./PhysicalForm";
// import { FormikSelect } from "./FormikSelect";
// import { FormikInput } from "./FormikInput";
import { SchemaMissingPerson as validationSchema } from "../utils/FormModels/yup-validations";
import { missingPersonInitialValues } from "../utils/FormModels/formInitialValues";
const steps = [
  "Información Personal",
  "Caracteristicas fisicas",
  "Ubicacion geografica",
];
function _renderStepContent(step) {
  switch (step) {
    case 0:
      return <PersonalDataForm />;
    case 1:
      return <PhysicalForm />;
    case 2:
      return <div></div>;
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
    await _sleep(1000);
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);

    setActiveStep(activeStep + 1);
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
