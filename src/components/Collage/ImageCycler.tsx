"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import styles from "./ImageCycler.module.css";

type Props = {
    images: string[];
    className?: string;
};

const ImageCycler = ({ images, className }: Props) => {
    const [image, setImage] = useState(0);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(true);
            setTimeout(() => {
                setImage((image) => (image + 1) % (images.length - 1));

                setTimeout(() => setFade(false), 1100);
            }, 250);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Image
            alt={images[image]}
            src={images[image]}
            fill
            className={`image ${className} ${fade ? styles.fadeOutIn : ""}`}
            priority
        />
    );
};

export default ImageCycler;
