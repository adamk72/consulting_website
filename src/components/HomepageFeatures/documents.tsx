import React from 'react'
import clsx from 'clsx';
import { Tooltip } from 'react-tooltip'

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
    <div className={clsx('col')}>
      <div className={clsx('flex flex-row items-center gap-8')}>
        <img src={imageUrl} alt={imageAlt} height={75} width={75} />
        <div className='flex flex-col '>
          <h2>{title}</h2>
          <p data-tooltip-id="my-tooltip" data-tooltip-content={description}>{subtitle}</p>
          <Tooltip id="my-tooltip" style={{ backgroundColor: "var(--ifm-color-primary-lightest)", color: "black", width: "65vw" }} />
          <h1><a target="_blank" href={linkUrl}>{linkText}</a>&nbsp;🔗</h1>
        </div>
      </div>
    </div>
  );
}
