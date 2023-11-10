"use client";

import { useAuthContext } from "@/context/AuthContext";
import styles from "./page.module.css";
import LoginForm from "@/components/LoginForm/LoginForm";
import EventsEditor from "@/components/EventsEditor/EventsEditor";

export default function Admin() {
    const isAuthed = useAuthContext();

    return (
        <div className={styles.admin}>
            {isAuthed ? <EventsEditor /> : <LoginForm />}
        </div>
    );
}
