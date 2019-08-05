export const spreadsheetValueParser = value => {
  const valueMap = {
    TRUE: true,
    FALSE: false
  };
  const valueFromMap = valueMap[value];
  if (typeof valueFromMap !== 'undefined') return valueFromMap;
  // if (/^[0-9]+$/.test(value)) return parseInt(value);
  if (/^[+-]?(\d*\.)?\d+$/.test(value)) return parseFloat(value);
  if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value)) return new Date(value);
  return value;
};

export const entriesParser = (
  rawEntries, {
    columns: [startColumn = 0] = [],
    rows: [startRow = 0] = []
  }
) => {
  const boundaries = rawEntries
    .map(({
      gs$cell: {
        col,
        row
      }
    }) => [parseInt(row), parseInt(col)])
    .reduce((accumulator, [row, col]) => ({
      ...accumulator,
      ...col > accumulator.columns && {
        columns: col
      },
      ...row > accumulator.rows && {
        rows: row
      }
    }), {
      rows: 1,
      columns: 1
    });
  const base = [...new Array(boundaries.rows)].map(item => [...new Array(boundaries.columns)]);
  const entries = rawEntries
    .map(({
      gs$cell: {
        col,
        row,
        $t: value
      }
    }) => [
      [col, row].map(value => parseInt(value, 10) - 1),
      value
    ])
    .reduce((rows, [ [column, row], value ]) => {
      let copy = [...rows];
      copy[row - startRow][column - startColumn] = spreadsheetValueParser(value);
      return copy;
    }, base);
  return entries;
};

export const parseSingleTable = entries =>
  entries.reduce(
    (accumulator, row, index, array) => [
      ...accumulator,
      ...(index ?
        [
          row.reduce(
            (object, val, i) => ({
              ...object,
              [array[0][i]]: val
            }), {}
          )
        ] :
        [])
    ],
    []
  );

export const parseTables = tables => {
  const rowIsEmpty = row => !row.filter(value => typeof value !== 'undefined').length;
  const columnIsEmpty = (array, column) => !array.filter(row => typeof row[column] !== 'undefined').length;
  return tables
    .reduce((accumulator, row, index, array) => {
      if (rowIsEmpty(row)) return accumulator;
      const copy = [...accumulator];
      const rowAboveIsEmpty = index ? rowIsEmpty(array[index - 1]) : true;
      const currentLength = copy.length;
      const currentFinalIndex = !rowAboveIsEmpty ? currentLength - 1 : currentLength;
      copy[currentFinalIndex] = [
        ...copy[currentFinalIndex] || [],
        row
      ];
      return copy;
    }, [])
    .map(table => table.map((row, index, array) => row.filter((value, column) => !columnIsEmpty(array, column))))
    .reduce((accumulator, value) => {
      const tableName = value[0][0];
      const table = parseSingleTable(value.filter((value, index) => !!index));
      return {
        ...accumulator,
        [tableName]: table
      }
    }, {});
};

export const sheetParser = ({
  feed: {
    entry: rawEntries = [],
    updated: {
      $t: updated
    }
  }
}, {
  columns,
  rows
} = {}) => {
  const entries = entriesParser(rawEntries, {
    columns,
    rows
  });
  const tables = parseTables(entries);
  return {
    updated: new Date(updated),
    entries,
    tables
  };
};
