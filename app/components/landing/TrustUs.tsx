"use client";

import { useIntl } from "react-intl";
import styles from "./Landing.module.css";

const TrustUs = () => {
  const intl = useIntl();

  const trustLabel = intl.formatMessage({ id: "app.trust.mainLabel" });
  const trustTitle = intl.formatMessage({ id: "app.trust.title" });
  const trustPoints = [
    intl.formatMessage({ id: "app.trust.trustPoint1" }),
    intl.formatMessage({ id: "app.trust.trustPoint2" }),
    intl.formatMessage({ id: "app.trust.trustPoint3" }),
    intl.formatMessage({ id: "app.trust.trustPoint4" }),
  ];

  return (
    <section className={styles.trustSection}>
      <div className={styles.trustPattern}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 0 L100 100 M100 0 L0 100" stroke="white" strokeWidth="0.1" />
        </svg>
      </div>

      <div className={styles.trustInner}>
        <div className={styles.trustContent}>
          <h3 className={styles.trustLabel}>
            {trustLabel}
          </h3>
          <h4 className={styles.trustTitle}>
            {trustTitle}
          </h4>
          <ul className={styles.trustList}>
            {trustPoints.map((text, idx) => (
              <li key={idx} className={styles.trustListItem}>
                <svg className={styles.trustCheck} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
                {text}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.trustBadgeWrap}>
          <div className={styles.trustBadgeInner}>
            <svg className={styles.trustShield} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className={styles.trustVerified}>{intl.formatMessage({ id: "app.trust.verifiedSecure" })}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustUs;