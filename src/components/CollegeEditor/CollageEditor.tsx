"use client";

import React, { useEffect, useState } from "react";
import app from "@/firebase/config";
import {
    getFirestore,
    collection,
    getDocs,
    query,
    addDoc,
    onSnapshot,
    doc,
    deleteDoc,
} from "firebase/firestore";
import {
    getStorage,
    ref,
    getDownloadURL,
    uploadBytes,
    deleteObject,
} from "firebase/storage";
import type { Image } from "@/types/types";
import Compressor from "compressorjs";

import styles from "./CollageEditor.module.css";
import ImageComponent from "next/image";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useFilePicker } from "use-file-picker";
import Spinner from "@/components/Spinner/Spinner";
import { dataURLtoFile } from "@/utils/utils";
import Modal from "@/components/Modal/Modal";

const db = getFirestore(app);
const storage = getStorage(app);
const CollageEditor = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [uploading, setUploading] = useState<boolean>(false);
    const [images, setImages] = useState<Image[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [descriptionInput, setDescriptionInput] = useState<string>("");
    const [warning, setWarning] = useState<string>("");
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
                        compressedSrc: doc.data().compressedSrc,
                    } as Image;
                })
            );

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const gotImages: Image[] = [];
                querySnapshot.forEach((doc) => {
                    gotImages.push({
                        id: doc.id,
                        src: doc.data().src,
                        description: doc.data().description,
                        fileName: doc.data().fileName,
                        compressedSrc: doc.data().compressedSrc,
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
        setWarning("");
        setOpenModal(false);
    };

    const saveImage = async () => {
        setWarning("");
        if (uploading) return;

        if (descriptionInput.length === 0)
            return setWarning("Please enter a description");

        setUploading(true);
        try {
            const lastDotIndex = filesContent[0].name.lastIndexOf(".");
            const fileName =
                filesContent[0].name.substring(0, lastDotIndex) +
                "_" +
                Date.now().toString();
            const file = dataURLtoFile(
                filesContent[0].content,
                fileName + "_full"
            );

            new Compressor(file, {
                quality: 0.8,
                width: 400,
                height: 400 * (9 / 16),
                resize: "cover",
                success: async (compressedFile) => {
                    const compressedRef = ref(
                        storage,
                        `slider/${fileName}_compressed`
                    );
                    const compressedSnapshot = await uploadBytes(
                        compressedRef,
                        compressedFile
                    );

                    const fullRef = ref(storage, `slider/${fileName}_full`);
                    const fullSnapshot = await uploadBytes(fullRef, file);

                    const compressedUrl = await getDownloadURL(
                        compressedSnapshot.ref
                    );
                    const fullUrl = await getDownloadURL(fullSnapshot.ref);

                    const sliderRef = collection(db, "slider");

                    await addDoc(sliderRef, {
                        src: fullUrl,
                        compressedSrc: compressedUrl,
                        description: descriptionInput,
                        fileName: fileName,
                    });

                    setUploading(false);
                    reset();
                },
            });
        } catch (e) {
            setUploading(false);
            reset();
            console.log(e);
        }
    };

    const deleteImage = async (image: Image) => {
        if (uploading) return;
        if (!window.confirm("Delete this image?")) return;
        setImages(images.filter((img) => img.id !== image.id));

        try {
            const imageRef = doc(db, "slider", image.id);
            const compressedRef = ref(
                storage,
                `slider/${image.fileName}_compressed`
            );
            const fullRef = ref(storage, `slider/${image.fileName}_full`);
            await deleteDoc(imageRef);
            await deleteObject(compressedRef);
            await deleteObject(fullRef);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={styles.collageEditor}>
            <div className={styles.title}>Image slider</div>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <div className={styles.pickers}>
                        <div
                            className={styles.imagePicker}
                            onClick={openFileSelector}
                        >
                            <FaPlus size={25} />
                        </div>
                        {images &&
                            images.map((image) => (
                                <div
                                    className={styles.imageContainer}
                                    key={image.src}
                                >
                                    <ImageComponent
                                        className={styles.image}
                                        src={image.compressedSrc}
                                        alt={image.description}
                                        priority={true}
                                        fill
                                    />
                                    <FaTrash
                                        className={styles.deleteButton}
                                        onClick={() => {
                                            deleteImage(image);
                                        }}
                                        size={30}
                                    />
                                </div>
                            ))}
                    </div>
                    <Modal
                        onCloseModal={reset}
                        showModal={openModal && filesContent[0] !== null}
                        className={styles.modal}
                    >
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
                                    priority={true}
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
                            <div className={styles.warning}>{warning}</div>
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
                                        <Spinner color="white" size={15} />
                                    ) : (
                                        "Save"
                                    )}
                                </button>
                            </div>
                        </div>
                    </Modal>
                </>
            )}
        </div>
    );
};

export default CollageEditor;
