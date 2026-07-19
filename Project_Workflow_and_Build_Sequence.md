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

## Build sequence (small steps, one per chat)
1. Basic app shell — PWA files (manifest, icon), installable empty page
2. Book data model + manual add/view/delete (local storage only, no cloud yet)
3. All book fields + dropdowns (Reading Status, Ownership, Format, Language)
4. Language switcher (IT/EN toggle + translate all existing labels/fields)
5. Stats counters
6. Shelf management (add/remove/rename/merge)
7. Add-book modal: manual entry tab
8. Open Library search integration (Title/ISBN tabs)
9. Cover image fetching by ISBN
10. Export to XLSX
11. Import from XLSX + validation
12. Offline caching (service worker)
13. Google Drive sync
14. Android polish / install flow

## End-of-feature checklist (every build chat)
1. Confirm the feature works (test in browser / on phone via GitHub Pages URL).
2. On github.com: open the repo → **Add file → Create new file** (for new files) or click the file → pencil icon (to edit existing ones) → paste the code.
3. Scroll down → write a short commit message → **Commit changes**.
4. Start a new chat for the next feature, telling Claude "here's my current code" (paste/upload from GitHub) instead of re-explaining the whole app.

## Quota tips
- Keep build chats short and single-feature.
- Ask for only new/changed code, not full re-prints of unchanged files.
- Test after each small step rather than batching multiple features before debugging.
