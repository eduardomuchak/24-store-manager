const errorMessageVerificator = (message) => {
  if (message.includes('required')) {
    return true;
  }
  if (message.includes('length') === message.includes('greater')) {
    return false;
  }
};

module.exports = errorMessageVerificator;