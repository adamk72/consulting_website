import React from 'react'
import clsx from 'clsx';
import styles from './styles.module.css';

export type DocumentItem = {
  title: string | JSX.Element;
  subtitle: string | JSX.Element;
  imageUrl: string;
  imageAlt: string;
  description: JSX.Element;
  linkText: string;
  linkUrl: string;
};

export function Document({ title, subtitle, imageUrl, imageAlt, description, linkText, linkUrl }: DocumentItem) {
  return (
    <div className={clsx('flex flex-row items-center gap-8')}>
      <img src={imageUrl} alt={imageAlt} height={75} width={75} />
      <div className='flex flex-col items-center text-center'>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <p className='text-justify'>{description}</p>

        <h1><a target="_blank" href={linkUrl}>{linkText}</a>&nbsp;🔗</h1>
      </div>
    </div>
  );
}
