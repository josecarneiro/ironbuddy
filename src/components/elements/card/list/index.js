import React from "react";
import classNames from 'classnames';

import "./style.scss";

export default ({ className, children }) => (
  <div className={ classNames("card__list", className) }>{ children }</div>
);
