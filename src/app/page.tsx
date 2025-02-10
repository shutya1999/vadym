"use client"
import React, { useRef } from "react";
import styles from "./page.module.css"
import Header from "./components/header"
import Intro from "./components/intro"
import Teacher from "./components/teacher"
import Writer from "./components/writer"
import Doer from "./components/doer"
import Footer from "./components/footer"
import { useResponsiveLayout } from "../app/respHook"

export default function Home() {
    const containerRef = useRef(null);
    useResponsiveLayout(containerRef);
    
    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.main}>
                <Intro />
                <Teacher />
                <Writer />
                <Doer />
            </main>
            <Footer />
        </div>
    );
}
