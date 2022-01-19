export type BingoElementPosition = { rowNum: number; columnNum: number };

export type BingoElementInfo = { num: number; isOpened: boolean };

export type BingoLine = BingoElementInfo[];

export type BingoSheet = BingoElementInfo[][];

export type LineStatus = 'Initial' | 'Reach' | 'Bingo';

export type BingoLineState = {
  row: LineStatus[];
  column: LineStatus[];
  upper: LineStatus;
  lower: LineStatus;
};
