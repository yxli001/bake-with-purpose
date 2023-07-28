import React from "react";

import styles from "./SectionTitle.module.css";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
    title: string;
}

const SectionTitle = ({ title, ...props }: Props) => {
    return (
        <h2 className={styles.title} {...props}>
            {title}
        </h2>
    );
};

export default SectionTitle;
