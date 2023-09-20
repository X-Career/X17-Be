import {
  resClientData,
  hashingPassword,
  generateJwt,
  comparePassword,
} from "../utils/index.js";
import UserModel from "../models/User.js";
import refreshTokenModel from "../models/refreshToken.js";
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, gender } = req.body;

    // Kiểm tra xem username hoặc email đã tồn tại trong cơ sở dữ liệu chưa
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return resClientData(res, 400, null, "Username or email already exists");
    }

    // Hash mật khẩu trước khi lưu vào cơ sở dữ liệu
    const { hashedPassword, salt } = hashingPassword(password);

    // Tạo một đối tượng người dùng mới sử dụng UserModel
    const newUser = new UserModel({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      salt,
      gender,
    });

    // Lưu thông tin người dùng mới vào cơ sở dữ liệu
    await newUser.save();
    // Trả về kết quả thành công và token
    resClientData(res, 201, newUser, "User registered successfully");
  } catch (error) {
    console.error(error);
    resClientData(res, 500, null, "Internal Server Error");
  }
};
//sign in
export const signinController = async (req, res) => {
  try {
    const { identifier, password } = req.body; // Use "identifier" to accept both email and username

    // Tìm người dùng theo email hoặc username (identifier)
    const user = await UserModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    // Kiểm tra nếu người dùng không tồn tại
    if (!user) {
      return resClientData(res, 401, null, "Incorrect username or password");
    }

    // So sánh mật khẩu được cung cấp với mật khẩu đã lưu
    const isPasswordValid = comparePassword(password, user.salt, user.password);

    // Kiểm tra tính hợp lệ của mật khẩu
    if (!isPasswordValid) {
      return resClientData(res, 401, null, "Incorrect username or password");
    }

    // Tạo JWT access token với hạn 2 giờ
    const accessToken = generateJwt({ userId: user._id }, "2h");

    // Tạo JWT refresh token với hạn 30 ngày
    const refreshToken = generateJwt({ userId: user._id }, "30d");

    // Save the refresh token in the database
    const refreshData = {
      userId: user._id,
      token: refreshToken,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    };

    await refreshTokenModel.create(refreshData);

    // Trả về access token, refresh token và thông tin người dùng cụ thể
    return resClientData(
      res,
      200,
      {
        accessToken,
        refreshToken,
        email: user.email,
        username: user.username,
        avatarUrl: user.avatarUrl,
      },
      "Login successful"
    );
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Lỗi đăng nhập:", error);
    return resClientData(res, 500, null, "An error occurred during login");
  }
};
