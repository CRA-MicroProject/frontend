"use client";

import {
    ArrowRight
} from 'lucide-react';
import { useRouter } from "next/navigation";
import { useIntl } from "react-intl";
import { useLanguage } from "../../hooks/languageContext";
import type { Language } from "../../hooks/languageContext";
import { renderLanguageFlag, useLandingLanguageLabels } from "../../scripts/useLandingLanguageMeta";
import styles from "./Landing.module.css";

const MainBanner = () => {

    const { language, setLanguage } = useLanguage();
    const router = useRouter();
    const intl = useIntl();

    const languageLabels = useLandingLanguageLabels();

    const heroText = intl.formatMessage({ id: "app.mainbanner.hero" });
    const heroParts = heroText.split(", ");
    const heroFirstLine = heroParts[0] ?? heroText;
    const heroSecondLine = heroParts.slice(1).join(", ");

    const LangBox = ({ lang, label }: { lang: Language, label: string }) => (
        <button
            onClick={() => setLanguage(lang)}
            className={`${styles.heroLangBox} ${language === lang ? styles.heroLangActive : styles.heroLangInactive}`}
        >
            <span>{renderLanguageFlag(lang, styles.heroFlag)}</span>
            <span className={`${styles.heroLangLabel} ${language === lang ? styles.heroLangLabelActive : styles.heroLangLabelInactive}`}>{label}</span>
            {language === lang && (
                <div className={styles.heroLangPulse}></div>
            )}
        </button>
    );

    return (

        <section className={styles.heroSection}>
            <div className={styles.heroGlow}></div>

            <span className={styles.heroBadge}>
                {intl.formatMessage({ id: "app.mainbanner.badge" })}
            </span>

            <h1 className={styles.heroTitle}>
                {heroFirstLine}{heroSecondLine ? "," : ""} <br />
                <span className={styles.heroHighlight}>
                    {heroSecondLine}
                </span>
            </h1>

            <p className={styles.heroSub}>
                {intl.formatMessage({ id: "app.mainbanner.sub" })}
            </p>

            {/* Language Boxes */}
            <div className={styles.heroLangGrid}>
                <LangBox lang="English" label={languageLabels.English} />
                <LangBox lang="Mongolian" label={languageLabels.Mongolian} />
                <LangBox lang="Portuguese" label={languageLabels.Portuguese} />
            </div>

            <div className={styles.heroCtaWrap}>
                <button
                    className={styles.heroCta}
                    onClick={() => router.push("/tax-terms")}
                >
                    {intl.formatMessage({ id: "app.mainbanner.startBtn" })}
                    <ArrowRight className={styles.heroCtaArrow} />
                </button>
            </div>
        </section>
    );
};

export default MainBanner;

