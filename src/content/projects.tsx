import React from 'react'
export const projects: { title: string, content: string | JSX.Element; }[] = [
  {
    title: 'Defense Contractor Logistics Planning Application',
    content: <>A last minute five week engagement, I managed a small, high-preforming team to develop a prototype website and backend running on GCP that served a complex mathematical modeling system for managing logistics for the US military. 
    <br/>
    <br/>
    Technologies included:
    <ul>
      <li>TypeScript, Vue, NuxtJS</li>
      <li>Django, Postgres, Unity</li>
      <li>GitLab</li>
      <li>GitPod</li>
      <li>Google Cloud Run, Google Identity Aware Proxy</li>
    </ul>
    </>
  },
  {
    title: 'Area-52 Rust Education Website',
    content: <>Client sought an education website for teaching Rust and CosmWasm called <a href="https://area-52.io/" target="_blank">Area-52</a>🔗. As well as managing the overall project, I developed the bulk of the site in collaboration with the client's design and product teams. I also wrote the first set of lessons, "Starting with CosmWasm." Three month engagement with some follow-ups afterwards for minor updates and managing the creation of a second CosmWasm course.
    <br/>
    <br/>
    Technologies included:
    <ul>
      <li>TypeScript, React, NextJS, Monaco</li>
      <li>Rust, CosmWasm</li>
      <li>Strapi Headless CMS</li>
      <li>Jira</li>
      <li>GitHub</li>
      <li>Google App Engine, Postgres</li>
    </ul></>
  },
  {
    title: 'Refactor of Trust Verification Services Site',
    content: <>Client sought to modernize a nearly decade-old codebase from PHP to TypeScript and Python wit the desire to improve both performance and usability. I managed a small consulting team in collaboration with the client's product team. Done in phases, the project included a significant code evaluation and review of user expectations, followed by an update of the backend before UI changes started to occur. The infrastructure update alone greatly improved the performance of the site with a nominal amount of effort and impact. Six month engagement.
    <br/>
    <br/>
    Technologies included:
    <ul>
      <li>TypeScript, Vue</li>
      <li>Django, PHP</li>
      <li>Jira</li>
      <li>GitHub</li>
      <li>GCP, Postgres</li>
    </ul></>
  },
  {
    title: 'Knowledge Management Assessment',
    content: "I was asked to provide insight into best practices for a small consulting company seeking to optimize internal communications sharing of various details such as engineering, legal, onboarding, and other HR policies. For their needs and current infrastructure, we went with full utilizing the GSuite and GitLab services, concentrating their efforts and costs in a short technology stack."
  },
  {
    title: 'Art Marketplace',
    content: <>Client sought a full feature marketplace to promote anime-inspired artists. Features included primary and secondary sales functionality as well as profiles, comments, likes, and other social media features. Six month engagement.
    <br/>
    <br/>
    Technologies included:
    <ul>
      <li>TypeScript, React</li>
      <li>NodeJS, TypeORM</li>
      <li>Jira</li>
      <li>GitHub</li>
      <li>GCP, Postgres</li>
    </ul></>
  },
  {
    title: 'Umee DeFi Lending Website',
    content: <>Initial architect and project manger for <a href="https://umee.cc/" target="_blank">Umee</a>🔗. Client needed to ramp up quickly and sought our services for developing the initial logic and user interface for their new DeFi service. Provided a flexible, customizable platform for them to work from; transferred code base over to client once they had in-house capacity.
    <br/>
    <br/>
    Technologies included:
    <ul>
      <li>TypeScript, React</li>
      <li>NodeJS</li>
      <li>Jira</li>
      <li>GitHub</li>
      <li>GCP, Postgres</li>
    </ul></>
  },
];

export default projects;