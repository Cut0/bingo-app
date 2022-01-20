export const getBingoNumberColumn = ({
  min,
  max,
  length,
}: {
  min: number;
  max: number;
  length: number;
}) => {
  const defaultList = Array.from({ length: max - min + 1 }, (_, i) => i + min);
  return defaultList
    .reduce(
      (newArr, _, i) => {
        const rand = i + Math.floor(Math.random() * (newArr.length - i));
        [newArr[rand], newArr[i]] = [newArr[i], newArr[rand]];
        return newArr;
      },
      [...defaultList],
    )
    .slice(0, length);
};

export const getBingoNumber = (length: number) => {
  return Array.from({ length }).map((_, i) =>
    getBingoNumberColumn({ min: i * 15 + 1, max: (i + 1) * 15, length }),
  );
};

export const getInitialBingo = (length: number) => {
  return getBingoNumber(length).map((column, i) => {
    return column.map((el, j) => {
      if (i === Math.floor(length / 2) && j === Math.floor(length / 2)) {
        return { num: el, isOpened: true };
      }
      return { num: el, isOpened: false };
    });
  });
};
