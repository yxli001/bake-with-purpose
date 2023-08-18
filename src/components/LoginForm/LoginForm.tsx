"use client";

import React, { useState } from "react";
import signIn from "@/firebase/signin";

import styles from "./LoginForm.module.css";

import { FaLock } from "react-icons/fa";
import LoadingPage from "../LoadingPage/LoadingPage";

const LoginForm = () => {
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const isEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const login = async () => {
        setLoading(true);

        const { error } = await signIn(email, password);

        if (error) {
            switch (error.code) {
                case "auth/invalid-email":
                    setMessage("Please enter a valid email.");
                    break;
                case "auth/user-not-found":
                    setMessage("User with that email doesn't exist.");
                    break;
                case "auth/wrong-password":
                    setMessage("Wrong password.");
                    break;
                default:
                    setMessage("An unknown error has occurred.");
                    console.log(error);
            }
        }

        setLoading(false);
    };

    const validate = () => {
        if (!email || email.trim().length == 0 || !isEmail(email)) {
            setMessage("Please enter a valid email.");
            return false;
        }

        if (!password || password.trim().length < 6) {
            setMessage("Password has to be greater than 6 characters.");
            return false;
        }

        return true;
    };

    const submit = () => {
        if (loading) return;

        if (validate()) {
            login();
        }
    };

    const form = (
        <div className={styles.formPage}>
            <div className={styles.form}>
                <div className={styles.formHeader}>
                    <FaLock className={styles.icon} size={35} color="white" />
                    <h1 className={styles.title}>ADMIN</h1>
                </div>
                <div className={styles.formBody}>
                    {message && message !== "" && (
                        <p className={styles.message}>{message}</p>
                    )}
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
                </div>
            </div>
        </div>
    );

    return <>{!loading ? form : <LoadingPage />}</>;
};

export default LoginForm;
