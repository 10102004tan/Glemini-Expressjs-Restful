'use strict';

const errorHandler = (err, req, res, next) => {
  if (err) {
    console.error(err.stack);
    res.status(err.status || 500).json({
      status: 'error',
      message: err.message || 'Internal Server Error',
    });
  } else {
    next();
  }
};

module.exports = errorHandler;
