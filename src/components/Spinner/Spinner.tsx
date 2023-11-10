import React from "react";
import { FaCircleNotch } from "react-icons/fa";

import styles from "./Spinner.module.css";

type Props = {
    size?: number;
    color?: string;
};

const Spinner = ({ size, color }: Props) => {
    return (
        <FaCircleNotch
            size={size ?? 30}
            color={color ?? "black"}
            className={styles.spinner}
        />
    );
};

export default Spinner;
