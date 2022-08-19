import Link from 'next/link';
import styles from '../styles/App.module.css';
import Navbar from '../components/Navbar';

export default function App() {
  return (
    <>
      <h1 className={styles.title}>Bienvenue dans le nouveau Mezig</h1>

      <Link href="/users">
        <button>test</button>
      </Link>
    </>
  );
}
