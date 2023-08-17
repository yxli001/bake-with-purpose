"use client";

import { AuthContextProvider } from "@/context/AuthContext";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["700"],
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={cormorant.className}
                suppressHydrationWarning={true}
            >
                <AuthContextProvider>{children}</AuthContextProvider>
            </body>
        </html>
    );
}
