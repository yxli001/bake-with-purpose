import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import StatsBanner from "@/components/StatsBanner/StatsBanner";
import { Tinos } from "next/font/google";

const times = Tinos({ subsets: ["latin"], weight: ["400", "700"] });

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
            url: "/events",
        },
        {
            name: "Team",
            url: "/team",
        },
    ];

    const buttons = [
        {
            text: "Sign Up",
            backgroundColor: "#d88eb4",
            color: "#f6e3f2",
        },
    ];

    return (
        <html lang="en">
            <body className={times.className} suppressHydrationWarning={true}>
                <div className="container">
                    <StatsBanner
                        stats={{ cakes: 15, cookies: 80, cupcakes: 90 }}
                    />
                    <Navbar
                        logo={{
                            imgSrc: "/logo_v2.jpeg",
                            title: "Bake With Purpose",
                        }}
                        links={links}
                        buttons={buttons}
                    />
                    <div className="children">{children}</div>
                </div>
            </body>
        </html>
    );
}
