import React from "react";
import ElementAnchor from "./../elements/anchor";

import "./style.scss";

import {
  version
} from './../../config';

export default () => (
  <footer className="app__footer">
    <div className="container">
      {/* <ElementAnchor link="/">About IronBuddy</ElementAnchor> */}
      <ElementAnchor link="/extension">Extension</ElementAnchor>
      <small>Version { version }</small>
    </div>
  </footer>
);
