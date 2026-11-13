# Digital Library — Project Workflow

## 1. Purpose

This document defines how the Digital Library project is planned, designed, developed, tested, reviewed, released, and maintained.

It is the project's operational workflow and should be used as a reference by all project-related ChatGPT conversations and development activities.

The underlying development principles and methodology are maintained separately in the **AI Development Playbook** repository. The Digital Library project adopts the parts of that methodology that are relevant to its needs.

The objective is to establish a repeatable workflow in which:

- requirements are separated from implementation;
- important decisions are recorded and traceable;
- project work is managed independently from ChatGPT conversations;
- source code and project history are maintained in GitHub;
- implementation is performed through controlled development workflows;
- testing takes place before release;
- user data is protected;
- learnings are converted into improvements to the development methodology;
- the project remains understandable even when individual ChatGPT conversations are no longer available.

---

# 2. Project Configuration

This workflow is applied to the **Digital Library** project using the following project systems.

| Area | System | Project / Repository |
|---|---|---|
| Project management | Jira | **Digital-Library (`DL`)** |
| Source code | GitHub | **`myspace-a/Digital_Library`** |
| Stable project documentation | GitHub | **`myspace-a/Digital_Library`** |
| Production application | GitHub Pages | **`myspace-a.github.io/Digital_Library`** |
| Development methodology | GitHub | **`myspace-a/AI-Development-Playbook`** |

### 2.1 Jira

The Digital Library project is managed in the Jira project:

**Digital-Library (`DL`)**

Jira is used to manage:

- requirements;
- features;
- tasks;
- bugs;
- project decisions;
- priorities;
- status;
- relationships between work items.

Project decisions are recorded in Jira so that they remain traceable independently of ChatGPT conversations.

### 2.2 GitHub

The Digital Library source code and project documentation are maintained in:

**`myspace-a/Digital_Library`**

GitHub is used for:

- source code;
- branches;
- commits;
- pull requests;
- tags;
- releases;
- stable project documentation.

### 2.3 Production

The current production application is deployed through GitHub Pages:

**`https://myspace-a.github.io/Digital_Library/`**

The production environment is treated as the version used with real user data and is therefore subject to the project's data-protection and release principles.

### 2.4 AI Development Playbook

The reusable development methodology is maintained separately in:

**`myspace-a/AI-Development-Playbook`**

The Digital Library project adopts the relevant methodology from this repository.

Project-specific adaptations remain documented in this project's `PROJECT_WORKFLOW.md`.

The relationship is:

```text
AI Development Playbook
        │
        │ reusable methodology
        ▼
Digital Library PROJECT_WORKFLOW.md
        │
        │ project-specific application
        ▼
Digital Library Project
```

Changes to the general methodology should be made in the AI Development Playbook rather than directly treating a project-specific practice as a universal rule.

---

# 3. Core Workflow Principles

The project follows these principles.

## 3.1 Separate thinking from implementation

Requirements, architecture, design and decisions should be established before implementation whenever practical.

ChatGPT conversations are used for thinking, analysis, exploration, design and coaching.

Implementation is performed through the project's defined development tools and workflow.

## 3.2 Separate project management from conversations

ChatGPT conversations are working sessions, not the permanent project-management system.

Durable project information should be recorded in the appropriate project system.

In particular:

- Requirements → Jira and project documentation
- Decisions → Jira
- Bugs → Jira
- Tasks → Jira
- Source code → GitHub
- Releases → GitHub
- Stable technical documentation → GitHub
- Reasoning and exploration → ChatGPT
- Methodology and reusable development practices → AI Development Playbook

### 3.3 One source of truth for each type of information

Information should have a clear home.

| Information | Primary system |
|---|---|
| Requirements and backlog | Jira |
| Decisions | Jira |
| Tasks | Jira |
| Bugs | Jira |
| Source code | GitHub |
| Branches and commits | GitHub |
| Releases and tags | GitHub |
| Stable project documentation | GitHub |
| Architecture documentation | GitHub |
| Development methodology | AI Development Playbook |
| Working discussions | ChatGPT |
| Implementation | Development tool / coding agent |
| Test evidence | Project test records / Jira / GitHub, according to project needs |

A ChatGPT conversation should not become the only place where an important project decision exists.

## 3.4 Protect working software and user data

Changes must be introduced in a controlled manner.

Before risky changes:

1. identify the affected data and functionality;
2. establish a rollback or recovery strategy;
3. test using appropriate test data where possible;
4. verify the result before releasing.

For applications containing valuable user data, data preservation takes priority over convenience.

