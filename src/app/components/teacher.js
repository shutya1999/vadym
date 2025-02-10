"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "@/app/page.module.css";
import callIcon from "/public/images/callIcon.svg";
import writeIcon from "/public/images/writeIcon.svg";
import btnLeft from "/public/images/btnLeft.svg";
import btnRight from "/public/images/btnRight.svg";

const reviews = [
  {
    name: "Nana Muratova",
    role: "Product Designer | UI/UX Designer",
    date: "May 17, 2024",
    body: [
      "I had a mentorship session with Vadym Grin, and it was an incredibly inspiring experience. Vadym's attentiveness, insightful feedback, and willingness to address all my questions were invaluable in my growth as a designer.",
      "His guidance helped me create a clear plan and set achievable goals. Vadym is not just a professional, but a born mentor in the field of design...",
    ],
  },
  {
    name: "Myroslava Ohorodnikova",
    role: "Senior UX Consultant",
    date: "November 18, 2024",
    body: [
      "I had the pleasure of attending Vadym's course on Product Design and later participated in a mentorship session with him to refine my design skills and discuss my career path.",
      "Both experiences were incredibly insightful and rewarding. During our mentorship session, Vadym provided numerous helpful tips tailored to my goals and it was clear that his guidance came from deep experience.",
    ],
  },
  {
    name: "Vira Mikulina",
    role: "UI/UX Designer",
    date: "March 14, 2024",
    body: [
      "I had a mentorship session with Vadym, and he also taught me during the UI mobile design course. Both experiences were highly enjoyable for me.",
      "Vadym was attentive and empathetic, providing clear and concise answers to all my questions. Despite the limited time, he helped me achieve excellent results.",
    ],
  },
  {
    name: "Maksym Ostapenko",
    role: "Product Designer",
    date: "January 17, 2024",
    body: [
      "My mentorship sessions with Vadym exceeded all my expectations! His wealth of experience was evident from the start, and he expertly guided me through the discussion.",
      "His insights were invaluable, and I gained a lot of useful information and perspectives. I would highly recommend Vadym as a design mentor, and a design leader.",
    ],
  },
  {
    name: "Kristina Vigovskaya",
    role: "Lead Product Designer",
    date: "January 17, 2024",
    body: [
      "I found my session with Vadym to be very informative and insightful!",
      "From first minutes of our session I already felt how experienced Vadym is. He guided me really well. I would highly recommend him as a design mentor. I will definitely set up another call with him in the future!",
    ],
  },
];

export default function Teacher() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };
  const handleNext = () => {
    if (currentIndex < reviews.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };
  const isPreviousDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex === reviews.length - 1;

  return (
    <div className={`${styles.wrapper} ${styles.wrapper_light}`}>
      <div id="teacher" className={`${styles.teacher} ${styles.component}`}>
        <h1>Teacher</h1>
        <div className={styles.teacher_columns}>
          <div className={styles.teacher_col1}>
            <h2>
              Encouraging designers to keep pushing and making a meaningful
              difference
            </h2>
            <p className={styles.teacher_introduction}>
              My true passion lies in mentoring fellow professionals and
              offering guidance to help them grow and succeed. Reach out if
              you’d like me to support your journey.
            </p>
            <div className={styles.teacher_cta}>
              <div className={`${styles.btn} ${styles.cta_btn}`}>
                <a href="https://calendly.com/vadimgrin/meeting-with-vadym" target="_blank">
                  <Image src={callIcon} alt="headphones with microphone" />
                  <span>Book a call</span>
                </a>
              </div>
              <div className={`${styles.btn} ${styles.cta_btn}`}>
                <a href="mailto:vadim.grin@gmail.com">
                  <Image src={writeIcon} alt="paper airplane" />
                  <span>Message me</span>
                </a>
              </div>
            </div>
          </div>
          <div className={styles.slider}>
            <div className={styles.slider_header}>
              <div className={styles.slider_header1}>
                <button
                  className={`${styles.slider_btnNav} ${styles.slider_btnLeft}`}
                  onClick={handlePrevious}
                  disabled={isPreviousDisabled}
                >
                  <Image src={btnLeft} alt="left button" />
                </button>
                <div className={styles.slider_profile}>
                  <h3 className={styles.slider_name}>
                    {reviews[currentIndex].name}
                  </h3>
                  <p className={styles.slider_role}>
                    {reviews[currentIndex].role}
                  </p>
                  <p className={styles.slider_date}>
                    {reviews[currentIndex].date}
                  </p>
                </div>
              </div>
              <button
                className={`${styles.slider_btnNav} ${styles.slider_btnRight}`}
                onClick={handleNext}
                disabled={isNextDisabled}
              >
                <Image src={btnRight} alt="right button" />
              </button>
            </div>
            <div className={styles.slider_body}>
              {reviews[currentIndex].body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
