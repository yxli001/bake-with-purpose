"use client";

import React, { HTMLAttributes, useEffect, useState } from "react";

import Padding from "../Padding/Padding";
import SectionTitle from "../SectionTitle/SectionTitle";
import styles from "./MeetTheTeam.module.css";
import { Member } from "@/types/types";
import MemberCard from "./MemberCard";

interface Props extends HTMLAttributes<HTMLDivElement> {}

const fetchMembers = async () => {
    const res = await fetch(`/api/members`);

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.json();
};

const MeetTheTeam = ({ ...props }: Props) => {
    const [members, setMembers] = useState<Member[]>([]);

    useEffect(() => {
        fetchMembers().then((data) => {
            setMembers(data);
        });
    }, []);

    return (
        <Padding {...props} className={styles.meetTheTeam}>
            <SectionTitle title="Meet The Team" />
            <div className={styles.cards}>
                {members.map((member) => (
                    <MemberCard member={member} key={member.id} />
                ))}
            </div>
        </Padding>
    );
};

export default MeetTheTeam;
