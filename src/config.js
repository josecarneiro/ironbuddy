// import './util/cryptography';

import { version } from './../package.json';

console.log( version);

const {
  NODE_ENV: environment,
  REACT_APP_SPREADSHEET_ID: spreadsheetId,
  REACT_APP_BOARD_ID: boardId
} = process.env;

const environmentIsProduction = environment === 'production';

export {
  spreadsheetId,
  boardId,
  version,
  environment,
  environmentIsProduction
};
export const startDate = new Date();
export const bootcampDuration = !environmentIsProduction ? 50 : 15;

console.log(process.env);
