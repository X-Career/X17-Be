const GENDERS = ["male", "female", "other"];
const PASSWORD_MIN_LENGTH = 6;
const PASSWORD_MAX_LENGTH = 16;
const ERROR_MESSAGES = {
  required_pass: "Password không được để trống",
  required_firstname: "Tên không được để trống",
  required_username: "Username không được để trống",
  required_lastname: "Họ không được để trống",
  required_email: "Email không được để trống",
  required_gender: "Giới tính không được để trống",
  email: "Email không đúng định dạng",
  passwordUpperCase: "Mật khẩu phải chứa ít nhất 1 ký tự viết hoa",
  passwordLength: `Mật khẩu phải có độ dài từ ${PASSWORD_MIN_LENGTH} đến ${PASSWORD_MAX_LENGTH} ký tự`,
};

export { GENDERS, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, ERROR_MESSAGES };
