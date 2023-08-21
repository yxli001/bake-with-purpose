"use client";

import React, { useEffect, useState } from "react";

import styles from "./StatsEditor.module.css";
import Spinner from "@/components/Spinner/Spinner";
import { Stat } from "@/types/types";

import app from "@/firebase/config";
import {
    collection,
    getDocs,
    getFirestore,
    orderBy,
    query,
} from "firebase/firestore";

const db = getFirestore(app);
const StatsEditor = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<Stat[]>([]);

    const getStats = async () => {
        setLoading(true);
        const statsRef = collection(db, "stats");
        const q = query(statsRef, orderBy("item", "desc"));
        const snapshot = await getDocs(q);
        const stats: Stat[] = [];
        snapshot.forEach((doc) => {
            stats.push({
                id: doc.id,
                item: doc.data().item,
                count: doc.data().count,
            } as Stat);
        });
        setStats(stats);
        setLoading(false);
    };

    useEffect(() => {
        getStats();
    }, []);

    return (
        <div className={styles.statsEditor}>
            <div className={styles.title}>Stats</div>
            {loading ? (
                <Spinner />
            ) : (
                <div className={styles.stats}>
                    {stats.map((stat) => (
                        <div className={styles.stat}>
                            <div>
                                {stat.item}: {stat.count}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StatsEditor;
