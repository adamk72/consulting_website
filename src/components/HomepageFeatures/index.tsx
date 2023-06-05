import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import FeatureList from '@site/src/content/features'

type FeatureItem = {
  title: string;
  imageUrl: string;
  description: JSX.Element;
};


function Feature({ title, imageUrl, description }: FeatureItem) {
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

export default function HomepageFeatures(): JSX.Element {
  return (
    <div className={styles.features}>
      <section >
        <div className="container">
          <h1>Improve Your Communications <em>and</em> Operations!</h1>
          <div className="row">
            <div className="flex flex-row items-center gap-8">
              <img src="img/Slack-mark-RGB.png" alt="Slack logo" height={75} width={75} />
              <div className='flex flex-col items-center text-center'>
                <h2>Change your perspective on business operations through the lens of Slack and instant messaging. Free!</h2>
                <p className='text-justify'>In about 20 pages, this PDF encapsulates 25 years worth of my perspectives about business communications, through the lens of Slack. In it, I explore not just the best practices of using business instant messaging tools in a professional and effective way, but also in a manner that will improve both your organization's communication skills and its overall operations. Collaborate better!</p>
                <p className='text-justify'>It's completely free; "free" as in I'm <em>not</em> even asking for your e-mail! I just want to share a different way of thinking where communications and operations unite, so my only ask is if you find it useful to you, even a little, please share with others!</p>
                <h1><a target="_blank" href="Truly Professional Instant Messaging (with Slack!).pdf">Truly Professional Instant Messaging (with Slack!)</a>&nbsp;🔗</h1>
              </div>
            </div>
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
