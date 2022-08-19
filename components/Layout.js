import Head from 'next/head';
import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Mezig</title>
        <meta name="description" content="Online portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      {children}
    </>
  );
}
