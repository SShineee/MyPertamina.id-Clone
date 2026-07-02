function notFoundHandler(req, res) {
  res.status(404).json({ message: 'Endpoint tidak ditemukan' });
}

function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Terjadi kesalahan pada server' });
}

module.exports = { notFoundHandler, errorHandler };
