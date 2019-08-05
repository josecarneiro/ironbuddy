import React from "react";
import "./style.scss";

const dateFromDay = day => ({
  day: ((day - 1) % 5) + 1,
  week: Math.floor((day - 1) / 5) + 1
});

export default ({
  day,
  onChange,
  min = 1,
  max = 50
}) => {
  const handler = value => event => {
    event.preventDefault();
    if (value >= min && value <= max) onChange(value);
  };

  return (
    <div className="day-selector">
      <button onClick={handler(day - 1)}>-</button>
      <button onClick={handler(day + 1)}>+</button>
      <span>
        Week {dateFromDay(day).week} - Day {dateFromDay(day).day}
      </span>
    </div>
  );
};
