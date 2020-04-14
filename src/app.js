import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import routes from './routes/router';

const app = express();

dotenv.config();

// Add middleware
app.use(cors());
app.use(logger('dev'));
app.use(
  logger(':method\t\t:url\t\t:status\t\t0:response-time[0] ms', {
    stream: fs.createWriteStream('./log.txt', { flags: 'w+' })
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(express.json());

const port = process.env.PORT || 3001;

// add routes here
app.use('/api/v1/', routes);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to covid-19 estimator app'
  });
});

app.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Specified endpoint does not exist yet'
  });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    status: 500,
    err: 'Something broke'
  });
});

app.listen(port, () => {
  console.log(`Server up and running checkout http://localhost:${port}`);
});

export default app;
