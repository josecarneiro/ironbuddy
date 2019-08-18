import React from "react";

import { bootcampDuration } from "./../../config";

import { calculateDateFromDay } from './../../util/day';

import ElementIcon from './../elements/icon';
import Anchor from './../elements/anchor';

import "./style.scss";

export default ({
  day,
  min = 1,
  max = bootcampDuration
}) => {
  const parseValue = delta => Math.min(max, Math.max(min, parseInt(day) + delta));

  const date = calculateDateFromDay(day);

  return (
    <div className="schedule__navigator">
      <Anchor link={ `/schedule/${ parseValue(-1) }`}>
        <ElementIcon icon="keyboard_arrow_left" />
      </Anchor>
      <span>
        Week { date.week } - Day { date.day }
      </span>
      <Anchor link={ `/schedule/${ parseValue(1) }`}>
        <ElementIcon icon="keyboard_arrow_right" />
      </Anchor>
    </div>
  );
};
