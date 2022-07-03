const {
  HTTP_NOT_FOUND_STATUS,
  HTTP_INTERNAL_SERVER_ERROR_STATUS,
  HTTP_BAD_REQUEST_STATUS,
  HTTP_UNPROCESSABLE_STATUS,
} = require('../helpers/codesHTTP');

const errorMiddleware = (err, _req, res, _next) => {
  const { name, message } = err;
  switch (name) {
    case 'ValidationError':
      if (message === '"name" is required') {
        return res.status(HTTP_BAD_REQUEST_STATUS).json({ message });
      }
      if (message === '"name" length must be at least 5 characters long') {
        return res.status(HTTP_UNPROCESSABLE_STATUS).json({ message });
      }
      break;

    case 'NotFoundError':
      res.status(HTTP_NOT_FOUND_STATUS).json({ message });
      break;
    default: res.sendStatus(HTTP_INTERNAL_SERVER_ERROR_STATUS);
  }
};

module.exports = errorMiddleware;