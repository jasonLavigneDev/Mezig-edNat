import Link from 'next/link';
import Image from 'next/image';

import styles from '../styles/Navbar.module.css';
import appLogo from '../public/Mezig.png';

export default function Navbar() {
  return (
    <nav className={styles.container}>
      <ul>
        <li style={{ marginTop: '5px', marginLeft: '15px' }}>
          <Link href="/">
            <Image src={appLogo} alt="Application logo" width={180} height={40} style={{ cursor: 'pointer' }} />
          </Link>
        </li>
        <li className={styles.profilLink}>
          <a>profile</a>
        </li>
      </ul>
    </nav>
  );
}
