import React, { useState } from "react";
import Link from "next/link";
import useWindowDimensions from "@/utils/dimensions";

import styles from "./DropdownLinks.module.css";

type LinkType = {
    name: string;
    to: string;
};

type Props = {
    dropdownTitle: string;
    links: Array<LinkType>;
    className?: string;
};

const DropdownLinks: React.FC<Props> = ({
    dropdownTitle,
    links,
    className,
}: Props) => {
    const { width } = useWindowDimensions();
    const [displayLinks, setDisplayLinks] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const expand = () => {
        setDisplayLinks(!displayLinks);
        setExpanded(!expanded);
    };

    return (
        <div className={`${styles.container} ${className}`}>
            <div className={styles.secondaryTitle} onClick={expand}>
                <div>{dropdownTitle}</div>
                <div className={styles.expand}>{!expanded ? "+" : "-"}</div>
            </div>
            {(width > 700 || displayLinks) && (
                <div className={styles.links}>
                    {links.map((link, index) => {
                        return (
                            <Link
                                key={index}
                                className={styles.link}
                                href={link.to}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default DropdownLinks;
