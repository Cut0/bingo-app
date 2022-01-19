import { Box } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Header } from '../components/Header';
import { BingoSheet } from '../components/BingoSheet';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Bingo App</title>
        <meta content="ビンゴアプリケーションです。" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Box bgColor="lightBackground" minH="100vh">
        <Header />
        <Box maxW="720px" mx="auto" pt={16}>
          <BingoSheet />
        </Box>
      </Box>
    </>
  );
};

export default Home;
