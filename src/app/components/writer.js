"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/app/page.module.css";
import book from "/public/images/book_img.png";
import eidos from "/public/images/Eidos.png";
import eidosBig from "/public/images/eidosBig.png";
import manning from "/public/images/manning_icon.svg";
// import amazon from "/public/images/amazon_icon.svg";
import substack from "/public/images/substack.svg";
import cloud from "/public/images/cloud.png";
import cloud2x from "/public/images/cloud@2x.png";
import cloud3x from "/public/images/cloud@3x.png";
import cloudBig from "/public/images/cloudBig.png";
import eidos_name from "/public/images/Eidos_name.svg";

export default function Writer() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 1023);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className={`${styles.wrapper} ${styles.component}`}>
      <div id="writer" className={styles.writer}>
        <h1 className={styles.writer_header}>Writer</h1>
        <div className={styles.writer_row}>
          <Image className={styles.book_img} src={book} alt="book" />
          <div className={styles.writer_row1}>
            <h2 className={styles.writer_about}>
              Uncovering design in words to raise a new generation of
              changemakers
            </h2>
            <p className={styles.writer_content}>
              In 2024, I published Emotional Digital Design - a book for novice
              designers and all digital professionals who want to better
              understand how to create products that spark.
            </p>
            <p className={styles.writer_content}>
              It shares practical insights on using psychology to craft digital
              products that create positive emotional experiences.
            </p>
            <div className={styles.writer_cta}>
              <div className={`${styles.btn} ${styles.btn_book}`}>
                <a href="https://bit.ly/3ZsUQS4" target="_blank">
                  <Image src={manning} alt="manning icon" />
                  <span>Get it on Manning</span>
                </a>
              </div>
              {/* <div className={`${styles.btn} ${styles.btn_book}`}>
                <a href=""  target="_blank">
                  <Image src={amazon} alt="amazon icon" />
                  <span>Buy it on Amazon</span>
                </a>
              </div> */}
            </div>
          </div>
        </div>
        <div className={styles.writer_row}>
          <div className={styles.writer_eidos}>
            <div className={styles.eidos_icon}>
              <Image src={eidos_name} alt="Eidos icon" />
            </div>
            <div className={styles.main_img_wrapper}>
              <div className={styles.main_img}>
                <Image
                  src={isSmallScreen ? eidos : eidosBig}
                  alt="Eidos"
                  width={isSmallScreen ? 343 : 407}
                  height={250}
                />
              </div>
              <div className={styles.cloud}>
                <Image
                  src={isSmallScreen ? cloud : cloudBig}
                  srcSet={
                    isSmallScreen
                      ? `${cloud.src} 1x, ${cloud2x.src} 2x, ${cloud3x.src} 3x` 
                      : `${cloudBig.src} 1x, ${cloud2x.src} 2x, ${cloud3x.src} 3x` 
                  }
                  alt="Cloud"
                  width={isSmallScreen ? 22 : 32}
                  // height={isSmallScreen ? 22 : 32}
                  style={{height:"auto"}}
                />
              </div>
            </div>
          </div>
          <div className={styles.writer_row1}>
            <h2 className={styles.writer_about}>
              For the growing community of such professionals, I also regularly
              publish insightful content on Substack
            </h2>
            <p className={styles.writer_content}>
              Discover a world of design with premium articles, gain insights
              into digital products, explore new tools, and unlock design
              knowledge and inspiration.
            </p>
            <div className={styles.writer_eidos_wrapper}>
              <div className={`${styles.btn} ${styles.btn_book}`}>
                <a href="https://eidosworld.substack.com/" target="_blank">
                  <Image src={substack} alt="substack icon" />
                  <span>Subscribe on Substack</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
