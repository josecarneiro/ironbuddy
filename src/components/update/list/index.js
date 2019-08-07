import React from "react";
import CardList from "../../elements/card/list";
import EventItem from "./../item";

export default ({ updates }) => (
  <CardList>
    { updates.map(update => (
      <EventItem key={ update.id } { ...{ update } } />
    )) }
  </CardList>
);
