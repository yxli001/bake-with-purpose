import StatsBanner from "@/components/StatsBanner/StatsBanner";
import styles from "./page.module.css";
import Collage from "@/components/Collage/Collage";
import Qualifications from "@/components/Qualifications/Qualifications";
import MeetTheTeam from "@/components/MeetTheTeam/MeetTheTeam";
import Events from "@/components/Events/Events";

export default function Home() {
    return (
        <main className={styles.main}>
            <Collage />
            <StatsBanner stats={{ cakes: 15, cookies: 80, cupcakes: 90 }} />
            <MeetTheTeam id="team" />
            <Qualifications id="apply" />
            <Events id="events" />
        </main>
    );
}
