import React from "react";

import Card from './../../elements/card';
import Anchor from './../../elements/anchor';
import ElementDate from './../../elements/date';

import "./style.scss";

const Topic = ({ topic }) => (
  <div className="topic__item">
    <span>{ topic }</span>
  </div>
);

const TopicList = ({ topics }) => (
  <div className="topic__list">
    { topics.map(topic => <Topic key={ topic } topic={ topic } />) }
  </div>
);

const EventDate = ElementDate;

export default ({
  event: {
    type,
    name,
    topics = [],
    link,
    date
  }
}) => {
  const classes = [ "event__item", {
    ...type && {
      [`event__item--${type}`]: true
    }
  }];
  return (
    <Card classes={classes}>
      { date && (
        <small>
          <EventDate date={ date }></EventDate>
        </small>
      ) }
      { !!topics.length && (
        <TopicList topics={ topics } />
      ) }
      <span>{name}</span>
      <Anchor url={ link.url }>-></Anchor>
    </Card>
  );
};
