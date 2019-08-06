import React from "react";
import CardList from "./../../card/list";
import EventItem from "./../item";

export default ({ updates }) => (
  <CardList>
    { updates.map(update => (
      <EventItem key={ update.id } { ...{ update } } />
    )) }
  </CardList>
);
