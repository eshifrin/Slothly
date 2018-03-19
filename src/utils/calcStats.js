import moment from 'moment';
// TODO rename to utils

const yearlyTarget = 1500;


export const formatDate = (dateObject = new Date()) => {
  return moment(dateObject).format('ddd h:mmA | MMM Do, YYYY');
};

export const toJSDate = dateString => {
  return moment(dateString, 'ddd h:mma | MMM Do, YYYY').toDate();
};

export const calcStats = (sessions, endDate = new Date()) => {
  if (!sessions.length) {
    return 0;
  }
  const minutesSoFar = calcMinutesSoFar(sessions);

  const firstDayOfYear = moment([2018, 0, 1]);
  const now = moment(endDate);
  const daysSoFar = now.diff(firstDayOfYear, 'days') + 1;
  const multiplier = 365 / daysSoFar;

  const yearlyPace = Math.floor(minutesSoFar * multiplier);

  const shouldHaveReached = yearlyTarget * 1 / multiplier 


  return {
    minutesSoFar: parseInt(minutesSoFar, 10),
    yearlyPace: parseInt(yearlyPace, 10),
    shouldHaveReached: parseInt(shouldHaveReached, 10)
  };
};

export const calcMinutesSoFar = sessions => {
  return sessions.map(s => Number(s.sessionLength)).reduce((a, b) => a + b);
};
