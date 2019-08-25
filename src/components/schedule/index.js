import React from "react";

import CardList from "./../elements/card/list";
import Card from './../elements/card';
import ElementAnchor from './../elements/anchor';
import ElementIcon from './../elements/icon';

import "./style.scss";

const Topic = ({ topic }) => (
  <div className="topic__item">
    <span>{ topic }</span>
  </div>
);

const TopicList = ({ topics }) => (
  <div className="topic__list">
    { topics.map(topic => <Topic key={ topic } { ...{ topic } } />) }
  </div>
);

const AttachmentItem = ({ attachment: { url, name } }) => (
  <ElementAnchor className="attachment__item" url={ url }>
    <span>{ name }</span>
    <ElementIcon icon="keyboard_arrow_right" />
  </ElementAnchor>
);

const AttachmentList = ({ attachments }) => (
  <div className="attachment__list">
    { attachments.map(attachment =>
      <AttachmentItem key={ attachment.id } { ...{ attachment } } />
    ) }
  </div>
);

const ScheduleItem = ({
  item: {
    type,
    name,
    topics,
    attachments
  }
}) => {
  const classes = [ 'schedule__item', {
    ...type && {
      [ `schedule__item--${ type.split(' ').join('-').toLowerCase() }` ]: true
    }
  }];
  return (
    <Card classes={classes}>
      { !!topics.length && <TopicList topics={ topics } /> }
      <span>{name}</span>
      { !!attachments.length && <AttachmentList { ...{ attachments } } /> }
    </Card>
  );
};

export default ({ schedule }) => (
  <CardList className="schedule__list">
    { schedule.map(item => (
      <ScheduleItem key={ item.id } { ...{ item } } />
    )) }
  </CardList>
);
