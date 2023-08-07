"use client";

import React from "react";
import DropdownLinks from "./DropdownLinks/DropdownLinks";

import styles from "./Footer.module.css";

const Footer = () => {
    const navigationLinks = [
        {
            name: "Home",
            to: "/",
        },
        {
            name: "Events",
            to: "/#events",
        },
        {
            name: "Meet the team",
            to: "/#team",
        },
    ];

    return (
        <div className={styles.footer}>
            <div className={styles.info}>
                <div className={styles.title}>Bake With Purpose</div>
                <a
                    href="mailto:bakewithpurpose@gmail.com"
                    target="_blank"
                    className={styles.email}
                    rel="noreferrer"
                >
                    bakewithpurpose@gmail.com
                </a>
            </div>
            <DropdownLinks
                dropdownTitle="Navigate"
                links={navigationLinks}
                className={styles.navigate}
            />
            <div className={styles.copyright}>
                &copy; 2023 Bake With purpose
            </div>
        </div>
    );
};

export default Footer;
