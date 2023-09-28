"use client";

import React, { use, useEffect, useState } from "react";

import styles from "./StatsEditor.module.css";
import Spinner from "@/components/Spinner/Spinner";
import { Stat } from "@/types/types";

import app from "@/firebase/config";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
    onSnapshot,
    orderBy,
    query,
} from "firebase/firestore";
import Modal from "@/components/Modal/Modal";

const db = getFirestore(app);
const StatsEditor = () => {
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [stats, setStats] = useState<Stat[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [inputWarning, setInputWarning] = useState<string>("");
    const [item, setItem] = useState<string>("");
    const [count, setCount] = useState<Number | null>(null);

    const resetForm = () => {
        if (uploading || loading) return;
        setShowModal(false);
        setItem("");
        setCount(null);
        setInputWarning("");
    };

    const getStats = async () => {
        setLoading(true);
        try {
            const statsRef = collection(db, "stats");
            const q = query(statsRef, orderBy("item"));
            const querySnapshot = await getDocs(q);

            setStats(
                querySnapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        item: doc.data().item,
                        count: doc.data().count,
                    } as Stat;
                })
            );

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const gotImages: Stat[] = [];
                querySnapshot.forEach((doc) => {
                    gotImages.push({
                        id: doc.id,
                        item: doc.data().item,
                        count: doc.data().count,
                    } as Stat);
                });
                setStats(gotImages);
            });
        } catch (e) {
            console.log(e);
        }

        setLoading(false);
    };

    const deleteStat = async (id: string) => {
        if (uploading || loading) return;
        if (!window.confirm("Delete stat?")) return;
        setLoading(true);

        try {
            const statRef = doc(db, "stats", id);
            await deleteDoc(statRef);
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    };

    const submitStat = async () => {
        if (uploading || loading) return;
        if (!item || item == "" || count == null || count == 0) {
            setInputWarning("Please fill out all fields.");
            return;
        }

        setUploading(true);
        try {
            const statsRef = collection(db, "stats");
            await addDoc(statsRef, {
                item: item.toLowerCase(),
                count: count,
            });

            resetForm();
        } catch (e) {
            console.log(e);
        }
        setUploading(false);
    };

    useEffect(() => {
        getStats();
    }, []);

    return (
        <div className={styles.statsEditor}>
            <Modal showModal={showModal} onCloseModal={resetForm}>
                <div className={styles.modal}>
                    <div className={styles.modalTitle}>Add Stat</div>
                    <div className={styles.modalContent}>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                id="item"
                                placeholder="Item"
                                className={styles.input}
                                value={item}
                                onChange={(e) => setItem(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <input
                                type="number"
                                id="count"
                                placeholder="Count"
                                className={styles.input}
                                value={count?.toString()}
                                onChange={(e) =>
                                    setCount(Number(e.target.value))
                                }
                            />
                        </div>
                        {inputWarning != "" && (
                            <div className={styles.inputWarning}>
                                {inputWarning}
                            </div>
                        )}
                        <div className={styles.buttonContainer}>
                            <button
                                className={`${styles.button} ${styles.cancel}`}
                                onClick={resetForm}
                            >
                                Cancel
                            </button>
                            <button
                                className={`${styles.button} ${styles.save}`}
                                onClick={submitStat}
                            >
                                {uploading ? (
                                    <Spinner color="white" size={15} />
                                ) : (
                                    "Save"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
            <div className={styles.title}>Stats</div>
            {loading ? (
                <Spinner />
            ) : (
                <div className={styles.stats}>
                    {stats.map((stat) => (
                        <div className={styles.stat} key={stat.id}>
                            <div className={styles.statContent}>
                                {stat.item[0].toUpperCase() +
                                    stat.item.substring(1, stat.item.length)}
                                : {stat.count}
                            </div>
                            <div className={styles.statButtons}>
                                <button
                                    className={` ${styles.button} ${styles.edit}`}
                                >
                                    Edit
                                </button>
                                <button
                                    className={` ${styles.button} ${styles.delete}`}
                                    onClick={() => deleteStat(stat.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                        className={`${styles.add} ${styles.button}`}
                        onClick={() => setShowModal(true)}
                    >
                        Add Stat
                    </button>
                </div>
            )}
        </div>
    );
};

export default StatsEditor;
