import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <h1 className={styles.title}>Bienvenue dans le nouveau Mezig</h1>

      <Link href={{ pathname: '/users' }}>
        <button>test</button>
      </Link>
    </>
  );
}
