import React, { Component } from "react";
import classNames from "classnames";

import "./style.scss";

export default class ScheduleItem extends Component {
  render() {
    const { item: { type, name, topics } } = this.props;
    const classes = classNames("schedule__item", {
      ...type && {
        [`schedule__item--${type}`]: true
      }
    });

    return (
      <div className={classes}>
        {!!topics.length && (
          <div className="topic__list">
            {topics.map(topic => (
              <div key={topic} className="topic__item">
                <span>{topic}</span>
              </div>
            ))}
          </div>
        )}
        <span>{name}</span>
      </div>
    );
  }
}
