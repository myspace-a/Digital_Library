# Digital Library — Project History and Reference

## 1. Purpose and status

This document preserves selected historical and technical information from the earlier development of the Digital Library project.

It is a **reference document only**. It is not the authoritative project workflow, requirements, backlog, or decision record.

The current project workflow is defined in:

`docs/PROJECT_WORKFLOW.md`

Current requirements, decisions, tasks, bugs, priorities, and relationships are managed in Jira.

This document should therefore be used mainly to understand the project's earlier development, technical choices, and lessons learned.

---

## 2. Historical development sequence

The original project was developed through the following sequence of steps.

This list represents the historical development sequence and should not be interpreted as the current project backlog or current implementation status.

1. Basic app shell / PWA
2. Book data model, manual add/view/delete, and local storage
3. Additional book fields and dropdowns
4. Language switcher
5. Statistics counters
6. Shelf management
7. App layout restructure
8. Add-book modal and edit function
9. Google Books / Open Library search
10. ISBN barcode scanning
11. Cover image fetching
11b. Split `index.html` into `index.html`, `style.css`, and `app.js`
12. Export XLSX
13. Import XLSX and validation
14. Offline caching
15. Google Drive synchronization
16. Search and sort
17. Android polish and installation flow

The original development notes described Step 17 as the completion of the project at that stage. That statement is historical and does not represent the current project status.

---

## 3. Historical technical reference

### 3.1 Historical application file structure

The earlier project structure included:

```text
index.html
style.css
app.js
drive-sync.js
service-worker.js
manifest.json
icon-192.png
icon-512.png
Project_Workflow_and_Build_Sequence.md
```

This is preserved as historical reference only. The current repository structure may differ.

---

## 4. Google Drive synchronization

The earlier implementation included manual Google Drive synchronization.

The documented design was:

- Synchronization was manual rather than automatic.
- The Google Drive drawer item changed between **Connect** and **Sync now**, depending on connection state.
- The Google Drive scope used was `drive.appdata`.
- Application data was stored in a single hidden JSON file:
  `biblioteca-data.json`
- Synchronization used a **full-replace** approach rather than merging individual records.
- The first synchronization uploaded the local data.
- If there were no changes, synchronization was a no-op.
- If a conflict was detected, the application showed relevant counts/times and allowed the user to choose:
  - Keep local
  - Keep Drive
- The selected side then completely overwrote the other side.

These notes describe the historical synchronization design and should not be assumed to define any future synchronization architecture.

---

## 5. Google Books API

The earlier application used the Google Books API.

The historical configuration notes stated:

- The API key was restricted by HTTP referrer.
- The allowed referrer was based on the project's GitHub Pages domain:
  `myspace-a.github.io/*`
- The API was being used within its free tier.
- No billing was configured.
- Because the application was client-side, the API key was visible in the page/source delivered to the browser.

No API key or other secret is stored in this document.

---

## 6. Historical architecture limitations

The earlier architecture was a client-only application.

The documented limitations were:

- No backend.
- No login or user-account system.
- Book data stored in the browser's `localStorage`.
- Google Drive synchronization provided a backup/synchronization mechanism.
- The same live application could be accessed by multiple users, but each user's browser maintained its own local data.
- There was no per-user account or shared central database.

These are **historical architecture notes**. They should not be interpreted as the current or future architecture unless confirmed by the current project documentation and Jira decisions.

---

## 7. Service worker and caching reference

The project used a service worker for offline functionality.

An important implementation rule identified during development was:

When a new application file is loaded by the application, it must be considered for inclusion in the service worker's cached-files list.

When the cached application files change:

1. Add the required file to the cache list.
2. Bump the service-worker cache name/version.
3. Test the application offline.

This was important because otherwise the browser could continue using an older cached version of the application.

---

## 8. Historical development lessons

The earlier project development produced several lessons that remain useful as historical reference.

### 8.1 Test structural changes carefully

Large structural changes should be tested thoroughly before moving to the next development step.

### 8.2 Split large files when necessary

