import { FC } from "react";

import styles from "./Button.module.css";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const Button: FC<ButtonProps> = ({ className, children, ...attributes }) => {
    return (
        <button className={`${styles.button} ${className}`} {...attributes}>
            {children}
        </button>
    );
};

export default Button;
