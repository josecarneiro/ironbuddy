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

const AttachmentItem = ({ attachment: { url, name } }) => (
  <div className="attachment__item">
    {/* <Anchor url={ url }>{ name }</Anchor> */}
    <Anchor url={ url }>-></Anchor>
  </div>
);

const AttachmentList = ({ attachments }) => (
  <div className="attachment__list">
    { attachments.map(attachment =>
      <AttachmentItem key={ attachment.id } attachment={ attachment }>Attachment</AttachmentItem>
    )}
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
  const classes = classNames("schedule__item", {
    ...type && {
      [`schedule__item--${type}`]: true
    }
  });
  return (
    <div className={classes}>
      {!!topics.length && <TopicList topics={ topics } />}
      <span>{name}</span>
      {!!attachments.length && <AttachmentList attachments={ attachments } />}
    </div>
  );
};
