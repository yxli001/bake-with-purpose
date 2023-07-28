"use client";
import React, { HTMLAttributes } from "react";
import { useEffect, useState } from "react";

import styles from "./Events.module.css";
import { Event } from "@/types/types";
import Image from "next/image";
import Padding from "@/components/Padding/Padding";
import SectionTitle from "../SectionTitle/SectionTitle";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const fetchEvents = async () => {
    const res = await fetch(`/api/events`);

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
};

export default function Events({ ...props }: Props) {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        fetchEvents().then((data) => {
            setEvents(data);
        });
    }, []);

    return (
        <div className={styles.eventsPage} {...props}>
            <Padding>
                <SectionTitle title="Events" />
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
