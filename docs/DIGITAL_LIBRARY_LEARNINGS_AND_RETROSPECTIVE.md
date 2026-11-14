# Digital Library --- Learnings & Retrospective

**Document status:** Initial baseline\
**Last updated:** 2026-11-14\
**Purpose:** Capture project learnings, reflect on what worked and what
did not, and build a reusable approach for future AI-assisted software
projects.

------------------------------------------------------------------------

## 1. Purpose and scope

This document is the evolving record of lessons learned while developing
the Digital Library project.

It has two complementary goals:

1.  Improve the Digital Library project itself by identifying process,
    architecture, documentation, development, and testing improvements.
2.  Build reusable knowledge that can make future AI-assisted
    development projects more effective.

Not every observation should become a general rule. Each learning should
be classified as either:

-   **Project-specific:** relevant mainly to Digital Library.
-   **Reusable:** likely to help in other software projects.
-   **Needs validation:** a useful hypothesis that should be tested
    through further experience.

This document records learnings and retrospective conclusions. Formal
project requirements and approved project decisions remain in their
designated project documentation and Jira issues.

------------------------------------------------------------------------

## 2. Working approach for capturing learnings

When a new experience is brought into the Learning & Retrospective
discussion, use this sequence:

1.  **Describe the experience:** What happened? In which project
    activity or decision?
2.  **Identify the learning:** What did the experience reveal?
3.  **Challenge the conclusion:** What might have been overlooked? Are
    there alternative explanations?
4.  **Classify the learning:** Project-specific, reusable, or needs
    validation.
5.  **Identify follow-up actions:** Does it require a project decision,
    Jira update, documentation change, or workflow adjustment?
6.  **Update this document:** Record the lesson in a concise, actionable
    form.

A learning should not automatically become a project requirement or a
formal methodology rule. First establish what the experience actually
demonstrates.

------------------------------------------------------------------------

## 3. Initial learnings

The following baseline lessons have been identified from the project
work and earlier learning discussions. They are initial observations and
can be refined as the project progresses.

### 3.1 AI collaboration and chat organization

**Learning:** Separate conversations by responsibility and purpose.

Using dedicated conversations for requirements and product architecture,
project coaching, decision-making, and implementation helps reduce role
confusion.

**Practical implication:** - Give each conversation a clearly defined
responsibility. - State what the conversation is allowed and not allowed
to do. - Keep implementation work separate from requirements decisions
and technical coaching when that separation is useful. - Provide the
relevant project context and reference documents when starting a new
conversation.

**Classification:** Reusable.

### 3.2 Documentation as a source of truth

**Learning:** Project documentation should be maintained in a stable,
version-controlled location.

Chat history is useful for discussion, but it should not be the only
place where important project knowledge, approved decisions, or workflow
instructions exist.

**Practical implication:** - Keep authoritative project documentation in
the GitHub repository. - Make document purpose and status clear. -
Update documentation when decisions or project structure change. - Avoid
leaving obsolete documents or conflicting versions where they can
mislead future work. - Treat chat summaries as working context, not
automatically as the authoritative specification.

**Classification:** Reusable.

### 3.3 Project management and decision traceability

**Learning:** Distinguish requirements, decisions, open questions,
tasks, and bugs.

These items serve different purposes. Mixing them makes it harder to
understand what has been approved, what remains unresolved, and what
needs implementation.

**Practical implication:** - Use requirements documentation for expected
product behaviour. - Record important decisions and their rationale. -
Track implementation work and progress in Jira. - Keep unresolved
questions visible until they are answered. - Reflect material changes
consistently across Jira and GitHub.

**Classification:** Reusable.

### 3.4 Development workflow and Git

**Learning:** Use a controlled branch and review workflow rather than
making every change directly on the production branch.

**Practical implication:** - Keep the main branch in a known, stable
state. - Develop changes on appropriately named feature branches. -
Review changes before merging. - Merge only after the relevant checks
and tests have been completed. - Keep project documentation aligned with
the actual repository structure and workflow.

**Classification:** Reusable.

### 3.5 Testing and quality assurance

**Learning:** Testing should be planned as part of feature delivery, not
left until the end.

**Practical implication:** - Define acceptance criteria before
implementation. - Prepare test scenarios for the expected behaviour. -
Test the changed feature and relevant existing functionality (regression
testing). - Include realistic user workflows, not only isolated
technical checks. - Record known limitations and issues that were not
introduced by the current change.

**Classification:** Reusable.

### 3.6 Architecture and operational concerns

**Learning:** Important operational concerns should be considered early,
rather than treated as details to solve after implementation.

Examples include data persistence, backup and restore, deployment, PWA
behaviour, and the separation of development, test, and production
environments.

**Practical implication:** - Identify where data lives and how it is
protected. - Consider backup, restore, and migration behaviour. - Define
how changes move from development through testing to production. -
Include installation and update behaviour when building a PWA. -
Document architectural constraints and known limitations.

**Classification:** Reusable.

### 3.7 Keeping project information aligned

**Learning:** Project information is distributed across conversations,
Jira, GitHub documentation, and source code. These sources can become
inconsistent if updates are not coordinated.

