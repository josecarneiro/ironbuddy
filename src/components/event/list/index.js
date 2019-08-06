import React from "react";
import CardList from "./../../elements/card/list";
import EventItem from "./../item";

export default ({ events }) => (
  <CardList className="schedule__list">
    { events.map(event => (
      <EventItem key={ event.id } { ...{ event } } />
    )) }
  </CardList>
);
