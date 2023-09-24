import { schemaUpdateUserInfo } from "../validators/index.js";
import { resClientData } from "../utils/index.js";
const validateChangeData = (req, res, next) => {
  const { body } = req;
  schemaUpdateUserInfo
    .validate(body, { abortEarly: false })
    .then(() => {
      next();
    })
    .catch((errors) => {
      const errorMessages = errors.inner.map((error) => ({
        field: error.path,
        message: error.message,
      }));
      resClientData(res, 400, [], errorMessages);
    });
};
export { validateChangeData };
