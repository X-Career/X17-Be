const GENDERS = ["male", "female", "other"];
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 16;
const ERROR_MESSAGES = {
  required: "Không được để trống",
  email: "Email không đúng định dạng",
  passwordUpperCase: "Mật khẩu phải chứa ít nhất 1 ký tự viết hoa",
  passwordLength: `Mật khẩu phải có độ dài từ ${PASSWORD_MIN_LENGTH} đến ${PASSWORD_MAX_LENGTH} ký tự`,
};
export { GENDERS, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, ERROR_MESSAGES };
