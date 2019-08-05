import React from "react";
import EventItem from "./../item";

import "./style.scss";

export default ({ events }) => (
  <div className="schedule__list">
    { events.map(event => (
      <EventItem key={ event.id } { ...{ event } } />
    )) }
  </div>
);
