import type { Metadata } from "next";
import "@/app/admin/admin.css";

export const metadata: Metadata = {
    title: "Login",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-lt-installed="true">
            <body>        
                {children}
            </body>
        </html>
    );
}
