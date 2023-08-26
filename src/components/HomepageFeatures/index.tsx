import React from 'react';
import styles from './styles.module.css';
import FeatureList from '@site/src/content/features'
import { Feature } from './features';
import DocumentList from '@site/src/content/documents'
import { Document } from './documents';


export default function HomepageFeatures(): JSX.Element {
  return (
    <div className={styles.features}>

      <section >
        <div className="container">

          <h1>My Long Form Papers</h1>
          <div className="row">
            {DocumentList.map((props, idx) => (
              <Document key={idx} {...props} />
            ))}
          </div>
        </div>

      </section>
      <section>
        <div className="container">
          <h1>My Business Perspectives</h1>
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
