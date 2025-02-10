
import "./globals.css";
import styles from "./page.module.css"

export default function NotFound() {
    return (
        <html>
            <body>
                <div className={styles['not-found']}>
                    <h1>
                        404 - Page Not Found
                    </h1>
                </div>
            </body>
        </html>
    )
}