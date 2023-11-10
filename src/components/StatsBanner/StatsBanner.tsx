import { FC } from "react";

import {
    collection,
    getDocs,
    getFirestore,
    orderBy,
    query,
} from "firebase/firestore";
import app from "@/firebase/config";
import { Stat } from "@/types/types";

import styles from "./StatsBanner.module.css";

const db = getFirestore(app);

interface StatsBannerProps {
    stats: {
        cakes: number;
        cookies: number;
        cupcakes: number;
    };
}

const getStats = async () => {
    try {
        const statsRef = collection(db, "stats");
        const q = query(statsRef, orderBy("item"));
        const statsSnapshot = await getDocs(q);

        return statsSnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() } as Stat;
        });
    } catch (error) {}
};

const StatsBanner: FC<StatsBannerProps> = async () => {
    const stats = await getStats();

    return (
        <div className={styles.banner}>
            <div className={styles.title}>{"We've baked"}</div>
            <div className={styles.stats}>
                {stats?.map((stat) => {
                    return (
                        <div className={styles.stat} key={stat.item}>
                            {stat.count}
                            <div className={styles.statWord}>
                                {stat.item.charAt(0).toUpperCase() +
                                    stat.item.slice(1)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StatsBanner;
