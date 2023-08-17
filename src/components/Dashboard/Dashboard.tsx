import React from "react";
import logout from "@/firebase/logout";

import styles from "./Dashboard.module.css";

type Props = {};

const Dashboard = (props: Props) => {
    return (
        <div className={styles.dashboard}>
            <button className={styles.logout} onClick={logout}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
