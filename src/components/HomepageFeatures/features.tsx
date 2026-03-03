import React from 'react'
import clsx from 'clsx';
import styles from './styles.module.css';

export type FeatureItem = {
  title: string;
  imageUrl: string;
  description: JSX.Element;
};

export function Feature({ title, imageUrl, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4', styles.featureCol)}>
      <div className={styles.card}>
        <div className={styles.cardImageWrap}>
          <img src={imageUrl} alt={title} className={styles.featureImg} />
        </div>
        <div className={styles.cardBody}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardDesc}>{description}</p>
        </div>
      </div>
    </div>
  );
}
