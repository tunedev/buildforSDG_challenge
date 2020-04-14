import express from 'express';
import Estimator from '../controller/estimator.controller';
import validate from '../validator/estimatorValidator';
import Logs from '../controller/log.controller';

const router = express.Router();

router
  .post(
    '/on-covid-19',
    validate.validateBody(validate.schemas.paramSchema),
    Estimator.estimate
  )
  .post(
    '/on-covid-19/json',
    validate.validateBody(validate.schemas.paramSchema),
    Estimator.estimate
  )
  .post(
    '/on-covid-19/xml',
    validate.validateBody(validate.schemas.paramSchema),
    Estimator.estimate
  )
  .get('/on-covid-19/logs', Logs.read);

export default router;