## 3.5 Keep development, testing and production distinct

The project must explicitly define how development, testing and production are separated.

The exact implementation depends on the project architecture, but the workflow must answer:

- Where is new code developed?
- Where is it tested?
- What represents production?
- How does code move between these environments?
- Which data is allowed in each environment?
- How is production data protected?

An identified gap in environment separation should become an explicit project decision rather than remaining only a learning.

---

# 4. Tools and Responsibilities

The project uses a combination of tools. Each tool has a defined purpose.

## 4.1 Jira

### Objective

Jira is the project's **project-management system of record**.

### Scope

Jira tracks:

- requirements;
- features;
- tasks;
- bugs;
- decisions;
- priorities;
- status;
- relationships between work items;
- release-related work.

Jira answers:

> **What are we doing, why are we doing it, and what is its current status?**

Jira does not replace GitHub as the source-code repository.

---

## 4.2 GitHub

### Objective

GitHub is the project's **source-code, version-control and stable documentation system**.

### Scope

GitHub contains:

- source code;
- branches;
- commits;
- pull requests;
- tags;
- releases;
- project documentation;
- architecture documentation;
- project workflow documentation;
- other stable project artifacts.

GitHub answers:

> **What has actually been built, how has it changed, and what is the released version?**

---

## 4.3 ChatGPT

### Objective

ChatGPT is the project's **thinking, coaching and analysis environment**.

### Scope

ChatGPT is used for:

- requirements analysis;
- product thinking;
- architecture discussions;
- UX/UI discussions;
- technical coaching;
- problem solving;
- decision analysis;
- review of implementation approaches;
- test planning;
- interpretation of errors;
- project-management coaching;
- retrospective analysis.

ChatGPT conversations are not considered the permanent system of record.

Important conclusions reached in ChatGPT should be transferred to Jira or GitHub as appropriate.

---

## 4.4 Coding Agent / Codex CLI

### Objective

The coding agent is used for **implementation and repository changes**.

### Scope

The coding agent may:

- inspect the repository;
- implement approved requirements;
- modify source files;
- create tests;
- run development checks;
- prepare commits or branches according to the project workflow.

The coding agent should not independently redefine product requirements or make significant architectural decisions without those decisions being reviewed.

---

## 4.5 AI Development Playbook

### Objective

The AI Development Playbook contains the **reusable methodology and lessons learned across projects**.

It should contain practices that are useful beyond one individual project.

Examples:

- AI-assisted development principles;
- project workflow patterns;
- chat organization;
- requirement management;
- decision management;
- AI coding-agent practices;
- testing practices;
- Git/GitHub practices;
- environment management;
- data protection practices;
- lessons learned from projects.

Project-specific decisions should remain in the individual project.

---

# 5. Information Flow

The project follows this general information flow:

```text
Idea / Problem / Learning
          │
          ▼
     Analysis
          │
          ├──────────────► Learning
          │                    │
          │                    ▼
          │              Methodology
          │                    │
          │                    ▼
          │          AI Development Playbook
          │
          ▼
   Requirement / Decision
          │
          ▼
        Jira
          │
          ▼
 Design / Architecture
          │
          ▼
   Implementation Plan
          │
          ▼
     Coding Agent
          │
          ▼
       GitHub
          │
          ▼
 Development Testing
          │
          ▼
      QA / Review
          │
          ├──► Bug ──► Jira ──► Fix
          │
          ▼
       Release
          │
          ▼
     Production
          │
          ▼
     Retrospective
          │
          ▼
       Learning
```

This creates a continuous improvement loop:

```text
Project → Learning → Methodology → Future Projects
```

---

# 6. Learning → Decision → Methodology

One of the most important principles of the workflow is distinguishing between a **learning**, a **project decision**, and a **methodology improvement**.

They are related but are not the same thing.

## 6.1 Learning

A learning is something discovered through experience.

Example:

> The project did not have a clearly defined distinction between development, test and production.

A learning does not automatically change the project.

---

## 6.2 Project Decision

A decision is a deliberate choice made as a consequence of analysis.

Example:

> R2 will explicitly define separate development, test and production environments.

The decision belongs to the project and should be recorded in Jira.

---

## 6.3 Methodology

A methodology improvement is a reusable principle that should apply to future projects.

Example:

> Every new software project should explicitly define its development, test and production environments during architecture planning.

This belongs in the AI Development Playbook.

---

## 6.4 Learning conversion schema

