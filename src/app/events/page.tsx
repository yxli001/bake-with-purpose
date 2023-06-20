import TitleBanner from "@/components/TitleBanner/TitleBanner";

import styles from "./page.module.css";
import { Event } from "@/types/types";
import Image from "next/image";
import Padding from "@/components/Padding/Padding";

export const metadata = {
  title: "Events - Bake With Purpose",
};

export default async function Events() {
  const fetchEvents = async () => {
    const res = await fetch("http://localhost:3000/api/events", {
      next: { revalidate: 10 },
    });

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    return res.json();
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
                <span className={styles.frequency}>({event.frequency})</span>
              </div>
              <div className={styles.description}>{event.description}</div>
              <div className={styles.images}>
                {event.images.map((image) => (
                  <div className={styles.image} key={image.src}>
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
