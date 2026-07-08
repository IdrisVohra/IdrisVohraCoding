const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const rentalsRoutes = require('./routes/rentals.routes');
const { notFoundHandler, errorHandler } = require('./middleware/error-handler');

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN?.split(',') ?? 'http://localhost:4200',
  }),
);
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/rentals', rentalsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