```text
Experience
    │
    ▼
Learning identified
    │
    ▼
Is a project change required?
    │
    ├── No ──► Record learning
    │
    └── Yes
          │
          ▼
     Decision required
          │
          ▼
     Decision discussion
          │
          ▼
     Decision recorded in Jira
          │
          ▼
     Project artifacts updated
          │
          ▼
Does this have value beyond this project?
          │
          ├── No ──► Project-specific knowledge
          │
          └── Yes
                │
                ▼
        Methodology improvement
                │
                ▼
       AI Development Playbook
```

This prevents a project-specific decision from automatically becoming a universal rule.

---

# 7. ChatGPT Conversation Structure

ChatGPT conversations should have clearly defined responsibilities.

A single large conversation should not become the permanent container for all project knowledge.

## 7.1 Project Coaching Chat

### Purpose

Provides overall project coaching and helps coordinate the development approach.

### Typical topics

- project workflow;
- methodology application;
- development practices;
- tool usage;
- project-management questions;
- interpretation of lessons learned;
- deciding which dedicated chat should handle a topic.

### Should not become

The permanent repository for detailed requirements, decisions or implementation discussions.

---

## 7.2 Requirements / Product Chat

### Purpose

Defines what the application should do.

### Typical topics

- product requirements;
- user needs;
- features;
- acceptance criteria;
- priorities;
- functional behaviour;
- product constraints.

### Output

Requirements that can be recorded in Jira and/or stable project documentation.

---

## 7.3 Decision Chat

### Purpose

Discusses one significant project decision.

Each major decision should preferably have its own dedicated conversation.

### Typical process

```text
Jira: Decision required
        │
        ▼
Dedicated Decision Chat
        │
        ▼
Context
        │
        ▼
Options
        │
        ▼
Analysis
        │
        ▼
Recommendation
        │
        ▼
Decision accepted
        │
        ▼
Jira updated
        │
        ▼
Project documentation updated if required
```

A Decision Chat should not become a general project discussion.

---

## 7.4 Architecture Chat

### Purpose

Discusses the technical structure of the application.

### Typical topics

- architecture;
- data model;
- components;
- APIs;
- storage;
- security;
- environments;
- integration;
- technical constraints;
- migration strategies.

The resulting architecture should be documented in GitHub where appropriate.

---

## 7.5 UI/UX Chat

### Purpose

Defines the user experience and visual behaviour.

### Typical topics

- navigation;
- screens;
- layouts;
- interaction patterns;
- accessibility;
- responsive behaviour;
- visual design;
- usability.

The UI/UX discussion should produce sufficiently clear requirements before implementation.

---

## 7.6 Build Chat

### Purpose

Controls implementation of a defined work package.

Preferably one Build Chat is used for one coherent feature or work package.

### Typical flow

```text
Approved Requirement
        │
        ▼
Build Chat
        │
        ▼
Implementation instructions
        │
        ▼
Coding Agent
        │
        ▼
Code changes
        │
        ▼
Tests
        │
        ▼
Review
        │
        ▼
GitHub
```

The Build Chat should not redefine unrelated requirements.

---

## 7.7 QA / Review Chat

### Purpose

Reviews implemented functionality independently from the implementation discussion.

### Typical topics

- test results;
- regression testing;
- acceptance criteria;
- bugs;
- edge cases;
- release readiness;
- code review observations.

Bugs discovered during QA should be recorded in Jira.

---

## 7.8 Learning / Retrospective Chat

### Purpose

Captures lessons from the development experience.

### Typical topics

- what worked;
- what failed;
- what was inefficient;
- mistakes;
- process improvements;
- AI-assisted development lessons;
- project-management lessons.

Relevant learnings are evaluated for conversion into:

- project decisions;
- project methodology;
- AI Development Playbook improvements.

---

# 8. Chat Lifecycle

A chat is a **working environment**, not a permanent knowledge repository.

At the end of a significant discussion:

1. Identify decisions made.
2. Identify requirements created or changed.
3. Identify open decisions.
4. Identify bugs or tasks.
5. Identify useful learnings.
6. Transfer durable information to the appropriate system.
7. Close or archive the conversation when appropriate.

The objective is that the project can continue even if a particular ChatGPT conversation is no longer available.

---

# 9. Requirements Workflow

Requirements should follow this lifecycle:

```text
Idea / User Need
      │
      ▼
Requirements Chat
      │
      ▼
Requirement defined
      │
      ▼
Jira
      │
      ▼
Prioritised
      │
      ▼
Architecture / UX analysis
      │
      ▼
Implementation
      │
      ▼
Testing
      │
      ▼
Accepted
      │
      ▼
Released
```

