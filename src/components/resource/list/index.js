import React from "react";
import ScheduleItem from "./../item";

export default ({ resources }) => (
  <div className="schedule__list">
    <span>Resources</span>
    {resources.map(item => (
      <ScheduleItem key={item.id} { ...{ item } } />
    ))}
  </div>
);
