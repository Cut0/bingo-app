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
      row: ['Initial', 'Initial', 'Initial', 'Initial', 'Initial'],
      column: ['Initial', 'Initial', 'Initial', 'Initial', 'Initial'],
      upper: 'Initial',
      lower: 'Initial',
    });
  });

  test('ビンゴを空けられる。', async () => {
    await act(async () => {
      Promise.all([
        result.current[2](0, 0),
        result.current[2](0, 1),
        result.current[2](0, 2),
        result.current[2](1, 0),
        result.current[2](1, 1),
        result.current[2](1, 2),
        result.current[2](1, 3),
        result.current[2](2, 0),
        result.current[2](2, 1),
        result.current[2](2, 3),
        result.current[2](2, 4),
        result.current[2](3, 0),
        result.current[2](3, 1),
        result.current[2](3, 3),
        result.current[2](4, 0),
        result.current[2](4, 1),
        result.current[2](4, 3),
        result.current[2](4, 4),
      ]);
    });
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
      row: ['Initial', 'Reach', 'Bingo', 'Initial', 'Reach'],
      column: ['Bingo', 'Bingo', 'Initial', 'Reach', 'Initial'],
      upper: 'Reach',
      lower: 'Bingo',
    });
  });
});