Requirements should include, where appropriate:

- description;
- business/user objective;
- scope;
- acceptance criteria;
- dependencies;
- priority;
- related decisions;
- related implementation work.

---

# 10. Decision Management

Important decisions should be explicitly recorded.

## 10.1 Decision definition

A decision records:

- what was decided;
- why it was needed;
- alternatives considered;
- rationale;
- consequences;
- related requirements or work.

## 10.2 Decision template

```text
Decision
What have we decided?

Context / Problem
Why did we need to make this decision?

Alternatives Considered
What alternatives were evaluated?

Rationale
Why was this option selected?

Consequences
What does this decision mean for the project?

Related Issues
Which Jira requirements, tasks, bugs or decisions are affected?
```

## 10.3 Decision lifecycle

```text
Decision identified
       │
       ▼
Jira issue created
       │
       ▼
Dedicated Decision Chat
       │
       ▼
Options analysed
       │
       ▼
Decision accepted
       │
       ▼
Jira updated
       │
       ▼
Documentation updated
       │
       ▼
Implementation / follow-up work
```

---

# 11. Bug Management

Bugs should be managed through Jira rather than maintained only in a static `KNOWN_BUGS.md` file.

Typical lifecycle:

```text
Bug discovered
      │
      ▼
Jira Bug
      │
      ▼
Triage
      │
      ▼
Open
      │
      ▼
In Progress
      │
      ▼
Fixed
      │
      ▼
Testing
      │
      ├── Failed ──► In Progress
      │
      ▼
Done
```

A bug should contain enough information to reproduce and verify the problem.

Where appropriate:

- expected behaviour;
- actual behaviour;
- reproduction steps;
- environment;
- severity;
- affected version;
- screenshots/logs;
- related requirement;
- fix;
- verification result.

---

# 12. Development Workflow

Development should follow a controlled lifecycle.

```text
Requirement
    │
    ▼
Architecture / Design
    │
    ▼
Implementation planning
    │
    ▼
Development branch
    │
    ▼
Coding Agent
    │
    ▼
Local checks
    │
    ▼
Commit
    │
    ▼
Pull Request
    │
    ▼
Review
    │
    ▼
Merge
    │
    ▼
Test environment
    │
    ▼
Acceptance testing
    │
    ▼
Production release
```

No unrelated changes should be introduced into a feature branch.

Each build should have a clearly defined scope.

---

# 13. Git and GitHub Workflow

The exact branching model may vary by project, but the following principles apply:

- protect the production/stable branch;
- use branches for development work;
- keep commits understandable;
- use pull requests where appropriate;
- review changes before merging;
- use tags/releases to identify important released versions;
- maintain documentation alongside the project;
- do not use GitHub history as a substitute for Jira project management.

A release should be identifiable and reproducible from GitHub.

---

# 14. Environment Workflow

The project must define at least the conceptual environments:

```text
Development
     │
     ▼
Testing
     │
     ▼
Production
```

### Development

Used for active implementation and experimentation.

### Test

Used to verify functionality before release.

### Production

The version used by real users and/or containing real user data.

The project must document:

- how software moves between environments;
- how configuration differs;
- how data differs;
- what testing is required;
- how rollback is performed.

Production data must not be unnecessarily exposed to development or testing.

---

# 15. Data Protection

For applications containing valuable user data, data safety is a first-class architectural concern.

Before implementing changes that affect stored data:

1. identify the affected data;
2. understand the current data format;
3. define migration requirements;
4. define backup/recovery requirements;
5. define rollback options;
6. test with non-production data;
7. verify migration results;
8. only then release to production.

The workflow must avoid assumptions such as:

> "The application works, therefore the data is safe."

Application functionality and data safety are separate concerns.

---

# 16. Testing Workflow

Testing should be defined before implementation is considered complete.

Testing should cover, where applicable:

- functional requirements;
- acceptance criteria;
- regression;
- data integrity;
- import/export;
- migration;
- error handling;
- responsive UI;
- browser compatibility;
- PWA behaviour;
- performance;
- security;
- production deployment.

A feature is not complete merely because the implementation compiles or appears to work during development.

---

# 17. Release Workflow

A release should follow:

```text
Implementation complete
        │
        ▼
Developer testing
        │
        ▼
QA / acceptance testing
        │
        ▼
Known bugs reviewed
        │
        ▼
Documentation updated
        │
        ▼
Release candidate
        │
        ▼
Production deployment
        │
        ▼
GitHub release/tag
        │
        ▼
Post-release verification
```

For important releases, the release record should identify:

