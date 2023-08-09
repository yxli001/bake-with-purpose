import styles from "./Collage.module.css";

import fs from "fs";
import ImageCycler from "./ImageCycler";

const getImages = async () => {
    const dir = fs.readdirSync("./public/collage");

    return dir.map((file) => `/collage/${file}`);
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
