import React, { FC } from 'react';
import { Flex, Text } from '@chakra-ui/react';

export const Header: FC = () => {
  return (
    <Flex
      align="center"
      bgColor="background"
      boxShadow="md"
      h={16}
      p={4}
      pos="fixed"
      w="100%"
      zIndex="1"
    >
      <Text color="primary" ml={4} textStyle="heading">
        Bingo
      </Text>
    </Flex>
  );
};
