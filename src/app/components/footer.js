import Image from "next/image";
import styles from "@/app/page.module.css";
import logo from "/public/images/logo_grinS.svg";
import linkedIn from "/public/images/icon_linkedin.svg";
import substack from "/public/images/icon_substack.svg";
import insta from "/public/images/icon_instagram.svg";
import medium from "/public/images/icon_medium.svg";
import dot1 from "/public/images/Ellipse 1.png";
import dot2 from "/public/images/Ellipse 2.png";
import dot3 from "/public/images/Ellipse 3.png";
import dot4 from "/public/images/Ellipse 3.png";
import Link from "next/link";

export default function footer() {
  return (
    <div className={styles.wrapper}> 
      <div id="contacts" className={styles.footer}>
        <div className={styles.footer_logo}>
          <Link href="/"><Image src={logo} alt="Logo Grin" /></Link>
        </div>
        <div className={styles.footer_dots}>
          <Image src={dot1} alt="dot" />
          <Image src={dot2} alt="dot" />
          <Image src={dot3} alt="dot" />
          <Image src={dot4} alt="dot" />
        </div>
        <div className={styles.footer_socialMedia}>
          <a href="https://www.linkedin.com/in/vadimgrin/" target="_blank">
            <Image src={linkedIn} alt="LinkedIn icon" />
          </a>
          <a href="https://eidosworld.substack.com/" target="_blank">
            <Image src={substack} alt="Substack icon" />
          </a>
          <a href="https://www.instagram.com/vadimgrin/" target="_blank">
            <Image src={insta} alt="Instagram icon" />
          </a>
          <a href="https://medium.com/@vadimgrin" target="_blank">
            <Image src={medium} alt="Medium icon" />
          </a>
        </div>
      </div>
    </div>
  );
}
