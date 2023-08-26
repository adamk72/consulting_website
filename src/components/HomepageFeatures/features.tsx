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
      <div className={clsx('col col--4')}>
        <div className="text--center">
          <img src={imageUrl} className={styles.featureImg} />
        </div>
        <div className="text--center padding-horiz--md">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    );
  }
