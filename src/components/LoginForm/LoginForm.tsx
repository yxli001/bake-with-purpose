"use client";

import React, { useState } from "react";
import signIn from "@/firebase/signin";

import styles from "./LoginForm.module.css";
import Spinner from "../Spinner/Spinner";

type Props = {};

const LoginForm = (props: Props) => {
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const login = async () => {
        setLoading(true);

        const { result, error } = await signIn(email, password);
        console.log(result, error);

        setLoading(false);
    };

    const validate = () => {
        console.log("validated");

        return true;
    };

    const submit = () => {
        if (loading) return;

        if (validate()) {
            login();
        }
    };

    const form = (
        <div className={styles.form}>
            <input
                className={styles.input}
                type="text"
                placeholder="Email: "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key == "Enter") {
                        submit();
                    }
                }}
            />
            <input
                className={styles.input}
                type="password"
                placeholder="Password: "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key == "Enter") {
                        submit();
                    }
                }}
            />
            <button className={styles.login} onClick={submit}>
                Login
            </button>
            <p className={styles.message}>{message}</p>
        </div>
    );

    return <>{!loading ? form : <Spinner />}</>;
};

export default LoginForm;
