import React from "react";
import ScheduleItem from "./../item";

import "./style.scss";

export default ({ schedule }) => (
  <div className="schedule__list">
    { schedule.map(item => (
      <ScheduleItem key={ item.id } { ...{ item } } />
    )) }
  </div>
);
