import React from "react";

import { bootcampDuration } from "./../../config";

import ElementIcon from './../elements/icon';
import Anchor from './../elements/anchor';

import "./style.scss";

const dateFromDay = day => ({
  day: ((day - 1) % 5) + 1,
  week: Math.floor((day - 1) / 5) + 1
});

export default ({
  day,
  min = 1,
  max = bootcampDuration
}) => {
  const parseValue = delta => Math.min(max, Math.max(min, parseInt(day) + delta));

  return (
    <div className="schedule__navigator">
      <Anchor link={ `/schedule/${ parseValue(-1) }`}>
        <ElementIcon icon="keyboard_arrow_left" />
      </Anchor>
      <span>
        Week {dateFromDay(day).week} - Day {dateFromDay(day).day}
      </span>
      <Anchor link={ `/schedule/${ parseValue(1) }`}>
        <ElementIcon icon="keyboard_arrow_right" />
      </Anchor>
    </div>
  );
};
