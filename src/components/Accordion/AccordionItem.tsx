import React from 'react'
import styles from './AccordionItem.module.css'

export default function AccordionItem({ title, content }: { title: string, content: string | JSX.Element }) {
  return (
    <details className={styles.item}>
      <summary className={styles.summary}>
        <span>{title}</span>
        <span className={styles.indicator}>+</span>
      </summary>
      <div className={styles.content}>
        <p>{content}</p>
      </div>
    </details>
  )
}
