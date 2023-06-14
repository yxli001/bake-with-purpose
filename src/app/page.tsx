import styles from "./page.module.css";
import Collage from "@/components/Collage/Collage";

export default function Home() {
    return (
        <main className={styles.main}>
            <Collage />
        </main>
    );
}
