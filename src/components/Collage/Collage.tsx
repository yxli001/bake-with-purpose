import styles from "./Collage.module.css";

import ImageCycler from "./ImageCycler";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import app from "@/firebase/config";

const db = getFirestore(app);
const getImages = async () => {
    // const dir = fs.readdirSync("./public/collage");
    // return dir.map((file) => `/collage/${file}`);
    try {
        const sliderRef = collection(db, "slider");
        const sliderSnapshot = await getDocs(sliderRef);

        return sliderSnapshot.docs.map((doc) => doc.data().src);
    } catch (error) {
        console.log(error);
    }

    return [];
};

const Collage = async () => {
    const images = await getImages();

    return (
        <div className={styles.collage}>
            <div className={styles.center}>
                <p>
                    Bake with Purpose is a{" "}
                    <span className={styles.highlight}>
                        student-run organization
                    </span>{" "}
                    that brings together those who are passionate about{" "}
                    <span className={styles.highlight}>baking</span> and who are
                    looking to{" "}
                    <span className={styles.highlight}>
                        help others in their community
                    </span>{" "}
                    with their skills. Bake with Purpose allows members to use
                    and improve their skills to help those in need while also
                    having fun and learning more about themselves and others.
                </p>
            </div>
            <ImageCycler images={images} className={styles.img} />
        </div>
    );
};

export default Collage;
