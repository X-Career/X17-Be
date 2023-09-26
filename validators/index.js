import yup from "yup";
import {
  GENDERS,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  ERROR_MESSAGES,
} from "./constants.js";
const schemaRegister = yup.object({
  body: yup.object({
    firstName: yup.string().required(ERROR_MESSAGES.required_firstname),
    lastName: yup.string().required(ERROR_MESSAGES.required_lastname),
    username: yup.string().required(ERROR_MESSAGES.required_username),
    email: yup
      .string()
      .email(ERROR_MESSAGES.email)
      .required(ERROR_MESSAGES.required_email),
    password: yup
      .string()
      .min(PASSWORD_MIN_LENGTH, ERROR_MESSAGES.passwordLength)
      .max(PASSWORD_MAX_LENGTH, ERROR_MESSAGES.passwordLength)
      .matches(/[A-Z]/, ERROR_MESSAGES.passwordUpperCase)
      .required(ERROR_MESSAGES.required_pass),
    gender: yup.string().oneOf(GENDERS).required(ERROR_MESSAGES.required),
  }),
});
const schemaSignIn = yup.object({
  body: yup.object({
    identifier: yup.string().required("Tài khoản không được để trống"),
    password: yup.string().required(ERROR_MESSAGES.required_pass),
  }),
});
const schemaUpdateUserInfo = yup.object({
  body: yup.object({
    firstName: yup.string(),
    lastName: yup.string(),
    username: yup.string(),
    password: yup
      .string()
      .min(PASSWORD_MIN_LENGTH, ERROR_MESSAGES.passwordLength)
      .max(PASSWORD_MAX_LENGTH, ERROR_MESSAGES.passwordLength)
      .matches(/[A-Z]/, ERROR_MESSAGES.passwordUpperCase),
    gender: yup.string().oneOf(GENDERS),
  }),
});
export { schemaRegister, schemaSignIn, schemaUpdateUserInfo };
