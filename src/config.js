// import './util/cryptography';

const {
  NODE_ENV: environment,
  REACT_APP_SPREADSHEET_ID: spreadsheetId,
  REACT_APP_BOARD_ID: boardId
} = process.env;

const environmentIsProduction = environment === 'production';

export {
  spreadsheetId,
  boardId,
  environment,
  environmentIsProduction
};
export const startDate = new Date();
export const bootcampDuration = !environmentIsProduction ? 50 : 15;