As application code grows, separating functionality into appropriate files can make the project easier to maintain.

The historical project eventually separated functionality from the original single-page structure.

### 8.3 Test UI state changes explicitly

UI controls that change state should be tested for both directions.

For example, when a UI element can be shown and hidden, testing should explicitly verify both:

- first interaction: the element becomes visible;
- second interaction: the element becomes hidden again.

### 8.4 Remember service-worker caching

A successful code change does not necessarily mean the browser will immediately load the new code when a service worker is involved.

Cache contents and cache versions therefore need to be considered when application files change.

### 8.5 Test major steps before continuing

The earlier development experience showed the value of testing substantial structural changes before proceeding to the next feature.

### 8.6 Keep development conversations manageable

The earlier project notes identified excessively long development conversations as a practical problem.

A useful historical lesson was to keep individual build discussions focused on a limited feature or change and move to a new conversation when the previous one becomes too large.

### 8.7 Separate large concerns when appropriate

The project notes also identified the benefit of moving functionality into separate files once individual files became large or difficult to manage.

### 8.8 Project knowledge and GitHub synchronization

The earlier project used both GitHub and ChatGPT project knowledge.

A lesson from the project was that these are not automatically identical sources. Important project information should therefore have a clearly defined authoritative location.

The current workflow document formalizes this separation.

### 8.9 Connector limitations

The earlier development experience included cases where a connector did not work as expected.

The historical lesson was that important project work should not depend on assuming that a particular integration will always be available or behave exactly as expected.

---

## 9. Historical tools and hosting

The original project development used:

- GitHub for source code and project files.
- GitHub Pages for hosting the application.
- VS Code for local development.
- Google Cloud for the Google Books API.
- Google Drive for the application's synchronization/backup functionality.

These references describe the tools used during the earlier development period.

The current project workflow defines the authoritative roles of project-management, source-control, documentation, and development tools.

---

## 10. Historical project characteristics

The original application was designed as a Progressive Web App (PWA) and was intended to work on mobile devices.

The project used:

- HTML
- CSS
- JavaScript
- Browser local storage
- Service-worker caching
- XLSX import/export
- Google Books API
- Google Drive synchronization
- GitHub Pages hosting

These technologies are retained here as historical reference and should not automatically be treated as a constraint on future architectural decisions.

---

## 11. Relationship to current project documentation

This document should not be used to determine:

- the current project workflow;
- the current branching strategy;
- the current development/test/production environment structure;
- the current requirements;
- the current backlog;
- current project decisions;
- current release policy;
- current versioning policy;
- current implementation status.

For those subjects, use the appropriate current source:

| Information | Authoritative source |
|---|---|
| Requirements | Jira |
| Backlog | Jira |
| Decisions | Jira |
| Tasks | Jira |
| Bugs | Jira |
| Priorities and status | Jira |
| Source code | GitHub |
| Branches and commits | GitHub |
| Releases and tags | GitHub |
| Stable project documentation | GitHub |
| Current project workflow | `docs/PROJECT_WORKFLOW.md` |
| Reusable development methodology | AI Development Playbook |
| Working discussions | ChatGPT |
| Implementation | Coding Agent / Codex CLI |

---

## 12. Maintenance of this document

This document should remain relatively stable.

New project decisions, requirements, workflow changes, or current implementation details should **not** be added here simply because they were discussed during development.

Instead:

- record project decisions in Jira;
- update `docs/PROJECT_WORKFLOW.md` when the project workflow changes;
- update stable technical documentation in the appropriate `docs/` file;
- keep reusable methodology in the AI Development Playbook.

This document should only be updated when there is a genuine need to preserve historical or reference information from the project's earlier development.

---

## 13. Historical source

This document was created from the earlier root-level file:

`Project_Workflow_and_Build_Sequence.md`

The original file contained both historical technical information and project workflow instructions.

The historical/technical information that remains useful has been separated into this document so that the repository has a single clear authoritative workflow document:

`docs/PROJECT_WORKFLOW.md`

The obsolete root-level workflow document should therefore be removed.