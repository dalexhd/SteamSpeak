const convertToMiliseconds = (interval) => {
  interval.days += (interval.weeks * 7);
  interval.hours += (interval.days * 24);
  interval.minutes += (interval.hours * 60);
  interval.seconds += (interval.minutes * 60);
  return interval.seconds * 1000;
};

module.exports = {
  convertToMiliseconds,
};
