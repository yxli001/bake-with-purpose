"use client";

import styles from "./Qualifications.module.css";
import Button from "../Button/Button";
import Padding from "../Padding/Padding";

const Qualifications = () => {
  return (
    <Padding style={{ backgroundColor: "#ff96d6" }}>
      <div className={styles.container}>
        <h2 className={styles.title}>Qualifications of Applicants</h2>
        <ul className={styles.qualifications}>
          <li className={styles.qualification}>
            Follow rules and willing to participate in at least one
            meeting/event per year
          </li>
          <li className={styles.qualification}>
            Members should be responsible, reliable, and willing to devote their
            time to supporting the community
          </li>
          <li className={styles.qualification}>
            Members must be at least 6th grade in the school year of application
          </li>
          <li className={styles.qualification}>
            Rights: Participation in events where members are able to improve
            baking and other skills and help out the community with their
            talents
          </li>
        </ul>
        <Button
          className={styles.signUp}
          onClick={() => {
            window.open(
              "https://docs.google.com/forms/d/e/1FAIpQLScHtUpyyQpJxrCg0eRrCcuMSgq_qED6O-QlJFGrBCJH8FUCfg/viewform",
              "_blank",
              "noreferrer"
            );
          }}
        >
          Sign Up
        </Button>
      </div>
    </Padding>
  );
};

export default Qualifications;
