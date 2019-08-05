import loadSpreadsheet, { parseTables } from "./generic";
import { spreadsheetId } from "./../../config";
// import './generic/request';

export default async (input = {}) => {
  const spreadsheet = await loadSpreadsheet({
    id: spreadsheetId,
    sheet: 2,
    ...input
  });
  const {
    tables: {
      configuration: [ configuration = {} ] = [],
      students = []
    }
  } = spreadsheet;
  return { configuration, students };
}
