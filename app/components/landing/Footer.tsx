"use client";

import { useIntl } from "react-intl";
import styles from "./Landing.module.css";

const Footer = () =>{
const intl = useIntl();

    return (
       <footer className={styles.footer}>
        <p className={styles.footerText}>
          {intl.formatMessage({ id: "app.footer.project" })} &copy; 2026
        </p>
      </footer>
    );
};

export default Footer;