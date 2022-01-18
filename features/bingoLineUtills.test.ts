import { detectLine, getLineState } from './bingoLineUtills';

describe(detectLine.name, () => {
  test('ビンゴとなる。', () => {
    expect(detectLine([true, true, true, true])).toBe('Bingo');
  });

  test('リーチとなる。', () => {
    expect(detectLine([true, false, true, true])).toBe('Reach');
  });

  test('初期値となる。', () => {
    expect(detectLine([false, false, true, true])).toBe('Initial');
  });
});

describe(getLineState.name, () => {
  const bingoMap = [
    [true, true, true, false, false],
    [true, true, true, true, false],
    [true, true, true, true, true],
    [true, true, false, true, false],
    [false, true, false, true, true],
  ];
  const { row, column, upper, lower } = getLineState(bingoMap);

  test('列の配列が正常になる。', () => {
    expect(row).toEqual(['Initial', 'Reach', 'Bingo', 'Initial', 'Initial']);
  });

  test('行の配列が正常になる。', () => {
    expect(column).toEqual(['Reach', 'Bingo', 'Initial', 'Reach', 'Initial']);
  });

  test('➚の配列が正常になる。', () => {
    expect(upper).toBe('Initial');
  });

  test('➘の配列が正常になる。', () => {
    expect(lower).toBe('Bingo');
  });
});
