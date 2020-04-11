/* eslint-disable operator-linebreak */
const addOtherCasses = (object) => {
  object.severeCasesByRequestedTime = Math.trunc(
    object.infectionsByRequestedTime * 0.15
  );
  object.casesForICUByRequestedTime = Math.trunc(
    object.infectionsByRequestedTime * 0.05
  );
  object.casesForVentilatorsByRequestedTime = Math.trunc(
    object.infectionsByRequestedTime * 0.02
  );
};
const addDollarInFlight = (data, object) => {
  let totalDollars;
  const { timeToElapse, periodType } = data;
  const { avgDailyIncomePopulation, avgDailyIncomeInUSD } = data.region;
  const { infectionsByRequestedTime } = object;
  const infections = infectionsByRequestedTime;

  if (periodType === 'weeks') {
    totalDollars =
      (infections * avgDailyIncomePopulation * avgDailyIncomeInUSD) /
      (timeToElapse * 7);
  } else if (periodType === 'months') {
    totalDollars =
      (infections * avgDailyIncomePopulation * avgDailyIncomeInUSD) /
      (timeToElapse * 30);
  } else {
    totalDollars =
      (infections * avgDailyIncomePopulation * avgDailyIncomeInUSD) /
      timeToElapse;
  }
  object.dollarsInFlight = Math.trunc(totalDollars);
};

const addHospitalBedsByRequestedTime = (data, object) => {
  const { totalHospitalBeds } = data;
  const { severeCasesByRequestedTime } = object;
  const averageAvailableBed = Math.trunc(totalHospitalBeds * 0.35);

  object.hospitalBedsByRequestedTime =
    averageAvailableBed + 1 - severeCasesByRequestedTime;
};

const addInfectionsByRequestedTime = (durationInfo, object) => {
  let infected;
  const { currentlyInfected } = object;
  const { timeToElapse, periodType } = durationInfo;

  const period = periodType.toLowerCase();

  if (period === 'weeks') {
    infected = currentlyInfected * 2 ** Math.trunc((timeToElapse * 7) / 3);
  } else if (period === 'months') {
    infected = currentlyInfected * 2 ** Math.trunc((timeToElapse * 30) / 3);
  } else {
    infected = currentlyInfected * 2 ** Math.trunc(timeToElapse / 3);
  }

  object.infectionsByRequestedTime = infected;
};

const covid19ImpactEstimator = (data) => {
  const impact = {};
  const severeImpact = {};

  impact.currentlyInfected = data.reportedCases * 10;
  severeImpact.currentlyInfected = data.reportedCases * 50;

  addInfectionsByRequestedTime(data, impact);
  addInfectionsByRequestedTime(data, severeImpact);

  addOtherCasses(impact);
  addOtherCasses(severeImpact);

  addHospitalBedsByRequestedTime(data, impact);
  addHospitalBedsByRequestedTime(data, severeImpact);

  addDollarInFlight(data, impact);
  addDollarInFlight(data, severeImpact);

  console.log({
    data,
    impact,
    severeImpact
  });

  return {
    data,
    impact,
    severeImpact
  };
};

export default covid19ImpactEstimator;
