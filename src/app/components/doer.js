"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "@/app/page.module.css";
import linkedIn from "/public/images/icon_linkedin.svg";
import attols from "/public/images/logo_attols.svg";
import macPaw from "/public/images/logo_macPow.svg";
import epam from "/public/images/logo_epam.svg";
import groupon from "/public/images/logo_groupon.svg";
import prArmy from "/public/images/logo_prArmy.svg";
import adjust from "/public/images/logo_adjust.svg";
import trinetix from "/public/images/logo_trinetix.svg";
import olx from "/public/images/logo_olx.svg";
import firstAid from "/public/images/firstAid.svg";

const images = [
  { src: attols, alt: "Attols logo", className: styles.attolsLogo },
  { src: macPaw, alt: "Mac Paw logo", className: styles.macpawLogo },
  { src: epam, alt: "Epam logo" },
  { src: groupon, alt: "Groupon logo", className: styles.grouponLogo },
  { src: prArmy, alt: "PR Army logo", className: styles.prarmyLogo },
  { src: adjust, alt: "Adjust logo", className: styles.adjustLogo },
  { src: trinetix, alt: "Trinetix logo", className: styles.trinetixLogo },
  { src: olx, alt: "OLX logo", className: styles.olxLogo },
  { src: firstAid, alt: "First Aid logo", className: styles.firstAidLogo },
];

const Doer = () => {
  const [columns, setColumns] = useState(2);
  const [orderedImages, setOrderedImages] = useState([]);

  const smallScreenOrder = [0, 5, 1, 6, 2, 7, 3, 8, 4];
  const bigScreenOrder = [0, 5, 3, 1, 6, 8, 2, 7, 4];

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1024) {
        setColumns(3);
        setOrderedImages(bigScreenOrder.map((index) => images[index]));
      } else {
        setColumns(2);
        setOrderedImages(smallScreenOrder.map((index) => images[index]));
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columnedImages = Array.from({ length: columns }, (_, colIndex) =>
    orderedImages.filter((_, imgIndex) => imgIndex % columns === colIndex)
  );

  return (
    <div className={`${styles.wrapper} ${styles.wrapper_light}`}>
      <div id="doer" className={`${styles.teacher} ${styles.doer} ${styles.component}`}>
        <h1>Doer</h1>
        <div className={styles.doer_wrapper}>
          <div className={styles.doer_col}>
            <h2>
              Driving meaningful impact through intuitive and joyful design
              experiences
            </h2>
            <p className={styles.teacher_introduction}>
              My designs have helped people manage physical pain, improve their
              financial well-being, achieve business goals, and even provide
              crucial support to war refugees.
            </p>
            <p className={styles.teacher_introduction}>
              Since 2018, I’ve been also managing designers and leading design
              teams in B2B companies.
            </p>
            <div className={` ${styles.btn} ${styles.btn_book} ${styles.btn_doer}`}>
              <a
                href="https://www.linkedin.com/in/vadimgrin/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={linkedIn} alt="LinkedIn icon" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
          <div className={styles.teamLead}>
            {columnedImages.map((column, colIndex) => (
              <div key={colIndex} className={styles.teamLead_col}>
                {column.map((img, imgIndex) => (
                  <div key={imgIndex} className={img.className || ''}>
                    <Image src={img.src} alt={img.alt} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doer;
