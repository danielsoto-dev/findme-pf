import * as Yup from "yup";
export const SchemaPersonalData = Yup.object({
  firstName: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  middleName: Yup.string().max(15, "Must be 15 characters or less"),
  lastName: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  secondLastName: Yup.string().max(20, "Must be 20 characters or less"),
  documentType: Yup.string().required("Required"),
  documentNumber: Yup.number()
    .required()
    .positive()
    .integer()
    .required("Required"),
  birthDate: Yup.date().required("Required"),
  departmentOfBirth: Yup.string().required("Required"),
  cityOfBirth: Yup.string().required("Required"),
  mobilePhone: Yup.number()
    .required()
    .positive()
    .integer()
    .required("Required"),
  gender: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
});
