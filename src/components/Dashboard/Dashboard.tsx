import React from "react";
import logout from "@/firebase/logout";

import { FaSignOutAlt } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";

import styles from "./Dashboard.module.css";
import Link from "next/link";
import CollageEditor from "./CollegeEditor/CollageEditor";
import Image from "next/image";
import StatsEditor from "./StatsEditor/StatsEditor";

const Dashboard = () => {
    return (
        <div className={styles.dashboard}>
            <div className={styles.sidebar}>
                <Link className={styles.sidebarLink} href="/">
                    <Image
                        src="/logo_v2_dark_mode.png"
                        width={50}
                        height={50}
                        alt="Bake with purpose logo"
                    />
                </Link>
                <Link className={styles.sidebarLink} href="/admin">
                    <AiFillDashboard size={45} color="white" />
                </Link>
                <div className={styles.sidebarLink} onClick={logout}>
                    <FaSignOutAlt size={45} color="white" />
                </div>
            </div>
            <div className={styles.main}>
                <CollageEditor />
                <StatsEditor />
            </div>
        </div>
    );
};

export default Dashboard;
