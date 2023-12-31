import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Cormorant_Garamond } from "next/font/google";

import "../globals.css";

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
                            imgSrc: "/logo_v2_light_mode.png",
                            title: "Bake With Purpose",
                            textSrc: "/logo-text.jpeg",
                        }}
                        links={links}
                    />
                    <div className="children">{children}</div>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
