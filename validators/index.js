import yup from "yup";
import {
  GENDERS,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  ERROR_MESSAGES,
} from "./constants.js";
const schemaRegister = yup.object().shape({
  firstName: yup.string().required(ERROR_MESSAGES.required),
  lastName: yup.string().required(ERROR_MESSAGES.required),
  username: yup.string().required(ERROR_MESSAGES.required),
  email: yup
    .string()
    .email(ERROR_MESSAGES.email)
    .required(ERROR_MESSAGES.required),
  password: yup
    .string()
    .min(PASSWORD_MIN_LENGTH, ERROR_MESSAGES.passwordLength)
    .max(PASSWORD_MAX_LENGTH, ERROR_MESSAGES.passwordLength)
    .matches(/[A-Z]/, ERROR_MESSAGES.passwordUpperCase)
    .required(ERROR_MESSAGES.required),
  gender: yup.string().oneOf(GENDERS).required(ERROR_MESSAGES.required),
});
const schemaSignIn = yup.object().shape({
  identifier: yup.string().required("Tài khoản không được để trống"),
  password: yup.string().required("Mật khẩu không được để trống"),
});
export { schemaRegister, schemaSignIn };
