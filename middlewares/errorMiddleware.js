const errorMessageVerificator = require('../helpers/errorMessageVerificator');
const {
  HTTP_NOT_FOUND_STATUS,
  HTTP_INTERNAL_SERVER_ERROR_STATUS,
  HTTP_BAD_REQUEST_STATUS,
  HTTP_UNPROCESSABLE_STATUS,
} = require('../helpers/codesHTTP');

const errorMiddleware = (err, _req, res, _next) => {
  const { name, message } = err;
  // REGEX PARA REMOVER "[0]." DA MENSAGEM DE ERRO PARA RETORNAR A MENSAGEM CORRETAMENTE
  const fixedMessage = message.replace(/[[0-9]*]./, '');
  switch (name) {
    case 'ValidationError':
      res.status(errorMessageVerificator(message)
        ? HTTP_BAD_REQUEST_STATUS
        : HTTP_UNPROCESSABLE_STATUS).json({ message: fixedMessage });
      break;

    case 'NotFoundError':
      res.status(HTTP_NOT_FOUND_STATUS).json({ message });
      break;
    default: res.sendStatus(HTTP_INTERNAL_SERVER_ERROR_STATUS);
  }
};

module.exports = errorMiddleware;