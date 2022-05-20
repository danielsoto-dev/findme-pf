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

export const SchemaMissingPerson = [
  Yup.object({
    firstName: Yup.string().max(15, "Must be 15 characters or less"),
    middleName: Yup.string().max(15, "Must be 15 characters or less"),
    lastName: Yup.string().max(20, "Must be 20 characters or less"),
    secondLastName: Yup.string().max(20, "Must be 20 characters or less"),
    documentType: Yup.string(),
    documentNumber: Yup.number().positive().integer(),
    birthDate: Yup.date(),
    departmentOfBirth: Yup.string(),
    cityOfBirth: Yup.string(),
    mobilePhone: Yup.number().positive().integer(),
  }),
  Yup.object({
    gender: Yup.string(),
    eyeColor: Yup.string(),
    skinColor: Yup.string(),
    hairType: Yup.string(),
    hairColor: Yup.string(),
    height: Yup.string(),
  }),
  Yup.object({
    departmentOfLastSighting: Yup.string(),
    cityOfLastSighting: Yup.string(),
  }),
];
