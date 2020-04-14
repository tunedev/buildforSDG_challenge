import Joi from '@hapi/joi';

const validator = {
  validateBody: (schema) => (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
      return res
        .json({
          status: 400,
          error: result.error.message
        })
        .status(400);
    }

    req.body = result.value;
    return next();
  },

  schemas: {
    paramSchema: Joi.object().keys({
      region: Joi.object().keys({
        name: Joi.string()
          .regex(/^[a-zA-Z]*$/)
          .required()
          .trim()
          .lowercase()
          .error(new Error('Region name is required')),
        avgAge: Joi.number()
          .required()
          .error(new Error('Average age - a valid number is required')),
        avgDailyIncomeInUSD: Joi.number()
          .required()
          .error(
            new Error('Average daily income - a valid number is required')
          ),
        avgDailyIncomePopulation: Joi.number()
          .required()
          .error(
            new Error(
              'Average daily income population - a valid number is required'
            )
          )
      }),
      periodType: Joi.string()
        .regex(/^[a-zA-Z]*$/)
        .required()
        .trim()
        .lowercase()
        .valid('days', 'weeks', 'months')
        .error(new Error('PeriodType must be days, weeks or months')),
      timeToElapse: Joi.number()
        .required()
        .error(new Error('TimeToElapse - a valid number is required')),
      reportedCases: Joi.number()
        .required()
        .error(new Error('ReportedCases - a valid number is required')),
      population: Joi.number()
        .required()
        .error(new Error('Population - a valid number is required')),
      totalHospitalBeds: Joi.number()
        .required()
        .error(new Error('TotalHospitalBeds - a valid number is required'))
    })
  }
};

export default validator;
