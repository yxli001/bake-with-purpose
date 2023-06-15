import { FC } from "react";

import styles from "./Padding.module.css";

interface PaddingProps {
    children?: React.ReactNode;
}

const Padding: FC<PaddingProps> = ({ children }) => {
    return <div className={styles.padding}>{children}</div>;
};

export default Padding;
