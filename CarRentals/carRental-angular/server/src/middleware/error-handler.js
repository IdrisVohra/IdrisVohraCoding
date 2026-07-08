function notFoundHandler(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ message: err.errors?.map((e) => e.message).join(', ') ?? err.message });
  }

  res.status(err.status ?? 500).json({ message: err.message ?? 'Internal server error.' });
}

module.exports = { notFoundHandler, errorHandler };
