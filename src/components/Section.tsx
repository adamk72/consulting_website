import React, { ReactNode } from 'react'
import clsx from 'clsx'
import styles from './Section.module.css'

type SectionProps = {
  title: string
  description?: string
  tone?: 'alt'
  children: ReactNode
}

export default function Section({ title, description, tone, children }: SectionProps) {
  return (
    <section className={clsx(styles.section, tone === 'alt' && styles.sectionAlt)}>
      <div className="container">
        <h2 className={styles.sectionTitle}>{title}</h2>
        {description && <p className={styles.sectionDesc}>{description}</p>}
        <div className="row">
          {children}
        </div>
      </div>
    </section>
  )
}
