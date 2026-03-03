import React from 'react'
import clsx from 'clsx';
import { Tooltip } from 'react-tooltip'
import styles from './styles.module.css';

export type DocumentItem = {
  title: string | JSX.Element;
  subtitle: string | JSX.Element;
  imageUrl: string;
  imageAlt: string;
  description: string;
  linkText: string;
  linkUrl: string;
};

export function Document({ title, subtitle, imageUrl, imageAlt, description, linkText, linkUrl }: DocumentItem) {
  return (
    <div className={clsx('col col--6', styles.docCol)}>
      <div className={styles.docCard}>
        <div className={styles.docCardImageWrap}>
          <img src={imageUrl} alt={imageAlt} className={styles.docImage} />
        </div>
        <div className={styles.docCardBody}>
          <h3 className={styles.docTitle}>{title}</h3>
          <p
            className={styles.docSubtitle}
            data-tooltip-id="doc-tooltip"
            data-tooltip-content={description}
          >
            {subtitle}
          </p>
          <Tooltip id="doc-tooltip" style={{ backgroundColor: "var(--ifm-color-primary-lightest)", color: "black", width: "65vw" }} />
        </div>
        <div className={styles.docCardFooter}>
          <a href={linkUrl} target="_blank" className={styles.docDownloadBtn}>
            {linkText} ↓
          </a>
        </div>
      </div>
    </div>
  );
}
