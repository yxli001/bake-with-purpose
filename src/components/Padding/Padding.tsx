import { FC } from "react";

import styles from "./Padding.module.css";

interface PaddingProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

const Padding: FC<PaddingProps> = ({ children, ...attributes }) => {
    return (
        <div className={styles.padding} {...attributes}>
            {children}
        </div>
    );
};

export default Padding;
