import React from 'react';
import ElementAnchor from './../elements/anchor';
import IronBuddyLogo from './../logo';

import "./style.scss";

export default props => (
  <header className="navbar">
    <div className="container">
      <ElementAnchor link="/">
        <IronBuddyLogo />
      </ElementAnchor>
    </div>
  </header>
);
