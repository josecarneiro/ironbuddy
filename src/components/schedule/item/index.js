import React from "react";

import Card from './../../elements/card';
import ElementAnchor from './../../elements/anchor';
import ElementIcon from './../../elements/icon';

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
  <div className="attachment__item">
    <ElementAnchor url={ url }>
      <ElementIcon icon="keyboard_arrow_right" />
    </ElementAnchor>
  </div>
);

const AttachmentList = ({ attachments }) => (
  <div className="attachment__list">
    { attachments.map(attachment =>
      <AttachmentItem key={ attachment.id } { ...{ attachment } } />
    ) }
  </div>
);

export default ({
  item: {
    type,
    name,
    topics,
    attachments
  }
}) => {
  const classes = [ "schedule__item", {
    ...type && {
      [`schedule__item--${type}`]: true
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
