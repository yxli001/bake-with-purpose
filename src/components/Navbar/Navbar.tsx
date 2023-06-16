"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Alex_Brush } from "next/font/google";
import Hamburger from "./Hamburger";
import useWindowDimensions from "@/utils/dimensions";

import styles from "./Navbar.module.css";
import Button from "../Button/Button";

const alexBrush = Alex_Brush({ weight: "400", subsets: ["latin"] });

interface NavbarProps {
    logo: {
        imgSrc: string;
        title: string;
    };
    links: {
        name: string;
        url: string;
    }[];
    buttons: {
        text: string;
        backgroundColor: string;
        color: string;
    }[];
}

const Navbar: FC<NavbarProps> = ({ logo, links, buttons }) => {
    const router = useRouter();
    const { width, height } = useWindowDimensions();
    const [expanded, setExpanded] = useState<Boolean>(false);

    return (
        <div className={styles.navbar}>
            <Link className={styles.logo} href="/">
                <Image
                    src={logo.imgSrc}
                    alt={logo.title}
                    width={50}
                    height={50}
                />
                {width > 450 && (
                    <h1
                        className={`${styles.logoTitle} ${alexBrush.className}`}
                    >
                        {logo.title}
                    </h1>
                )}
            </Link>
            {width > 700 ? (
                <div className={styles.right}>
                    <div className={styles.links}>
                        {links.map((link) => {
                            return (
                                <div className="link" key={link.name}>
                                    <Link
                                        href={link.url}
                                        className={styles.link}
                                    >
                                        {link.name}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.buttons}>
                        {buttons.map((button) => {
                            return (
                                <Button
                                    key={button.text}
                                    style={{
                                        backgroundColor: button.backgroundColor,
                                        color: button.color,
                                        fontSize: "1rem",
                                    }}
                                    onClick={() => router.push("/signup")}
                                >
                                    {button.text}
                                </Button>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <Hamburger
                    className={styles.burgerMenu}
                    onClick={() => {
                        setExpanded(!expanded);
                    }}
                    expanded={expanded}
                />
            )}
            {expanded && width < 700 && (
                <>
                    <div className={styles.expanded}>
                        <div className={styles.expandedLinks}>
                            {links.map((link) => {
                                return (
                                    <div key={link.name}>
                                        <Link
                                            href={link.url}
                                            className={styles.link}
                                        >
                                            {link.name}
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                        <div className={styles.expandedButtons}>
                            {buttons.map((button) => {
                                return (
                                    <Button
                                        key={button.text}
                                        style={{
                                            backgroundColor:
                                                button.backgroundColor,
                                            color: button.color,
                                            fontSize: "0.8rem",
                                            padding: "0.8rem 1rem",
                                        }}
                                        onClick={() => router.push("/signup")}
                                    >
                                        {button.text}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Navbar;
