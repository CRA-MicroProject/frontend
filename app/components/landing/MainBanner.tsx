"use client";

import {
    ArrowRight
} from 'lucide-react';
import { useRouter } from "next/navigation";
import { useIntl } from "react-intl";
import { useSelectedLanguage } from "../../context/SelectedLanguageContext";
import {
    landingLanguageFromCode,
    selectedLanguageFromLanding,
    type LandingLanguage,
} from "../../scripts/landingLanguages";
import { renderLanguageFlag, useLandingLanguageLabels } from "../../scripts/useLandingLanguageMeta";
import styles from "./Landing.module.css";

type LangBoxProps = {
    lang: LandingLanguage;
    label: string;
    isActive: boolean;
    onSelect: (lang: LandingLanguage) => void;
};

function LangBox({ lang, label, isActive, onSelect }: LangBoxProps) {
    return (
        <button
            type="button"
            onClick={() => onSelect(lang)}
            className={`${styles.heroLangBox} ${isActive ? styles.heroLangActive : styles.heroLangInactive}`}
        >
            <span>{renderLanguageFlag(lang, styles.heroFlag)}</span>
            <span
                className={`${styles.heroLangLabel} ${isActive ? styles.heroLangLabelActive : styles.heroLangLabelInactive}`}
            >
                {label}
            </span>
            {isActive && <div className={styles.heroLangPulse}></div>}
        </button>
    );
}

const MainBanner = () => {

    const { selectedLanguage, setSelectedLanguage } = useSelectedLanguage();
    const language = landingLanguageFromCode(selectedLanguage?.code);
    const router = useRouter();
    const intl = useIntl();

    const languageLabels = useLandingLanguageLabels();

    const heroText = intl.formatMessage({ id: "app.mainbanner.hero" });
    const heroParts = heroText.split(", ");
    const heroFirstLine = heroParts[0] ?? heroText;
    const heroSecondLine = heroParts.slice(1).join(", ");

    const handleLangSelect = (lang: LandingLanguage) => {
        setSelectedLanguage(selectedLanguageFromLanding(lang));
    };

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
                <LangBox
                    lang="English"
                    label={languageLabels.English}
                    isActive={language === "English"}
                    onSelect={handleLangSelect}
                />
                <LangBox
                    lang="Mongolian"
                    label={languageLabels.Mongolian}
                    isActive={language === "Mongolian"}
                    onSelect={handleLangSelect}
                />
                <LangBox
                    lang="Portuguese"
                    label={languageLabels.Portuguese}
                    isActive={language === "Portuguese"}
                    onSelect={handleLangSelect}
                />
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

