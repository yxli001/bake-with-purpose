import TitleBanner from "@/components/TitleBanner/TitleBanner";

import styles from "./page.module.css";
import { Event } from "@/data/types";
import data from "@/data/events";
import Image from "next/image";
import Padding from "@/components/Padding/Padding";

export default async function Events() {
    const fetchEvents = async () => {
        const wait = new Promise<Event[]>((resolve, reject) => {
            setTimeout(() => {
                resolve(data);
            }, 200);
        });

        return await wait;
    };

    const events: Event[] = await fetchEvents();

    return (
        <div className={styles.eventsPage}>
            <TitleBanner>Events</TitleBanner>
            <Padding>
                <div className={styles.events}>
                    {events.map((event) => (
                        <div key={event.id} className={styles.event}>
                            <div className={styles.title}>
                                {event.name}{" "}
                                <span className={styles.frequency}>
                                    ({event.frequency})
                                </span>
                            </div>
                            <div className={styles.description}>
                                {event.description}
                            </div>
                            <div className={styles.images}>
                                {event.images.map((image) => (
                                    <div
                                        className={styles.image}
                                        key={image.src}
                                    >
                                        <Image
                                            fill
                                            src={image.src}
                                            style={{
                                                objectFit: "cover",
                                                borderRadius: "4px",
                                            }}
                                            alt={image.description}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Padding>
        </div>
    );
}
