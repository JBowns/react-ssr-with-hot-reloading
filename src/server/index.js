import express from 'express';
import morgan from 'morgan';
import consoleWrapper from 'console-stamp';
import indexRoute from './routes/index';

let app = express();

consoleWrapper(console, "HH:MM:ss.l");

// Middleware
app.use(morgan('[:date[clf]] :method :url :status - :response-time ms'));

// Routes
app.use('/', indexRoute);

module.exports = app;