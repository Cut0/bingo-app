import { useCallback, useState } from 'react';
import { getInitialBingo } from './bingoSheetUtills';
import { getLineStatus } from './bingoLineUtills';
import { BingoLineState, BingoSheet } from './bingo';

export const useBingo = (length: number) => {
  const [bingoSheet, setBingoSheet] = useState<BingoSheet>(
    getInitialBingo(length),
  );

  const [bingoLineState, setBingoLineState] = useState<BingoLineState>({
    row: Array.from({ length }).map(() => 'Initial'),
    column: Array.from({ length }).map(() => 'Initial'),
    upper: 'Initial',
    lower: 'Initial',
  });

  /**
   * i: 列番号
   * j: 行番号
   */
  const openBingo = useCallback(
    (i: number, j: number) => {
      const newBingoSheet = [...bingoSheet];
      newBingoSheet[i][j].isOpened = true;
      setBingoSheet(newBingoSheet);

      setBingoLineState((preState) => {
        const { row, column, upper, lower } = getLineStatus(
          {
            i,
            j,
          },
          newBingoSheet,
        );
        const newState = { ...preState };
        newState.row[i] = row;
        newState.column[j] = column;
        if (lower) {
          newState.lower = lower;
        }
        if (upper) {
          newState.upper = upper;
        }
        return newState;
      });
    },
    [bingoSheet],
  );

  return [bingoSheet, bingoLineState, openBingo] as const;
};
