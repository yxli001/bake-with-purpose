import { FC } from "react";

import styles from "./TitleBanner.module.css";

interface TitleBannerProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

const TitleBanner: FC<TitleBannerProps> = ({ children, ...attributes }) => {
    return (
        <div className={styles.banner} {...attributes}>
            {children}
        </div>
    );
};

export default TitleBanner;
