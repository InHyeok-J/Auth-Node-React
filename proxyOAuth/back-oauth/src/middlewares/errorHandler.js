export const errorHandler = (err, req, res, next) => {
  console.error('ErrorLog' + '[' + new Date() + ']\n' + err.stack);
  function jsonFriendlyErrorReplacer(key, value) {
    if (value instanceof Error) {
      return {
        // Pull all enumerable properties, supporting properties on custom Errors
        ...value,
        // Explicitly pull Error's non-enumerable properties
        name: value.name,
        message: value.message,
        status: value.status,
      };
    }

    return value;
  }

  res.status(err.status || 500);
  res.type('json').send(JSON.stringify(err, jsonFriendlyErrorReplacer));
};
