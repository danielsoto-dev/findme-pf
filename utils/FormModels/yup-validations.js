import * as Yup from "yup";
export const SchemaPersonalData = Yup.object({
  firstName: Yup.string()
    .max(15, "Este campo debe ser de 15 caracteres como máximo")
    .required("Este campo es requerido"),
  middleName: Yup.string().max(
    15,
    "Este campo debe ser de 15 caracteres como máximo"
  ),
  lastName: Yup.string()
    .max(20, "Este campo debe ser de 20 caracteres o menos")
    .required("Este campo es requerido"),
  secondLastName: Yup.string().max(
    20,
    "Este campo debe ser de 20 caracteres o menos"
  ),
  documentType: Yup.string().required("Este campo es requerido"),
  documentNumber: Yup.number()
    .required()
    .positive()
    .integer()
    .required("Este campo es requerido"),
  birthDate: Yup.date().required("Este campo es requerido"),
  departmentOfBirth: Yup.string().required("Este campo es requerido"),
  cityOfBirth: Yup.string().required("Este campo es requerido"),
  mobilePhone: Yup.number()
    .required()
    .positive()
    .integer()
    .required("Este campo es requerido"),
  sex: Yup.string().required("Este campo es requerido"),
  address: Yup.string().required("Este campo es requerido"),
});

export const SchemaSearchProfile = [
  Yup.object({
    nickname: Yup.string().required("Nickname is required"),
    firstName: Yup.string().max(
      15,
      "Este campo debe ser de 15 caracteres como máximo"
    ),
    middleName: Yup.string().max(
      15,
      "Este campo debe ser de 15 caracteres como máximo"
    ),
    lastName: Yup.string().max(
      20,
      "Este campo debe ser de 20 caracteres o menos"
    ),
    secondLastName: Yup.string().max(
      20,
      "Este campo debe ser de 20 caracteres o menos"
    ),
    documentType: Yup.string(),
    documentNumber: Yup.number().positive().integer(),
    birthDate: Yup.date(),
    departmentOfLastSighting: Yup.string(),
    cityOfLastSighting: Yup.string(),
    mobilePhone: Yup.number().positive().integer(),
  }),
  Yup.object({
    sex: Yup.string(),
    eyeColor: Yup.string(),
    skinColor: Yup.string(),
    hairType: Yup.string(),
    hairColor: Yup.string(),
    height: Yup.string(),
  }),
];
export const SchemaPerson = [
  Yup.object({
    firstName: Yup.string().max(
      15,
      "Este campo debe ser de 15 caracteres como máximo"
    ),
    middleName: Yup.string().max(
      15,
      "Este campo debe ser de 15 caracteres como máximo"
    ),
    lastName: Yup.string().max(
      20,
      "Este campo debe ser de 20 caracteres o menos"
    ),
    secondLastName: Yup.string().max(
      20,
      "Este campo debe ser de 20 caracteres o menos"
    ),
    documentType: Yup.string(),
    documentNumber: Yup.number().positive().integer(),
    birthDate: Yup.date(),
    departmentOfLastSighting: Yup.string(),
    cityOfLastSighting: Yup.string(),
    mobilePhone: Yup.number().positive().integer(),
  }),
  Yup.object({
    sex: Yup.string(),
    eyeColor: Yup.string(),
    skinColor: Yup.string(),
    hairType: Yup.string(),
    hairColor: Yup.string(),
    height: Yup.string(),
  }),
  Yup.object({
    contactEmail: Yup.string()
      .email("Invalid email")
      .required("Este campo es requerido"),
  }),
];

export const SchemaPersonFilter = Yup.object({
  firstName: Yup.string().max(
    15,
    "Este campo debe ser de 15 caracteres como máximo"
  ),
  middleName: Yup.string().max(
    15,
    "Este campo debe ser de 15 caracteres como máximo"
  ),
  lastName: Yup.string().max(
    20,
    "Este campo debe ser de 20 caracteres o menos"
  ),
  secondLastName: Yup.string().max(
    20,
    "Este campo debe ser de 20 caracteres o menos"
  ),
  documentType: Yup.string(),
  documentNumber: Yup.number().positive().integer(),
  birthDate: Yup.date(),
  departmentOfLastSighting: Yup.string(),
  cityOfLastSighting: Yup.string(),
  mobilePhone: Yup.number().positive().integer(),
  sex: Yup.string(),
  eyeColor: Yup.string(),
  skinColor: Yup.string(),
  hairType: Yup.string(),
  hairColor: Yup.string(),
  height: Yup.string(),
  searchMode: Yup.string(),
});
