import { FC } from "react";

import styles from "./StatsBanner.module.css";

interface StatsBannerProps {
    stats: {
        cakes: number;
        cookies: number;
        cupcakes: number;
    };
}

const StatsBanner: FC<StatsBannerProps> = ({ stats }) => {
    return (
        <div className={styles.banner}>
            <div className={styles.title}>{"We've baked"}</div>
            <div className={styles.stats}>
                <div className={styles.stat}>
                    {stats.cakes} <div className={styles.statWord}>Cakes</div>
                </div>
                <div className={styles.stat}>
                    {stats.cookies}
                    <div className={styles.statWord}>Cookies</div>
                </div>
                <div className={styles.stat}>
                    {stats.cupcakes}
                    <div className={styles.statWord}>Cupcakes</div>
                </div>
            </div>
        </div>
    );
};

export default StatsBanner;
