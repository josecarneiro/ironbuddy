import React from 'react';
import { Link } from 'react-router-dom';

export default ({
  url,
  external = true,
  link,
  children
}) => link ? (
  <Link to={ link }>{ children }</Link>
) : (
  <a href={ url } { ...external && { target: '_blank', rel: "noreferrer" } }>{ children }</a>
);
