import { FC, MouseEventHandler } from "react";

import styles from "./Hamburger.module.css";

interface HamburgerProps {
    className?: string;
    color?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
    expanded: Boolean;
}

const Hamburger: FC<HamburgerProps> = ({
    className,
    color,
    onClick,
    expanded,
}) => {
    return (
        <div
            className={`${styles.hamburger} ${
                expanded ? styles.open : ""
            } ${className}`}
            onClick={onClick}
            style={{ color: color }}
        >
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
};

export default Hamburger;
