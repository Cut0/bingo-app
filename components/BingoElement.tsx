import { FC, useMemo } from 'react';
import { AspectRatio, Box, Flex, GridItem, Text } from '@chakra-ui/react';
import {
  BingoElementInfo,
  BingoLineState,
  BingoElementPosition,
} from '../features/bingo';

const bingoSize = 5;

export type BingoElementProps = {
  position: BingoElementPosition;
  elementInfo: BingoElementInfo;
  bingoLineState: BingoLineState;
  open: (position: BingoElementPosition) => void;
};

const getStatus = (
  bingoLineState: BingoLineState,
  { rowNum, columnNum }: BingoElementPosition,
) => {
  if (
    bingoLineState.column[columnNum] === 'Bingo' ||
    bingoLineState.row[rowNum] === 'Bingo' ||
    (rowNum === bingoSize - columnNum - 1 &&
      bingoLineState.upper === 'Bingo') ||
    (rowNum === columnNum && bingoLineState.lower === 'Bingo')
  )
    return 'Bingo';
  if (
    bingoLineState.column[columnNum] === 'Reach' ||
    bingoLineState.row[rowNum] === 'Reach' ||
    (rowNum === bingoSize - columnNum - 1 &&
      bingoLineState.upper === 'Reach') ||
    (rowNum === columnNum && bingoLineState.lower === 'Reach')
  )
    return 'Reach';
  return 'Initial';
};

export const BingoElement: FC<BingoElementProps> = ({
  elementInfo,
  bingoLineState,
  open,
  position,
}) => {
  const status = useMemo(
    () => getStatus(bingoLineState, position),
    [bingoLineState, position],
  );

  return (
    <AspectRatio position="relative" ratio={1}>
      <>
        <GridItem
          bg="whiteBackground"
          borderColor={
            status === 'Reach' && !elementInfo.isOpened
              ? 'primary'
              : 'whiteBackground'
          }
          borderRadius="4px"
          borderWidth="4px"
          boxShadow="md"
          onClick={() => {
            open(position);
          }}
        >
          {!(
            Math.floor(bingoSize / 2) === position.rowNum &&
            Math.floor(bingoSize / 2) === position.columnNum
          ) && (
            <Flex alignItems="center" direction="column" justify="center">
              {status === 'Reach' && !elementInfo.isOpened && (
                <Text color="main" textStyle="bold">
                  REACH
                </Text>
              )}
              <Text color="primary" textStyle="title">
                {elementInfo.num}
              </Text>
            </Flex>
          )}
        </GridItem>
        {elementInfo.isOpened && (
          <Box
            bgColor={'rgba(95, 95, 95, 0.6)'}
            border={status === 'Bingo' ? '4px solid #ffd700' : 'none'}
            borderRadius="4px"
            bottom={0}
            left={0}
            position="absolute"
            right={0}
            top={0}
          />
        )}
      </>
    </AspectRatio>
  );
};
