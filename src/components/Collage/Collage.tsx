import styles from "./Collage.module.css";

const Collage = () => {
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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
                return (
                    <div
                        key={`Image ${i}`}
                        style={{
                            backgroundImage: `url(/collage/${i}.jpeg)`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                        className={`${styles[`img${i}`]} ${styles.img}`}
                    ></div>
                );
            })}
        </div>
    );
};

export default Collage;
