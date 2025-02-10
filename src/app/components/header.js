import Image from "next/image";
import logo from "/public/images/logo.svg";
import styles from "@/app/page.module.css";
import Link from "next/link";

export default function Header({ className = '' }) {
    return (
        <div className={`${styles.wrapper} ${styles[className]}`}>
            <div className={styles.header}>
                <Link href="/">
                    <Image className={styles.logo} src={logo} alt="logo" />
                </Link>
                
                <nav className={styles.navMenu}>
                    <ul>
                        <li>
                            <Link href="/#about">ABOUT</Link>
                        </li>
                        <li>
                            <Link href="/#teacher">TEACHER</Link>
                        </li>
                        <li>
                            <Link href="/#writer">WRITER</Link>
                        </li>
                        <li>
                            <Link href="/#doer">DOER</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
