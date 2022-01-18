type BingoElement = { num: number; isOpened: boolean };

export type BingoLine = BingoElement[];

export type BingoSheet = BingoElement[][];

export type LineStatus = 'Initial' | 'Reach' | 'Bingo';

export type BingoLineState = {
  row: LineStatus[];
  column: LineStatus[];
  upper: LineStatus;
  lower: LineStatus;
};