- version;
- included requirements/features;
- resolved bugs;
- known limitations;
- migration/data considerations;
- test status.

---

# 18. Retrospective and Continuous Improvement

After significant development phases or releases, review:

- What worked well?
- What did not work?
- Where did the workflow create unnecessary effort?
- Where did AI assistance help?
- Where did AI assistance create problems?
- Were requirements sufficiently clear?
- Were decisions recorded?
- Were tests sufficient?
- Was the environment strategy adequate?
- Was data protected?
- What should change for the next iteration?

The results are classified as:

```text
Observation
    │
    ▼
Learning
    │
    ├── Project-specific improvement
    │
    └── Generalizable improvement
                │
                ▼
       AI Development Playbook
```

---

# 19. Traceability Model

The project should maintain traceability across the lifecycle.

```text
Epic
  │
  ├── Requirement / Feature
  │       │
  │       ├── Decision
  │       │
  │       ├── Task
  │       │
  │       ├── Build
  │       │
  │       └── Bug
  │
  ▼
Release
```

A useful relationship is:

```text
Why?
Requirement

Why this approach?
Decision

What work?
Task

What went wrong?
Bug

What was delivered?
Release

How is it implemented?
GitHub / Architecture Documentation
```

---

# 20. Separation Between Project Knowledge and Methodology

Not every project observation should become a universal development rule.

The following distinction should be maintained:

| Type | Destination |
|---|---|
| Project requirement | Jira / project documentation |
| Project decision | Jira |
| Project architecture | GitHub |
| Project workflow | `PROJECT_WORKFLOW.md` |
| Project-specific learning | Project learning documentation |
| General development learning | AI Development Playbook |
| Reusable methodology | AI Development Playbook |
| Source code | GitHub |
| Working discussion | ChatGPT |

The AI Development Playbook should therefore evolve through evidence from real projects rather than being treated as a fixed set of rules.

---

# 21. Practical Operating Model

For day-to-day work, the workflow can be simplified to:

```text
             ┌──────────────────┐
             │      Jira        │
             │ Requirements     │
             │ Decisions        │
             │ Tasks / Bugs     │
             └────────┬─────────┘
                      │
                      ▼
             ┌──────────────────┐
             │    ChatGPT       │
             │ Think / Analyse  │
             │ Design / Coach   │
             └────────┬─────────┘
                      │
                      ▼
             ┌──────────────────┐
             │ Coding Agent     │
             │ Implement        │
             │ Test / Inspect   │
             └────────┬─────────┘
                      │
                      ▼
             ┌──────────────────┐
             │     GitHub       │
             │ Code / PR / Tag  │
             │ Docs / Release   │
             └────────┬─────────┘
                      │
                      ▼
             ┌──────────────────┐
             │   Test / QA      │
             └────────┬─────────┘
                      │
                      ▼
             ┌──────────────────┐
             │   Production     │
             └────────┬─────────┘
                      │
                      ▼
                 Learning
                      │
                      ▼
             AI Development
                Playbook
```

---

# 22. Golden Rules

The following rules summarize the workflow.

1. **Do not let important project knowledge live only in a ChatGPT conversation.**
2. **Define requirements before asking an AI coding agent to implement them.**
3. **Record important decisions explicitly.**
4. **Use Jira to manage project work and status.**
5. **Use GitHub to manage code, versions and stable documentation.**
6. **Use ChatGPT for thinking, analysis, coaching and design.**
7. **Use coding agents for controlled implementation.**
8. **Keep implementation scope focused.**
9. **Test before releasing.**
10. **Protect production data.**
11. **Define development, test and production environments explicitly.**
12. **Treat bugs as managed work, not merely notes.**
13. **Keep project-specific decisions separate from reusable methodology.**
14. **Convert valuable experience into explicit learning.**
15. **Convert generalizable learning into methodology.**
16. **Continuously improve the workflow based on real project experience.**
17. **A project should remain understandable even when individual AI conversations are no longer available.**

---

# 23. Relationship to the AI Development Playbook

This document describes how the Digital Library project applies the development methodology.

The **AI Development Playbook** contains the reusable principles and practices that can be applied across projects.

The relationship is:

```text
AI Development Playbook
        │
        │ reusable methodology
        ▼
Project Workflow
        │
        │ applied to Digital Library
        ▼
Digital Library Project Execution
        │
        ▼
Experience / Learning
        │
        ▼
AI Development Playbook
```

The playbook should therefore evolve through continuous feedback from real project experience.

This creates a learning cycle in which each project contributes to improving the development methodology used by future projects.