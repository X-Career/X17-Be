import yup from "yup";
  const schemaRegister = yup.object().shape({
    firstName: yup.string().required("Tên không được để trống"),
    lastName: yup.string().required("Họ không được để trống"),
    username: yup.string().required("UserName không được để trống"),
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(8, "Mật khẩu phải ít nhất 8 ký tự")
      .max(16, "Mật khẩu phải từ 8-16 ký tự")
      .matches(/[A-Z]/, "Mật khẩu phải chứa ít nhất 1 ký tự viết hoa")
      .required("Mật khẩu không được để trống"),
    gender: yup
      .string()
      .oneOf(["male", "female", "other"])
      .required("Giới tính không được để trống"),
  });
const schemaSignIn = yup.object().shape({
  identifier: yup.string().required("Tài khoản không được để trống"),
  password: yup.string().required("Mật khẩu không được để trống"),
});
export { schemaRegister, schemaSignIn };
