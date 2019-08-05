import axios from "axios";
import { makeQuery } from "./../../util/url";
import { sheetParser } from './util';
export { parseTables } from './util';

const makeURL = ({
  id,
  sheet,
  columns: [columnStart, columnEnd] = [],
  rows: [rowStart, rowEnd] = []
}) =>
  `https://spreadsheets.google.com/feeds/cells/${id}/${sheet}/public/values?${makeQuery(
    {
      alt: "json",
      ...(typeof columnStart === "number" && { "min-col": columnStart + 1 }),
      ...(typeof columnEnd === "number" && { "max-col": columnEnd + 1 }),
      ...(typeof rowStart === "number" && { "min-row": rowStart + 1 }),
      ...(typeof rowEnd === "number" && { "max-row": rowEnd + 1 })
    }
  )}`;

export default async ({ id, sheet }) => {
  try {
    const URL = makeURL({ id, sheet });
    const result = await axios.get(URL);
    const data = sheetParser(result.data);
    return data;
  } catch (error) {
    console.log("Error loading spreadsheet");
    throw error;
  }
};
