import {
  BingoElementPosition,
  BingoLine,
  BingoSheet,
  LineStatus,
} from './bingo';

export const detectLine = (line: BingoLine) => {
  const count = line.map((el) => el.isOpened).filter((el) => el).length;
  switch (count) {
    case line.length:
      return 'Bingo';
    case line.length - 1:
      return 'Reach';
    default:
      return 'Initial';
  }
};

export const getLineStatus = (
  { columnNum, rowNum }: BingoElementPosition,
  bingoSheet: BingoSheet,
) => {
  const status: {
    column: LineStatus;
    row: LineStatus;
    upper?: LineStatus;
    lower?: LineStatus;
  } = {
    column: 'Initial',
    row: 'Initial',
    upper: undefined,
    lower: undefined,
  };

  status.column = detectLine(bingoSheet[columnNum]);

  status.row = detectLine(
    bingoSheet[0]?.map((_, i) => bingoSheet.map((column) => column[i]))[rowNum],
  );

  if (rowNum === columnNum) {
    status.lower = detectLine(bingoSheet.map((column, i) => column[i]));
  }

  if (columnNum === bingoSheet.length - rowNum - 1) {
    status.upper = detectLine(
      bingoSheet.map((column, i) => column[column.length - i - 1]),
    );
  }

  return status;
};
