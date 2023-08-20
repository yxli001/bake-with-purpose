import React from "react";
import logout from "@/firebase/logout";

import { FaSignOutAlt } from "react-icons/fa";
import { AiFillDashboard } from "react-icons/ai";

import styles from "./Dashboard.module.css";
import Link from "next/link";
import CollageEditor from "./CollegeEditor/CollageEditor";

const Dashboard = () => {
    return (
        <div className={styles.dashboard}>
            <div className={styles.sidebar}>
                <Link className={styles.sidebarLink} href="/admin">
                    <AiFillDashboard size={45} color="white" />
                </Link>
                <div className={styles.sidebarLink} onClick={logout}>
                    <FaSignOutAlt size={45} color="white" />
                </div>
            </div>
            <div className={styles.main}>
                <CollageEditor />
            </div>
        </div>
    );
};

export default Dashboard;
