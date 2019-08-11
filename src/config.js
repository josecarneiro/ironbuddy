// import './util/cryptography';

import { version } from './../package.json';

const {
  NODE_ENV: environment,
  REACT_APP_SPREADSHEET_ID: spreadsheetId,
  REACT_APP_BOARD_ID: boardId,
  REACT_APP_EXTENSION_URL: extensionURL = 'https://chrome.google.com/webstore/detail/ironbuddy/hfoemkojdhheooepbjmjdhenmmijpgkf',
  REACT_APP_BOOTCAMP_DURATION = 50
} = process.env;

const environmentIsProduction = environment === 'production';
export const bootcampDuration = parseInt(REACT_APP_BOOTCAMP_DURATION);
// export const bootcampDuration = !environmentIsProduction ? 50 : 15;

export {
  spreadsheetId,
  boardId,
  version,
  environment,
  environmentIsProduction,
  extensionURL
};
export const startDate = new Date();
