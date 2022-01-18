import { BingoLineState } from './bingoHooks';

export const detectLine = (line: boolean[]) => {
  const count = line.filter((el) => {
    return el;
  }).length;
  switch (count) {
    case line.length:
      return 'Bingo';
    case line.length - 1:
      return 'Reach';
    default:
      return 'Initial';
  }
};

export const getLineState = (bingoMap: boolean[][]): BingoLineState => {
  const row = bingoMap.map(detectLine);

  const column = bingoMap[0]
    ?.map((_col, i) => bingoMap.map((row) => row[i]))
    .map(detectLine);

  const upper = detectLine(
    bingoMap.map((row, i) => {
      return row[row.length - i - 1];
    }),
  );

  const lower = detectLine(
    bingoMap.map((row, i) => {
      return row[i];
    }),
  );

  return {
    row,
    column,
    upper,
    lower,
  };
};
