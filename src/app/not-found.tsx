
import "./globals.css";
import styles from "./page.module.css"

export default function NotFound() {
    return (
        <div className={styles['not-found']}>
            <h1>
                404 - Page Not Found
            </h1>
        </div>
    )
}