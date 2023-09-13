import React from 'react'
import AccordionItem from './AccordionItem'

export default function Accordion({ list }: { list: { title: string, content: string | JSX.Element}[] }) {
  return (
    <>
      {list.map((item, index) => <AccordionItem title={item.title} content={item.content} ></AccordionItem>)}
    </>
  )
}
