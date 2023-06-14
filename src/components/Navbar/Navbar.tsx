import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { Alex_Brush } from "next/font/google";

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
    return (
        <div className={styles.navbar}>
            <Link className={styles.logo} href="/">
                <Image
                    src={logo.imgSrc}
                    alt={logo.title}
                    width={50}
                    height={50}
                />
                <h1 className={`${styles.logoTitle} ${alexBrush.className}`}>
                    {logo.title}
                </h1>
            </Link>
            <div className={styles.right}>
                <div className={styles.links}>
                    {links.map((link) => {
                        return (
                            <div className="link" key={link.name}>
                                <Link href={link.url} className={styles.link}>
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
                            >
                                {button.text}
                            </Button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
