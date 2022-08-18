import Head from 'next/head';
import '../styles/globals.css';
import styles from '../styles/Home.module.css';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Mezig</title>
        <meta name="description" content="Online portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <main className={styles.main}>
          <Component {...pageProps} />
        </main>
      </div>

      <footer className={styles.footer}>
        <a href="https://nextjs.org/docs/getting-started" target="_blank" rel="noopener noreferrer">
          Powered by{' Vincent '}
        </a>
      </footer>
    </>
  );
}

export default App;
