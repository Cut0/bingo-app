import { detectLine, getLineStatus } from './bingoLineUtills';

const bingoSheet = [
  [
    { isOpened: true, num: 0 },
    { isOpened: true, num: 0 },
    { isOpened: true, num: 0 },
    { isOpened: false, num: 0 },
    { isOpened: false, num: 0 },
  ],
  [
    { isOpened: true, num: 0 },
    { isOpened: true, num: 0 },
    { isOpened: true, num: 0 },
    { isOpened: true, num: 0 },
    { isOpened: false, num: 0 },
  ],
  [
    { isOpened: true, num: 0 },
    { isOpened: true, num: 0 },
    { isOpened: true, num: 0 },
    { isOpened: true, num: 0 },
    { isOpened: true, num: 0 },
  ],
  [
    { isOpened: true, num: 0 },
    { isOpened: true, num: 0 },
    { isOpened: false, num: 0 },
    { isOpened: true, num: 0 },
    { isOpened: false, num: 0 },
  ],
  [
    { isOpened: true, num: 0 },
    { isOpened: true, num: 0 },
    { isOpened: false, num: 0 },
    { isOpened: true, num: 0 },
    { isOpened: true, num: 0 },
  ],
];

describe(detectLine.name, () => {
  test('ビンゴとなる。', () => {
    expect(detectLine(bingoSheet[2])).toBe('Bingo');
  });

  test('リーチとなる。', () => {
    expect(detectLine(bingoSheet[4])).toBe('Reach');
  });

  test('初期値となる。', () => {
    expect(detectLine(bingoSheet[3])).toBe('Initial');
  });
});

describe(getLineStatus.name, () => {
  const { row, column, upper, lower } = getLineStatus(
    { i: 2, j: 2 },
    bingoSheet,
  );

  test('列の配列が正常になる。', () => {
    expect(row).toBe('Bingo');
  });

  test('行の配列が正常になる。', () => {
    expect(column).toBe('Initial');
  });

  test('➚の配列が正常になる。', () => {
    expect(upper).toBe('Reach');
  });

  test('➘の配列が正常になる。', () => {
    expect(lower).toBe('Bingo');
  });
});
