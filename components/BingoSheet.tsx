import { memo, FC, useMemo } from 'react';
import { Grid, Text } from '@chakra-ui/react';
import { useBingo } from '../features/bingoHooks';
import { BingoElement } from './BingoElement';

const bingoSize = 5;

type BingoRowProps = {
  rowNameList: string[];
};

const BingoRowComponent: FC<BingoRowProps> = ({ rowNameList }) => {
  return (
    <Grid gap={2} pt={2} px={4} templateColumns="repeat(5,1fr)">
      {rowNameList.map((el, i) => {
        return (
          <Text
            color="primary"
            key={i}
            textAlign="center"
            textStyle="subheading"
          >
            {el}
          </Text>
        );
      })}
    </Grid>
  );
};

const BingoRow = memo(BingoRowComponent);

export const BingoSheet: FC<{}> = () => {
  const [bingoSheet, bingoLineState, openBingo] = useBingo(bingoSize);
  const rowNameList = useMemo(() => ['B', 'I', 'N', 'G', 'O'], []);
  return (
    <>
      <BingoRow rowNameList={rowNameList} />
      <Grid
        gap={2}
        gridAutoFlow="column"
        px={4}
        py={2}
        templateColumns="repeat(5,1fr)"
        templateRows="repeat(5,1fr)"
      >
        {bingoSheet?.map((row, i) => {
          return row.map((el, j) => {
            return (
              <BingoElement
                bingoLineState={bingoLineState}
                elementInfo={el}
                key={String(i) + String(j)}
                open={openBingo}
                position={{ rowNum: i, columnNum: j }}
              />
            );
          });
        })}
      </Grid>
    </>
  );
};
