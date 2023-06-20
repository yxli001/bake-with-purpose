import React from "react";

import styles from "./MeetTheTeam.module.css";
import Padding from "../Padding/Padding";

type Props = {};

const MeetTheTeam: React.FC<Props> = (props: Props) => {
  return (
    <Padding>
      <div className={styles.container}>Meet The Team</div>
    </Padding>
  );
};

export default MeetTheTeam;
