import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    showModal: boolean;
    onCloseModal: () => void;
    children: React.ReactNode;
}

import styles from "./Modal.module.css";

const Modal = ({
    showModal,
    children,
    onCloseModal,
    className,
    ...attributes
}: Props) => {
    return (
        <>
            {showModal && (
                <>
                    <div
                        className={styles.backdrop}
                        onClick={onCloseModal}
                    ></div>
                    <div
                        className={`${styles.modal} ${className}`}
                        {...attributes}
                    >
                        {children}
                    </div>
                </>
            )}
        </>
    );
};

export default Modal;
