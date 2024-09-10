---
title: Using Jira
authors: akecskes
tags: [pm-tools, project management, engineering]
---

Jira is a powerful and highly customizable software project management tool. Because of its popularity and long-time presence in the industry, there is a myriad of add-on and integrations to the platform, including Slack and GitHub.

# Best Practices

<h3>Make it easy for your co-workers NOT to have to ask you questions.</h3>

<!--truncate-->

## 👍 General Practices

1. You should never be talking about work without also being able to refer to a Jira issue number.
2. Think of Jira as a journal. In each issue, record all the details you can think of. While it's best to plan ahead, it's just as valid as to update a Jira issue on the fly or before you transition it or assign it to another person.
3. Do not leave an issue in an ambiguous state. Go with the workflow. Tell others what your current state is by transitioning the issue.
4. Always provide enough information on an ongoing basis to let your peers and managers what your current status is.
5. Anticipate questions and answer them in advance in the issue.
6. Add comments, screenshots, and document and web links like crazy.
7. Use @mentions vigorously.


## ⚠️ What _doesn't_ need to go in Jira

If you're developer, pretty much everything you do needs to be recorded in Jira. If you're working, you're working on a Jira issue, not some abstracted thought.

However, there are plenty of things that don't need to be recorded as Jira issues. You may refer to these items within an existing Jira issue, but you don't need to create a unique issue for them:

** Jira is _not_:**

- A glorified to-do list.
- A reminder system
- A calendar
- A time-tracking system (though it does track the time it takes you to accomplish your tasks)

So these are the types of things you don't need to put into Jira:

- Tasks as reminders for meetings - Use a calendar or the /remind feature of Slack.
- Tasks to write documentation - instead, make a note that a task isn't complete until documentation is finished (or create a sub-task).
- Generalized thoughts about what you might want to do. If it isn't distinctly part of the project, don't add it to Jira.

# Issue Types

## ☑️ Tasks & Sub-tasks

Task-type issues should be atomic and single purpose. In terms of code, a task should be able to be made with a single commit, usually.

- Task summaries should be actionable.
  - Use imperative, present tense language: ("Change", not "Changed" or "Changes to").
  - Write the take with what is expected to happen, not the object that is to be worked on. For example, "Change background color to blue," (good) versus, "Background color blue" (bad). The latter "task" doesn't tell anyone what is supposed to happen. Is the background currently blue? Then what do I do with it?
- Tasks should be binary, quantum, discrete, and/or atomic. They should not bleed over into other activities (though they may be dependent on other activities).
- It should be implicitly obvious why the task is needed. If it’s not clear (or you're not sure), rewrite the summary or add more details in the description.

### 🦆 The Task Duck

Regardless of the source (Slack, email, conference call, or casual conversation), if it sounds like a task, feels like a task, or acts like a task, then it must be a task. Once you recognize that in yourself or from someone else, create a Task, Story, or Bug in Jira and add details there. Immediately.

## 📖 User Stories

Stories do not describe a task or activity, they describe an expectation or desire. Story summaries should always be written from an actor's perspective and with a goal in mind:

- “As a [role] I’d like to/should be able to [activity] because [reason]”
- “[Role] should be able to [activity] because [reason]”

Stories may take multiple commits to complete and may touch multiple parts of the UI or code. Unlike with Tasks, a Story is not necessarily discrete or atomic. To work with stories, either create Sub-tasks within the Story work on or create full Tasks and link the two tasks together.

## 🐞 Bugs

When a bug is generated, the description field should contain enough information for the assignee to begin work. This includes, but is not limited to:

- How to replicate the bug.
- Under what conditions was the bug found? (e.g, which browser, OS, system, etc).
- What was expected to happen?

# Labels

Use labels as a way to categorize issues that share common features across all projects. For instance, `documentation` is a good label to use if the issue generated an artifact such as a report, status, or other written asset (make sure to add a web link in the issue as well).
