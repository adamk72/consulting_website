import React from 'react'
import { DocumentItem } from '../components/HomepageFeatures/documents';

export const documents: DocumentItem[] = [
    {
        title: <>Improve Your Communications <em>and</em> Operations!</>,
        subtitle: 'Change your perspective on business operations through the lens of Slack and instant messaging. Free!',
        imageUrl: 'img/Slack-mark-RGB.png',
        imageAlt: 'Slack logo',
        description: (
            <>
                In this paper, I explore not just the best practices of using business instant messaging tools in a professional and effective way, but also in a manner that will improve both your organization's communication skills and its overall operations. Collaborate better!
            </>
        ),
        linkText: "Truly Professional Instant Messaging",
        linkUrl: "Truly Professional Instant Messaging (with Slack!).pdf",
    },
    {
        title: <>The Curse of Copy-and-Paste Code</>,
        subtitle: 'How a non-technical person can influence how software is developed, improve code quality, and get to know their software team a little bit better',
        imageUrl: 'img/curse.png',
        imageAlt: 'voodoo doll icon',
        description: (
            <>
                Written for the non-technical or non-developer project stakeholder, this paper goes over a dark code practice that you can actually do something about, no coding required.
            </>
        ),
        linkText: "The Curse of Copy and Paste Code",
        linkUrl: "The Curse of Copy and Paste Code.pdf",
    },
];

export default documents;