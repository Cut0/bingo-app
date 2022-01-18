import { getBingoNumberRow } from './bingoSheetUtills';

describe(getBingoNumberRow.name, () => {
  const params = { min: 1, max: 15, length: 15 };

  test('列のサイズが指定したものである。', () => {
    expect(getBingoNumberRow(params).length).toBe(params.length);
  });

  test('列の値が範囲内である。', () => {
    expect(
      getBingoNumberRow(params).every(
        (el) => params.min <= el && el <= params.max,
      ),
    ).toBe(true);
  });

  test('列の値が重複していない。', () => {
    expect(new Set(getBingoNumberRow(params)).size).toBe(params.length);
  });
});
