"use client";
import { useEffect } from "react";
import Image from "next/image";
import styles from "@/app/page.module.css";
import vadym from "/public/images/vadym.png";
import wave from "/public/images/wave.png";
import wave2x from "/public/images/hand@2.png";
import wave3x from "/public/images/hand@3.png";
import dot1 from "/public/images/Ellipse 1.png";
import dot2 from "/public/images/Ellipse 2.png";
import dot3 from "/public/images/Ellipse 3.png";
import dot4 from "/public/images/Ellipse 4.png";

export default function Intro() {
  useEffect(() => {
    const dots = document.querySelectorAll(`.${styles.dot}`);
    const header = document.querySelector(`.${styles.intro} h1`);
    const headerRect = header.getBoundingClientRect();
    const movementArea = {
      top: 0,
      left: 0,
      width: headerRect.width,
      height: (headerRect.height + 48),
    };

    const dotsData = Array.from(dots).map((dot) => {
      const initialX =
        movementArea.left + Math.random() * (movementArea.width - 10);
      const initialY =
        movementArea.top + Math.random() * (movementArea.height - 10);
      const velocityX = Math.random() * 0.2 + 0.2;
      const velocityY = Math.random() * 0.2 + 0.2;
      dot.style.top = `${initialY}px`;
      dot.style.left = `${initialX}px`;

      return {
        dot,
        x: initialX,
        y: initialY,
        vx: velocityX * (Math.random() > 0.5 ? 1 : -1),
        vy: velocityY * (Math.random() > 0.5 ? 1 : -1),
      };
    });

    function animate() {
      dotsData.forEach((data) => {
        data.x += data.vx;
        data.y += data.vy;

        if (
          data.x <= movementArea.left ||
          data.x + 10 >= movementArea.left + movementArea.width
        ) {
          data.vx *= -1;
        }
        if (
          data.y <= movementArea.top ||
          data.y + 10 >= movementArea.top + movementArea.height
        ) {
          data.vy *= -1;
        }

        data.dot.style.left = `${data.x}px`;
        data.dot.style.top = `${data.y}px`;
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div id="about" className={`${styles.intro} ${styles.component}`}>
        <div className={styles.intro_header}>
          <h1>Great design will save the world</h1>
          <div className={styles.dot}>
            <Image src={dot1} alt="dot" />
          </div>
          <div className={styles.dot}>
            <Image src={dot2} alt="dot" />
          </div>
          <div className={styles.dot}>
            <Image src={dot3} alt="dot" />
          </div>
          <div className={styles.dot}>
            <Image src={dot4} alt="dot" />
          </div>
        </div>
        <article className={styles.vadym_about} >
          <div className={styles.introImg}>
            <div className={styles.wave_icon}>
              <Image 
              src={wave} 
              srcSet={`${wave.src} 1x, ${wave2x.src} 2x, ${wave3x.src} 3x`}
              width={32}
              style={{height:'auto'}}
              alt="wave hand" />
            </div>
            <div className={styles.vadym_foto}>
              <Image src={vadym} alt="Vadym" />
            </div>
            <div className={styles.introImg_text}>
              <h2 className={styles.intro_heading}>Hi,</h2>
              <span className={styles.intro_name}>I&apos;m Vadym Grin</span>
            </div>
          </div>
          <div className={styles.intro_colText}>
            <p className={styles.intro_description}>
              I believe great design has the power to transform societies,
              bridge divides, and enrich lives.
            </p>
            <div className={styles.intro_about_text}>
              <p className={styles.intro_subheading}>That&apos;s why I</p>
              <p className={styles.action_text}>Teach,</p>
              <p className={styles.action_text}>Write about,</p>
              <p className={styles.action_text}>Do</p>
              <p className={styles.intro_focus}>Design</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
