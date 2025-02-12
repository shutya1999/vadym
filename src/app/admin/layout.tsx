import type { Metadata } from "next";
import { Providers } from "./components/Providers";
import Sidebar from "./components/Sidebar";
import "@/app/admin/admin.css";

export const metadata: Metadata = {
    title: "Admin",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" data-lt-installed="true">
            <body>
                <Providers>
                    <div className="flex h-screen">
                        
                        <Sidebar/>
                        <main className="flex-1 bg-gray-100 p-6 overflow-auto">
                            {children}
                        </main>
                    </div>
                </Providers>
            </body>
        </html>
    );
}
