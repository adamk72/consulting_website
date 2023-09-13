import React from 'react';
import styles from './styles.module.css';
import FeatureList from '@site/src/content/features'
import { Feature } from './features';
import DocumentList from '@site/src/content/documents'
import { Document } from './documents';
import Section from '../Section';
import Accordion from '../Accordion/Accordion';
import projects from '../../content/projects'


export default function HomepageFeatures(): JSX.Element {
  return (
    <div className={styles.features}>
      <Section title="Long Form Papers" description="In any project, I take copious notes of my observations and lessons learned, especially from retrospectives. I'm in the process of sharing these lessons through various articles and of course, these papers. They are free to download, no email required. Free free to share!">
        {DocumentList.map((props, idx) => (
          <Document key={idx} {...props} />
        ))}</Section>
      <Section title="Business Perspectives">
        {FeatureList.map((props, idx) => (
          <Feature key={idx} {...props} />
        ))}
      </Section>
      <Section title="Notable Projects">
        <Accordion list={projects}></Accordion>
      </Section>
    </div>
  );
}
