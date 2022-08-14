import React from 'react'

const services = [
    {
        title: 'The X-Life Cycle Assessment',
        imageUrl: 'img/process.png',
        description: (
            <>
                Despite the myriad of best practices that are purported to provide the best results for a given lifecycle, the reality is that what works for one company doesn't always suffice for another.
                An organization's unique culture, history, and future plans can make a world of difference in how its product or project or manufacturing life cycles perform.
                {/* <ul>
                    <li>I once worked for a multi-million dollar manufacturing company that didn't know they didn't have a product lifecycle.</li>
                    <li>I once worked for company that saw room for improvement, but were concerned it would take too much money and time to change.</li>
                    <li>I once worked for a software company that spent two extra hours on each daily build cycle because of manual steps which could have been replaced by -- you guessed it -- software.</li>
                </ul> */}

            </>
        ),
    },
    {
        title: 'Software Development Analysis',
        imageUrl: 'img/software_data.png',
        description: (
            <>
                Even for technical founders, it's hard to see if your best laid plans are actually being implemented. Whether you've hired an internal team or outsourcing to a dev shop, you need to be confident that the software systems -- both in-house and for release to the general public -- are sound, secure, and scalable.
            </>
        ),
    },
    {
        title: 'Information Architecture Evaluation',
        imageUrl: 'img/ia.png',
        description: (
            <>
                Practicing good Information Architecture can give a company a strong foundation to grow. IA touches everything, from product development, to customer service, to leadership. It creates a consistent language and by which you and your employees can organize their great ideas, collaborate more readily, and provide better services to your clients and customers.
            </>
        ),
    },
];

export default services;