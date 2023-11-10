import React from "react";
import Spinner from "../Spinner/Spinner";

import styles from "./LoadingPage.module.css";

const LoadingPage = () => {
    return (
        <div className={styles.page}>
            <div className={styles.loading}>
                <Spinner size={50} color="#ff96d6" />
            </div>
        </div>
    );
};

export default LoadingPage;
