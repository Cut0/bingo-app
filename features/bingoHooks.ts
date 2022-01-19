import { useCallback, useEffect, useState } from 'react';
import { getLineStatus } from './bingoLineUtills';
import { BingoLineState, BingoElementPosition, BingoSheet } from './bingo';
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

  const openBingo = useCallback(
    (position: BingoElementPosition) => {
      if (!bingoSheet) return;

      const newBingoSheet = [...bingoSheet];
      newBingoSheet[position.rowNum][position.columnNum].isOpened = true;
      setBingoSheet(newBingoSheet);

      setBingoLineState((preState) => {
        const { row, column, upper, lower } = getLineStatus(
          position,
          newBingoSheet,
        );
        const newState = { ...preState };
        newState.row[position.rowNum] = row;
        newState.column[position.columnNum] = column;
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
