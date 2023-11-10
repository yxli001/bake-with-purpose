"use client";

import logout from "@/firebase/logout";
import { AuthContextProvider } from "@/context/AuthContext";
import { Open_Sans } from "next/font/google";

import "./layout.css";
import Link from "next/link";
import Image from "next/image";
import { AiFillDashboard } from "react-icons/ai";
import { BsFillCalendarEventFill } from "react-icons/bs";
import { FaSignOutAlt } from "react-icons/fa";

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
                className={`${openSans.className} admin-container`}
                suppressHydrationWarning={true}
            >
                <AuthContextProvider>
                    <div className="admin">
                        <div className="admin-sidebar">
                            <Link className="admin-sidebar-link" href="/">
                                <Image
                                    src="/logo_v2_dark_mode.png"
                                    width={50}
                                    height={50}
                                    alt="Bake with purpose logo"
                                />
                            </Link>
                            <Link className="admin-sidebar-link" href="/admin">
                                <AiFillDashboard size={45} color="white" />
                            </Link>
                            <Link
                                className="admin-sidebar-link"
                                href="/admin/events"
                            >
                                <BsFillCalendarEventFill
                                    size={38}
                                    color="white"
                                />
                            </Link>
                            <div
                                className="admin-sidebar-link"
                                onClick={logout}
                            >
                                <FaSignOutAlt size={45} color="white" />
                            </div>
                        </div>
                        <div className="admin-main">{children}</div>
                    </div>
                </AuthContextProvider>
            </body>
        </html>
    );
}
