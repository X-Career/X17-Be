const validate = (schema, httpCode) => async (req, res, next) => {
  try {
    await schema.validate({
      body: req.body,
      params: req.params,
      query: req.query,
    });

    return next();
  } catch (err) {
    console.error("Validation Error:", err);
    return res.status(httpCode || 500).json({
      type: err.name,
      message: err.message,
      data: null,
      status: false,
    });
  }
};

export default validate;
