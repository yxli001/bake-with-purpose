import { Member } from "@/types/types";
import React, { HTMLAttributes } from "react";

import styles from "./MemberCard.module.css";
import Image from "next/image";

interface Props extends HTMLAttributes<HTMLDivElement> {
    member: Member;
}

const MemberCard = ({ member, ...props }: Props) => {
    return (
        <div className={styles.card} {...props}>
            <Image
                className={styles.pfp}
                src={
                    member.pfp.src && member.pfp.src.trim() !== ""
                        ? member.pfp.src
                        : "/pfps/default.jpg"
                }
                alt={member.pfp.description}
                height={150}
                width={150}
            />
            <h3 className={styles.name}>{member.name}</h3>
            <div className={styles.roles}>
                {member.roles.map((role) => (
                    <div className={styles.role}>{role}</div>
                ))}
            </div>
        </div>
    );
};

export default MemberCard;
