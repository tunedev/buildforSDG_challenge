import xml from 'xml2js';
import estimator from '../estimator';

const XMLBuilder = new xml.Builder();

class Estimator {
  /**
   * @description Fetch Impact Estimates
   * @static estimate
   * @param {object} request
   * @param {object} response
   * @returns {object} response
   * @member Estimator
   */
  static estimate(request, response) {
    const {
      region,
      periodType,
      timeToElapse,
      reportedCases,
      population,
      totalHospitalBeds
    } = request.body;

    const inputData = {
      region,
      periodType,
      timeToElapse,
      reportedCases,
      population,
      totalHospitalBeds
    };
    const data = estimator(inputData);

    if (request.path.includes('xml')) {
      const responseData = XMLBuilder.buildObject({
        data: data.data,
        impact: data.impact,
        severeImpact: data.severeImpact
      });

      response.set('Content-Type', 'application/xml');
      return response.status(201).send(responseData);
    }

    return response.status(201).send({
      data: data.data,
      impact: data.impact,
      severeImpact: data.severeImpact
    });
  }
}

export default Estimator;
