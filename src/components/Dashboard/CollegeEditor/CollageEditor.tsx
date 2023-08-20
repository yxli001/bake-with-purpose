"use client";

import React, { useEffect, useState } from "react";
import app from "@/firebase/config";
import {
    getFirestore,
    collection,
    getDocs,
    query,
    doc,
    addDoc,
    onSnapshot,
} from "firebase/firestore";
import {
    getStorage,
    ref,
    uploadString,
    getDownloadURL,
} from "firebase/storage";
import type { Image } from "@/types/types";

import styles from "./CollageEditor.module.css";
import ImageComponent from "next/image";
import { FaPlus, FaEdit } from "react-icons/fa";
import { useFilePicker } from "use-file-picker";
import Spinner from "@/components/Spinner/Spinner";

const db = getFirestore(app);
const storage = getStorage(app);
const CollageEditor = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [uploading, setUploading] = useState<boolean>(false);
    const [images, setImages] = useState<Image[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [descriptionInput, setDescriptionInput] = useState<string>("");
    const [openFileSelector, { filesContent }] = useFilePicker({
        readAs: "DataURL",
        accept: "image/*",
        multiple: false,
        onFilesSuccessfulySelected: (file) => {
            setOpenModal(true);
        },
    });

    useEffect(() => {
        getImages();
    }, []);

    const getImages = async () => {
        setLoading(true);
        try {
            const ref = collection(db, "slider");
            const q = query(ref);
            const querySnapshot = await getDocs(q);

            setImages(
                querySnapshot.docs.map((doc) => {
                    return {
                        src: doc.data().src,
                        description: doc.data().description,
                        fileName: doc.data().fileName,
                    } as Image;
                })
            );

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const gotImages: Image[] = [];
                querySnapshot.forEach((doc) => {
                    gotImages.push({
                        src: doc.data().src,
                        description: doc.data().description,
                    } as Image);
                });
                setImages(gotImages);
            });
        } catch (e) {
            console.log(e);
        }

        setLoading(false);
    };

    const reset = () => {
        if (uploading) return;
        setDescriptionInput("");
        setOpenModal(false);
    };

    const saveImage = async () => {
        if (uploading) return;
        setUploading(true);
        try {
            console.log(filesContent[0]);
            const lastDotIndex = filesContent[0].name.lastIndexOf(".");
            const fileName =
                filesContent[0].name.substring(0, lastDotIndex) +
                "_" +
                Date.now().toString();
            const imageRef = ref(storage, `slider/${fileName}`);
            const snapshot = await uploadString(
                imageRef,
                filesContent[0].content,
                "data_url"
            );

            const url = await getDownloadURL(snapshot.ref);
            const sliderRef = collection(db, "slider");

            await addDoc(sliderRef, {
                src: url,
                description: descriptionInput,
                fileName: fileName,
            });
        } catch (e) {
            console.log(e);
        }
        reset();
        setUploading(false);
        getImages();
    };

    return (
        <div className={styles.collageEditor}>
            <div className={styles.title}>Image slider</div>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <div className={styles.pickers}>
                        {images &&
                            images.map((image) => (
                                <div
                                    className={styles.imageContainer}
                                    key={image.src}
                                >
                                    <ImageComponent
                                        className={styles.image}
                                        src={image.src}
                                        alt={image.description}
                                        fill
                                    />
                                </div>
                            ))}
                        <div
                            className={styles.imagePicker}
                            onClick={openFileSelector}
                        >
                            <FaPlus size={25} />
                        </div>
                    </div>
                    {openModal && filesContent[0] !== null && (
                        <>
                            <div
                                className={styles.backdrop}
                                onClick={reset}
                            ></div>
                            <div className={styles.modal}>
                                {filesContent[0] && (
                                    <div
                                        className={styles.modalImageContainer}
                                        onClick={openFileSelector}
                                    >
                                        <ImageComponent
                                            src={filesContent[0].content}
                                            alt={filesContent[0].name}
                                            width={400}
                                            height={250}
                                            className={styles.modalImage}
                                        />
                                        <div className={styles.modalImageText}>
                                            <FaEdit size={20} />
                                            <div className={styles.text}>
                                                Change Selection
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className={styles.modalBody}>
                                    <input
                                        type="text"
                                        className={styles.descriptionInput}
                                        value={descriptionInput}
                                        placeholder="Set a description"
                                        onChange={(e) =>
                                            setDescriptionInput(e.target.value)
                                        }
                                        maxLength={30}
                                    />
                                    <div className={styles.modalButtons}>
                                        <button
                                            className={`${styles.button} ${styles.cancelButton}`}
                                            onClick={reset}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className={`${styles.button} ${styles.saveButton}`}
                                            onClick={saveImage}
                                        >
                                            {uploading ? (
                                                <Spinner
                                                    color="white"
                                                    size={15}
                                                />
                                            ) : (
                                                "Save"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default CollageEditor;
