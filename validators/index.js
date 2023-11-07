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
    gender: yup
      .string()
      .oneOf(
        GENDERS,
        "Gender must be one of the following values: male, female, other"
      )
      .required(ERROR_MESSAGES.required_gender),
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
    bio: yup.string(),
    newPassword: yup
      .string()
      .min(PASSWORD_MIN_LENGTH, ERROR_MESSAGES.passwordLength)
      .max(PASSWORD_MAX_LENGTH, ERROR_MESSAGES.passwordLength)
      .matches(/[A-Z]/, ERROR_MESSAGES.passwordUpperCase)
      .trim()
      .strict(),
    gender: yup
      .string()
      .oneOf(
        GENDERS,
        "Gender must be one of the following values: male, female, other"
      ),
  }),
});
const schemaCreateVacation = yup.object({
  body: yup.object({
    location: yup.string().required("Địa điểm không được để trống"),
    title: yup.string().required("Tiêu đề không được để trống!"),
    description: yup.string().required("Mô tả không được để trống"),
    startDay: yup.string().required("Ngày bắt đầu không được để trống"),
    endDay: yup.string().required("Ngày kết không được để trống"),
  }),
});

const schemaCreateAlbum = yup.object({
  body: yup.object({}),
});

export {
  schemaRegister,
  schemaSignIn,
  schemaUpdateUserInfo,
  schemaCreateVacation,
  schemaCreateAlbum,
};