**Practical implication:** - Decide which system is authoritative for
each type of information. - After a material decision or implementation
milestone, update the relevant records. - Check that documentation
describes the current repository and workflow. - Avoid assuming that
updating one source automatically updates the others.

**Classification:** Reusable.

### 3.8 Separate project-specific knowledge from reusable methodology

**Learning:** A project retrospective should distinguish lessons that
apply only to the current project from lessons that can improve future
projects.

**Practical implication:** - Keep Digital Library-specific facts and
decisions in its project documentation. - Capture broadly applicable
process lessons in a reusable playbook or methodology. - Do not
generalize from a single experience without considering whether it is
repeatable.

**Classification:** Reusable.

------------------------------------------------------------------------

## 4. Environment strategy --- DL-2

### 4.1 Current Digital Library arrangement

The approved environment design for Digital Library is:

  Area          Selected approach
  ------------- ---------------------
  Development   Codex CLI / ChatGPT
  Test          Cloudflare Pages
  Production    GitHub Pages

The Cloudflare test deployment has been created:

<https://digital-library-d19.pages.dev/>

The test environment is intended to be publicly accessible. An installed
PWA is optional, and future cloud-based development is optional.

The production snapshot is expected to contain only non-sensitive
library information, such as the list of books read and whether a book
is owned.

### 4.2 Learning

**Learning:** Define the development, test, and production environments
explicitly as part of the project architecture.

A project should not treat hosting as a single undifferentiated
destination. The purpose of each environment and the path by which
changes move between them should be clear.

**Further reusable insight:** Separate the *environment design* from the
*hosting provider choice*. The same logical environment model can be
retained even if another project uses a different provider. For future
projects, Cloudflare could potentially be used for both test and
production, rather than assuming that the current Digital Library
provider choices must be repeated.

**Classification:** Reusable, with the specific provider selection
remaining project-specific.

### 4.3 Practical implications for future projects

-   Decide what development, test, and production mean for the project.
-   Identify who can access each environment and what data it contains.
-   Define how a candidate release is deployed to test and promoted to
    production.
-   Choose hosting providers based on project needs; do not confuse a
    provider choice with the environment architecture.
-   Consider whether test and production need separate data, domains,
    access rules, or deployment controls.

------------------------------------------------------------------------

## 5. Retrospective topics to keep reviewing

As the project progresses, revisit these questions:

-   Were responsibilities between chats, tools, and people clear?
-   Was the authoritative documentation easy to identify?
-   Were requirements and decisions sufficiently precise before
    implementation?
-   Did Jira and GitHub remain aligned?
-   Did the development and review workflow prevent avoidable errors?
-   Were acceptance and regression tests adequate?
-   Were deployment and environment differences understood?
-   Were data protection, backup, restore, and migration needs
    considered?
-   Which activities were unnecessarily manual or repetitive?
-   Which lessons can be reused in another project?

------------------------------------------------------------------------

## 6. Learning register

Add new lessons to this register as they are discussed. Use a stable
identifier so a lesson can be referenced in later discussions.

  -----------------------------------------------------------------------------------
  ID             Topic           Learning             Classification   Status
  -------------- --------------- -------------------- ---------------- --------------
  L-001          AI              Separate             Reusable         Initial
                 collaboration   conversations by                      
                                 responsibility and                    
                                 purpose.                              

  L-002          Documentation   Maintain             Reusable         Initial
                                 authoritative,                        
                                 version-controlled                    
                                 project                               
                                 documentation.                        

  L-003          Project         Distinguish          Reusable         Initial
                 management      requirements,                         
                                 decisions, open                       
                                 questions, tasks,                     
                                 and bugs.                             

  L-004          Git workflow    Use feature branches Reusable         Initial
                                 and review changes                    
                                 before merging.                       

  L-005          Testing         Plan acceptance and  Reusable         Initial
                                 regression testing                    
                                 as part of feature                    
                                 delivery.                             

  L-006          Architecture    Consider             Reusable         Initial
                                 persistence,                          
                                 backups, PWA                          
                                 behaviour, and                        
                                 environments early.                   

  L-007          Information     Coordinate updates   Reusable         Initial
                 alignment       across                                
                                 conversations, Jira,                  
                                 GitHub, and code.                     

  L-008          Methodology     Separate             Reusable         Initial
                                 project-specific                      
                                 knowledge from                        
                                 reusable lessons.                     

  L-009          Environments    Define development,  Reusable         Initial
                                 test, and production                  
                                 independently of                      
                                 hosting-provider                      
                                 choices.                              
  -----------------------------------------------------------------------------------

------------------------------------------------------------------------

## 7. Document maintenance

This is a living document. Update it when meaningful new experiences,
lessons, or retrospective conclusions emerge.

For each substantial update: - Add or refine the relevant section. - Add
a row to the learning register. - Record any follow-up action and its
destination (for example, a Jira issue or project decision). - Keep
project-specific implementation details in the appropriate project
documentation rather than duplicating the full specification here.

**Current status:** Initial baseline created. Further lessons and
retrospective findings are expected as Digital Library development
continues.
