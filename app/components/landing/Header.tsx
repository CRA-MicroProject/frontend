"use client";

import {
     ShieldCheck, Globe, ChevronDown
} from 'lucide-react';
import {  useEffect, useRef, useState } from 'react';
import { useIntl } from "react-intl";
import { useLanguage } from "../../hooks/languageContext";
import type { Language } from "../../hooks/languageContext";
import { LANDING_LANGUAGES, renderLanguageFlag, useLandingLanguageLabels } from "../../scripts/useLandingLanguageMeta";
import styles from "./Landing.module.css";

const Header = () => {

    const langMenuRef = useRef<HTMLDivElement>(null);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const { language, setLanguage } = useLanguage();
    const intl = useIntl();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
                setIsLangMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    const languageLabels = useLandingLanguageLabels();

    const changeLanguage = (selectedLanguage: Language) => {
        setLanguage(selectedLanguage);
        setIsLangMenuOpen(false);
    };


    const LanguageSelector = () => (
        <div className={styles.langMenuRoot} ref={langMenuRef}>
            <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className={styles.langMenuButton}
            >
                <div className={styles.langGlobeWrap}>
                    <Globe className={styles.langGlobeIcon} />
                </div>
                <span className={styles.langMenuFlag}>{renderLanguageFlag(language, styles.flagSmall)}</span>
                <ChevronDown className={`${styles.langChevron} ${isLangMenuOpen ? styles.langChevronOpen : ''}`} />
            </button>

            {isLangMenuOpen && (
                <div className={styles.langDropdown}>
                    {LANDING_LANGUAGES.map((l) => (
                        <button
                            key={l}
                            onClick={() => changeLanguage(l)}
                            className={`${styles.langOption} ${language === l ? styles.langOptionActive : styles.langOptionInactive}`}
                        >
                            <span>{renderLanguageFlag(l, styles.flagMedium)}</span>
                            {languageLabels[l]}
                            {language === l && <div className={styles.langOptionDot} />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <nav className={styles.headerNav}>
            <div className={styles.brand}>
                <div className={styles.brandIcon}>
                    <ShieldCheck className={styles.brandIconSvg} />
                </div>
                <span className={styles.brandText}>TaxDecoder</span>
            </div>
            <div className={styles.headerActions}>
                <LanguageSelector />
                <button
                    className={styles.headerCta}
                >
                    {intl.formatMessage({ id: "app.header.navBtn" })}
                </button>
            </div>
        </nav>
    );
};

export default Header;  