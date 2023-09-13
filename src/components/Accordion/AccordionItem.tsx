import React from 'react'

export default function AccordionItem({ title, content }: { title: string, content: string | JSX.Element }) {
  return (
    <div className="collapse collapse-plus bg-base-200">
      {/* @ts-ignore */}
      <input type="radio" name="accordion-item" />
      <div className="collapse-title text-xl font-medium">
        {title}
      </div>
      <div className="collapse-content">
        <p>{content}</p>
      </div>
    </div>
  )
}
