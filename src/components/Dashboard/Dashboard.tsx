import React from "react";

import styles from "./Dashboard.module.css";
import CollageEditor from "../CollegeEditor/CollageEditor";
import StatsEditor from "../StatsEditor/StatsEditor";

const Dashboard = () => {
    return (
        <div className={styles.main}>
            <CollageEditor />
            <StatsEditor />
        </div>
    );
};

export default Dashboard;
