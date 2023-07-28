import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["700"],
});

export const metadata = {
    title: "Bake with Purpose",
    description: "",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const links = [
        {
            name: "Events",
            url: "/#events",
        },
        {
            name: "Team",
            url: "/#team",
        },
    ];

    return (
        <html lang="en">
            <body
                className={cormorant.className}
                suppressHydrationWarning={true}
            >
                <div className="container">
                    <Navbar
                        logo={{
                            imgSrc: "/logo_v2.png",
                            title: "Bake With Purpose",
                            textSrc: "/logo-text.jpeg",
                        }}
                        links={links}
                    />
                    <div className="children">{children}</div>
                </div>
            </body>
        </html>
    );
}
