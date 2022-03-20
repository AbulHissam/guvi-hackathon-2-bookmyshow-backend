const urlNotFound = (req, res) => {
  const error = new Error(`url not Found - ${req.originalUrl}`);
  res.status(404).json({
    message: error.message,
  });
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { urlNotFound, errorHandler };
