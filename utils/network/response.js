exports.success = (req, res, message, status, data) => {
  let statusCode = status || 200;
  let statusMessage = message || "";
  let statusData = data || "";
  res.status(statusCode).send({
    error: false,
    status: statusCode,
    message: statusMessage,
    data: statusData,
  });
};
