export const makeQuery = data =>
  Object.entries(data)
    .map(item => item.join("="))
    .join("&");
