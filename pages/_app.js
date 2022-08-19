import Layout from '../components/Layout';
import '../styles/globals.css';

function MezigApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MezigApp;
