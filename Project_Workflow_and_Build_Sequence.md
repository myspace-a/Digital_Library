# Digital Library App — Project Workflow

## Project links
- **Repository**: https://github.com/myspace-a/Digital_Library
- **Live app (GitHub Pages)**: https://myspace-a.github.io/Digital_Library/

## Chat structure
- **Coach chat** (this one): guidance only — sequencing, GitHub help, quota tips, troubleshooting root causes. Never writes app code here.
- **Requirements chat**: where the spec (Digital_Library_App_Requirements) gets updated/refined.
- **Build chats**: one per feature (see sequence below). Each build chat starts by loading current code from GitHub, builds ONE feature, then that feature gets committed/pushed before the chat ends. Start a fresh build chat for the next feature.

## Tools
- **GitHub.com website** (browser-only, no install): create/edit files and commit changes directly at github.com — no git or terminal needed. Used instead of GitHub Desktop, which isn't officially supported on Ubuntu/Linux.
- VS Code (view/edit files locally when needed): https://code.visualstudio.com — install via the .deb download, double-click to install through Ubuntu Software.
- GitHub Pages (free hosting for live testing, incl. on Android via "Add to Home Screen")

## Keeping this doc in sync
This file lives in the GitHub repo (root or /docs) as the source of truth, not just as a project knowledge upload. Whenever it's updated:
1. Commit the new version to GitHub (Add file / edit → paste → commit), same as any code file.
2. In project knowledge, use the GitHub sync option ("Sync now") to pull the latest version in — not the quick "Add to project" button from chat, which skips GitHub entirely and has no version history.
This keeps one single up-to-date version with full change history, instead of two diverging copies.

## Build sequence (small steps, one per chat)
1. Basic app shell — PWA files (manifest, icon), installable empty page
2. Book data model + manual add/view/delete (local storage only, no cloud yet)
3. All book fields + dropdowns (Reading Status, Ownership, Format, Language)
4. Language switcher (dropdown with flags + translate all existing labels/fields)
5. Stats counters
6. Shelf management (add/remove/rename/merge)
7. App layout restructure — top app bar (hamburger, search, sort, view-toggle icons), side drawer menu (incl. show/hide stats counters toggle), Shelves/Books tabs, breadcrumb + item count + filter row, Books view grouped by author with A–Z fast-scroll index, floating "+" button
8. Add-book modal: manual entry tab; fix missing edit function for books
9. Open Library search integration (Title/ISBN tabs)
10. ISBN barcode scanning via device camera
11. Cover image fetching by ISBN
12. Export to XLSX
13. Import from XLSX + validation
14. Offline caching (service worker)
15. Google Drive sync
16. Android polish / install flow

## End-of-feature checklist (every build chat)
1. Confirm the feature works (test in browser / on phone via GitHub Pages URL).
2. On github.com: open the repo → **Add file → Create new file** (for new files) or click the file → pencil icon (to edit existing ones) → paste the code.
3. Scroll down → write a short commit message → **Commit changes**.
4. Start a new chat for the next feature, telling Claude "here's my current code" (paste/upload from GitHub) instead of re-explaining the whole app.

## Lessons learned along the way
- **"Add from GitHub" is read-only**: it lets Claude pull in current files, but doesn't auto-commit changes back — still paste results into GitHub's website manually.
- **Connector can fail intermittently**: retry once; if it fails again, fall back to manually pasting file content rather than burning quota troubleshooting it.
- **Catch structural issues early**: when something feels architecturally off (e.g. a UI pattern, a missing layout piece), fix it or insert a new step before building further on top of it — cheaper than retrofitting later.
- **"Add to project" vs. GitHub sync**: the quick chat button has no version history and isn't backed by the actual codebase; GitHub commit + "Sync now" does, at the cost of a couple more clicks. Worth it for docs/files you'll keep revising.
- **GitHub repo-sync setup for project knowledge is browser/desktop only** (as of now) — not available in the Android app for initial setup; using it once configured may still work on mobile.
- **Test big structural steps thoroughly**: after a step that touches a lot of the file (e.g. layout restructure), re-check that everything built in *previous* steps still works, not just the new feature.
- **Watch chat length**: periodically check whether a coach or build chat is getting long, and start fresh once a milestone is reached — history isn't lost as long as key docs are kept current in project knowledge.

## Quota tips
- Keep build chats short and single-feature.
- Ask for only new/changed code, not full re-prints of unchanged files.
- Test after each small step rather than batching multiple features before debugging.
