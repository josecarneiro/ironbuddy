const MILISECONDS_IN_A_DAY = 60 * 60 * 24 * 1000;

export const calculateDay = (start, current, {
  maximum = Infinity,
  minimum = -Infinity
} = {}) => {
  const day = Math.floor((current - start) / MILISECONDS_IN_A_DAY) + 1;
  return Math.min(maximum, Math.max(minimum,  Math.floor(day / 7) * 5 + Math.min(day % 7, 5)));
};

export const calculateDateFromDay = day => ({
  day: ((day - 1) % 5) + 1,
  week: Math.floor((day - 1) / 5) + 1
});

// // 1  2  3  4  5  6  7  8  9  10 11 12 13 14 15 16 17 18 19 20 21 22
// // 1  2  3  4  5  5  5  6  7  8  9  10 10 10 11 12 13 14 15 15 15 16
