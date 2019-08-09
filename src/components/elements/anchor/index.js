import React from 'react';
import { Link } from 'react-router-dom';

export default ({
  url,
  external = true,
  link,
  children,
  ...props
}) => link ? (
  <Link to={ link } { ...props }>{ children }</Link>
) : (
  <a
    href={ url }
    { ...external && { target: '_blank', rel: "noreferrer" } }
    { ...props }
  >{ children }</a>
);
