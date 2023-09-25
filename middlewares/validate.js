const validate = (schema, httpCode) => async (req, res, next) => {
  try {
    await schema.validate(req.body || req.params || req.query);
    return next();
  } catch (err) {
    return res.status(httpCode || 500).json({
      type: err.name,
      path: err.path, 
      message: err.message,
      data: null,
      status: false,
    });
  }
};

export default validate;
