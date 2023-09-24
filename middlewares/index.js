import { schemaRegister, schemaSignIn } from "../validators/index.js";
import { resClientData } from "../utils/index.js";
const validateDataRegister = (req, res, next) => {
  const { body } = req;
  schemaRegister
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
const validateSignIn = (req, res, next) => {
  const { body } = req;
  schemaSignIn
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
export { validateDataRegister, validateSignIn };
