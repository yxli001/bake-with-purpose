"use client";

import { useAuthContext } from "@/context/AuthContext";
import styles from "./page.module.css";
import Dashboard from "@/components/Dashboard/Dashboard";
import LoginForm from "@/components/LoginForm/LoginForm";

export default function Admin() {
    const isAuthed = useAuthContext();

    return (
        <div className={styles.admin}>
            {isAuthed ? <Dashboard /> : <LoginForm />}
        </div>
    );
}
