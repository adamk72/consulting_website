import React, { ReactNode } from 'react'

export default function Section({ title, description, children}: {title: string, description?: string, children: ReactNode}) {
  return (
    <section style={{width: "100%"}}>
      <div className="container">
        <h1>{title}</h1>
        {description && <p>{description}</p>}
        <div className="row">
          {children}
        </div>
      </div>
    </section>
  )
}
