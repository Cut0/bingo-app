import { useCallback, useEffect, useState } from 'react';
import { getLineStatus } from './bingoLineUtills';
import { BingoLineState, BingoSheet } from './bingo';
import { getInitialBingo } from './bingoSheetUtills';

export const useBingo = (length: number) => {
  const [bingoSheet, setBingoSheet] = useState<BingoSheet | undefined>(
    undefined,
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
      if (!bingoSheet) return;

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

  /**
   * useStateのコールバック関数に入れて初期値を設定すると、乱数を利用していることにより、hydorationエラーが発生する。
   * そのため、副作用フックで初期値を設定する。
   */
  useEffect(() => {
    setBingoSheet(getInitialBingo(length));
  }, [length]);

  return [bingoSheet, bingoLineState, openBingo] as const;
};
