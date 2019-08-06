import React from "react";

import CardList from "./../../elements/card/list";
import ScheduleItem from "./../item";

export default ({ schedule }) => (
  <CardList className="schedule__list">
    { schedule.map(item => (
      <ScheduleItem key={ item.id } { ...{ item } } />
    )) }
  </CardList>
);
