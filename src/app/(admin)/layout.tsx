"use client";

import { AuthContextProvider } from "@/context/AuthContext";
import { Open_Sans } from "next/font/google";

import "../globals.css";
import "./layout.css";

const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["700", "400", "300", "500", "600", "800"],
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`${openSans.className} admin`}
                suppressHydrationWarning={true}
            >
                <AuthContextProvider>{children}</AuthContextProvider>
            </body>
        </html>
    );
}
