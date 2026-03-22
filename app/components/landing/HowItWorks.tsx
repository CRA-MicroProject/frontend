"use client";

import { useIntl } from "react-intl";
import styles from "./Landing.module.css";

const HowItWorks = () => {
const intl = useIntl();

    return (
      <section className={styles.howSection}>
        <div className={styles.howTitleWrap}>
          <h3 className={styles.howLabel}>
            {intl.formatMessage({ id: "app.howItWorks.label" })}
          </h3>
        </div>

        <div className={styles.howGrid}>
          {[
            {
              step: '01',
              title: intl.formatMessage({ id: "app.howItWorks.step1.title" }),
              desc: intl.formatMessage({ id: "app.howItWorks.step1.desc" }),
              icon: '🌍'
            },
            {
              step: '02',
              title: intl.formatMessage({ id: "app.howItWorks.step2.title" }),
              desc: intl.formatMessage({ id: "app.howItWorks.step2.desc" }),
              icon: '🔍'
            },
            {
              step: '03',
              title: intl.formatMessage({ id: "app.howItWorks.step3.title" }),
              desc: intl.formatMessage({ id: "app.howItWorks.step3.desc" }),
              icon: '💡'
            }
          ].map((item, idx) => (
            <div key={idx} className={styles.howCard}>
              <span className={styles.howStep}>
                {item.step}
              </span>
              <div className={styles.howEmoji}>{item.icon}</div>
              <h5 className={styles.howCardTitle}>
                {item.title}
              </h5>
              <p className={styles.howCardDesc}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    );
};

export default HowItWorks;