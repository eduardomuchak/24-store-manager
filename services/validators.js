const runSchema = (schema) => (data) => {
  const { error, value } = schema.validate(data);
  if (error) throw error;
  return value;
};

module.exports = runSchema;