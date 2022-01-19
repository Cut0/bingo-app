import { BingoLine, BingoSheet, LineStatus } from './bingo';

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
  { i, j }: { i: number; j: number },
  bingoSheet: BingoSheet,
) => {
  const status: {
    row: LineStatus;
    column: LineStatus;
    upper?: LineStatus;
    lower?: LineStatus;
  } = {
    row: 'Initial',
    column: 'Initial',
    upper: undefined,
    lower: undefined,
  };

  status.row = detectLine(bingoSheet[i]);

  status.column = detectLine(
    bingoSheet[0]?.map((_, i) => bingoSheet.map((row) => row[i]))[j],
  );

  if (i === j) {
    status.lower = detectLine(bingoSheet.map((row, i) => row[i]));
  }

  if (i === bingoSheet.length - j - 1) {
    status.upper = detectLine(
      bingoSheet.map((row, i) => row[row.length - i - 1]),
    );
  }

  return status;
};
