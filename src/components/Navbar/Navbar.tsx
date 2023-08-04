"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import Hamburger from "./Hamburger";
import useWindowDimensions from "@/utils/dimensions";

import styles from "./Navbar.module.css";
import Button from "../Button/Button";

interface NavbarProps {
    logo: {
        imgSrc: string;
        textSrc: string;
        title: string;
    };
    links: {
        name: string;
        url: string;
    }[];
}

const Navbar: FC<NavbarProps> = ({ logo, links }) => {
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
                    <Image
                        className={`${styles.logoTitle}`}
                        src={logo.textSrc}
                        alt={logo.title}
                        width={300}
                        height={50}
                    />
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
                        <Button
                            key={"Sign Up"}
                            style={{
                                backgroundColor: "#FF96D6",
                                color: "#f6e3f2",
                                fontSize: "1rem",
                            }}
                            onClick={() => {
                                const section =
                                    document.querySelector("#apply");
                                section!.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                });
                            }}
                        >
                            Sign Up
                        </Button>
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
                                            scroll={false}
                                        >
                                            {link.name}
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                        <div className={styles.expandedButtons}>
                            <Button
                                key={"Sign Up"}
                                style={{
                                    backgroundColor: "#FF96D6",
                                    color: "#f6e3f2",
                                    fontSize: "1rem",
                                }}
                                onClick={() => {
                                    window.open(
                                        "https://docs.google.com/forms/d/e/1FAIpQLScHtUpyyQpJxrCg0eRrCcuMSgq_qED6O-QlJFGrBCJH8FUCfg/viewform",
                                        "_blank",
                                        "noreferrer"
                                    );
                                }}
                            >
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Navbar;
