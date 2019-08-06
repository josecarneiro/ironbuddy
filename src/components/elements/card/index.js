import React from "react";
import classNames from 'classnames';

import "./style.scss";

export default ({ className, classes, children }) => (
  <div className={ classNames("card", className, classes)}>{ children }</div>
);
