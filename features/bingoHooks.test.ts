import { act, renderHook } from '@testing-library/react-hooks';
import { useBingo } from './bingoHooks';

describe(useBingo.name, () => {
  let result = renderHook(() => useBingo(5)).result;
  beforeEach(() => {
    result = renderHook(() => useBingo(5)).result;
  });

  test('BingoSheetが初期状態である。', () => {
    expect(result.current[0]?.flat().map((el) => el.isOpened)).toEqual([
      ...Array.from({ length: 12 }).map(() => false),
      true,
      ...Array.from({ length: 12 }).map(() => false),
    ]);
  });

  test('Line判定用のStateが初期状態である。', () => {
    expect(result.current[1]).toEqual({
      column: ['Initial', 'Initial', 'Initial', 'Initial', 'Initial'],
      row: ['Initial', 'Initial', 'Initial', 'Initial', 'Initial'],
      upper: 'Initial',
      lower: 'Initial',
    });
  });

  test('ビンゴを空けられる。', async () => {
    await act(async () => {
      Promise.all([
        result.current[2]({ columnNum: 0, rowNum: 0 }),
        result.current[2]({ columnNum: 0, rowNum: 1 }),
        result.current[2]({ columnNum: 0, rowNum: 2 }),
        result.current[2]({ columnNum: 1, rowNum: 0 }),
        result.current[2]({ columnNum: 1, rowNum: 1 }),
        result.current[2]({ columnNum: 1, rowNum: 2 }),
        result.current[2]({ columnNum: 1, rowNum: 3 }),
        result.current[2]({ columnNum: 2, rowNum: 0 }),
        result.current[2]({ columnNum: 2, rowNum: 1 }),
        result.current[2]({ columnNum: 2, rowNum: 3 }),
        result.current[2]({ columnNum: 2, rowNum: 4 }),
        result.current[2]({ columnNum: 3, rowNum: 0 }),
        result.current[2]({ columnNum: 3, rowNum: 1 }),
        result.current[2]({ columnNum: 3, rowNum: 3 }),
        result.current[2]({ columnNum: 4, rowNum: 0 }),
        result.current[2]({ columnNum: 4, rowNum: 1 }),
        result.current[2]({ columnNum: 4, rowNum: 3 }),
        result.current[2]({ columnNum: 4, rowNum: 4 }),
      ]);
    });
    console.log(result.current[0]);
    expect(result.current[0]?.flat().map((el) => el.isOpened)).toEqual([
      true,
      true,
      true,
      false,
      false,
      true,
      true,
      true,
      true,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      true,
      false,
      true,
      true,
      false,
      true,
      true,
    ]);

    expect(result.current[1]).toEqual({
      column: ['Initial', 'Reach', 'Bingo', 'Initial', 'Reach'],
      row: ['Bingo', 'Bingo', 'Initial', 'Reach', 'Initial'],
      upper: 'Reach',
      lower: 'Bingo',
    });
  });
});
