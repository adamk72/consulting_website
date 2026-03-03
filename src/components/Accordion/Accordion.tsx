import React from 'react'
import AccordionItem from './AccordionItem'
import styles from './Accordion.module.css'

export default function Accordion({ list }: { list: { title: string, content: string | JSX.Element }[] }) {
  return (
    <div className={styles.accordionGroup}>
      {list.map((item, index) => (
        <AccordionItem key={index} title={item.title} content={item.content} />
      ))}
    </div>
  )
}
