import React from "react";
import classNames from "classnames";
import Anchor from './../../anchor';

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

const EventDate = ({ date }) => date instanceof Date && <time dateTime={ date.toISOString() }>{ date.toLocaleString().replace(/:00$/, '') }</time>;

export default ({
  event: {
    type,
    name,
    topics = [],
    link,
    date
  }
}) => {
  const classes = classNames("event__item", {
    ...type && {
      [`event__item--${type}`]: true
    }
  });
  return (
    <div className={classes}>
      {date && <small><EventDate date={ date }></EventDate></small>}
      {!!topics.length && <TopicList topics={ topics } />}
      <span>{name}</span>
      <Anchor url={ link.url }>-></Anchor>
    </div>
  );
};
