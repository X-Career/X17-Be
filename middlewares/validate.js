const validate = (schema, httpCode) => async (req, res, next) => {
  try {
    let dataToValidate;
    if (req.body) {
      dataToValidate = req.body;
    } else if (req.params) {
      dataToValidate = req.params;
    } else if (req.query) {
      dataToValidate = req.query;
    }
    console.log(dataToValidate);
    if (schema && Object.keys(schema).length > 0) {
      await schema.validate(dataToValidate);
    }
    return next();
  } catch (err) {
    return res.status(httpCode || 500).json({
      type: err.name,
      message: err.message,
      data: null,
      status: false,
    });
  }
};

export default validate;
