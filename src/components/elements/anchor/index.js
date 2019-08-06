import React from 'react';

export default ({
  url,
  external = true,
  children
}) => <a href={url} { ...external && { target: '_blank', rel: "noreferrer" } }>{ children }</a>
