import { memo, FC, useMemo } from 'react';
import { Grid, Text } from '@chakra-ui/react';
import { useBingo } from '../features/bingoHooks';
import { BINGO_SIZE } from '../features/config';
import { BingoElement } from './BingoElement';

type BingoColumnProps = {
  columnNameList: string[];
};

const BingoColumnComponent: FC<BingoColumnProps> = ({ columnNameList }) => {
  return (
    <Grid gap={2} pt={2} px={4} templateColumns="repeat(5,1fr)">
      {columnNameList.map((el, i) => {
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

const BingoColumn = memo(BingoColumnComponent);

export const BingoSheet: FC<{}> = () => {
  const [bingoSheet, bingoLineState, openBingo] = useBingo(BINGO_SIZE);
  const columnNameList = useMemo(() => ['B', 'I', 'N', 'G', 'O'], []);
  return (
    <>
      <BingoColumn columnNameList={columnNameList} />
      <Grid
        gap={2}
        gridAutoFlow="column"
        px={4}
        py={2}
        templateColumns="repeat(5,1fr)"
        templateRows="repeat(5,1fr)"
      >
        {bingoSheet?.map((column, i) => {
          return column.map((el, j) => {
            return (
              <BingoElement
                bingoLineState={bingoLineState}
                elementInfo={el}
                key={String(i) + String(j)}
                open={openBingo}
                position={{ columnNum: i, rowNum: j }}
              />
            );
          });
        })}
      </Grid>
    </>
  );
};
