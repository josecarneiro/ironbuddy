const getLastElementOfArray = array => array[array.length - 1];

const extractScheduleDayAndWeek = name =>
  name
  .toLowerCase()
  .split(" ")
  .map(string => parseInt(string, 10))
  .filter(number => typeof number === "number" && !isNaN(number))
  .reduce((accumulator, value, index) => ({
    ...accumulator,
    [!index ? "week" : "day"]: value
  }), {});

const extractScheduleItemDetails = ({ name, labels }) => ({
  name: getLastElementOfArray(name.split(" | ")),
  type: ((labels.filter(({ color }) => color)[0] || {}).name || "").toLowerCase() || null,
  topics: labels.filter(({ color }) => !color).map(({ name }) => name)
});

const extractScheduleItemsFromCards = cards => cards
  .map(({ name, labels, ...card }) => ({
    ...card,
    ...extractScheduleItemDetails({ name, labels })
  }))
  .filter(({ type }) => type !== 'notes');

export const extractScheduleFromBoard = board => {
  const schedule = board.columns
    .filter(({ name }) => name.toLowerCase().includes("week"))
    .map(({ id, name, cards }) => ({
      id,
      ...extractScheduleDayAndWeek(name),
      items: extractScheduleItemsFromCards(cards)
    }));
  const length = 50;
  return [...new Array(length)]
    .map((value, index) => {
      const day = (index) % 5 + 1;
      const week = Math.floor(index / 5) + 1;
      return schedule.find(item => item.day === day && item.week === week);
    });
};
