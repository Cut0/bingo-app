import { getBingoNumberColumn } from './bingoSheetUtills';

describe(getBingoNumberColumn.name, () => {
  const params = { min: 1, max: 15, length: 15 };

  test('列のサイズが指定したものである。', () => {
    expect(getBingoNumberColumn(params).length).toBe(params.length);
  });

  test('列の値が範囲内である。', () => {
    expect(
      getBingoNumberColumn(params).every(
        (el) => params.min <= el && el <= params.max,
      ),
    ).toBe(true);
  });

  test('列の値が重複していない。', () => {
    expect(new Set(getBingoNumberColumn(params)).size).toBe(params.length);
  });
});
