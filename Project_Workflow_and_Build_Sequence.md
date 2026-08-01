# Digital Library App — Project Workflow

## Project links
- **Repository**: https://github.com/myspace-a/Digital_Library
- **Live app (GitHub Pages)**: https://myspace-a.github.io/Digital_Library/

## Chat structure
- **Coach chat**: guidance only — sequencing, GitHub help, quota tips, troubleshooting root causes. Never writes app code here.
- **Requirements chat**: where the spec (Digital_Library_App_Requirements) gets updated/refined.
- **Build chats**: one per feature (see sequence below). Each build chat starts by loading current code from GitHub, builds ONE feature, then that feature gets committed/pushed before the chat ends. Start a fresh build chat for the next feature.
## Related documents
- **General coding lessons learned chat** (patterns/tips that apply beyond this specific app — e.g. prompting Claude effectively, file structure choices, API key handling) are tracked separately in a dedicated chat and updated to a "Leassos Learned" doc. This file's "Lessons learned" along the way" includes learning of my digital library app project. It will be used to improve my coding skills, track capabilities, issues collected. 

## Tools
- **GitHub.com website** (browser-only, no install): create/edit files and commit changes directly at github.com — no git or terminal needed. Used instead of GitHub Desktop, which isn't officially supported on Ubuntu/Linux.
- VS Code (view/edit files locally when needed): https://code.visualstudio.com — install via the .deb download, double-click to install through Ubuntu Software.
- GitHub Pages (free hosting for live testing, incl. on Android via "Add to Home Screen")
- Google cloud for google books API

## Keeping this doc in sync
This file lives in the GitHub repo (root or /docs) as the source of truth, not just as a project knowledge upload. Whenever it's updated:
1. Commit the new version to GitHub (Add file / edit → paste → commit), same as any code file.
2. In project knowledge, use the GitHub sync option ("Sync now") to pull the latest version in — not the quick "Add to project" button from chat, which skips GitHub entirely and has no version history.
This keeps one single up-to-date version with full change history, instead of two diverging copies.

## File structure
- **index.html** — page structure/markup only; links to style.css and loads app.js, drive-sync.js
- **style.css** — all visual styling
- **app.js** — core app logic: book/shelf data model, localStorage read/write, UI rendering, search, import/export, barcode scanning
- **drive-sync.js** — Google Drive connection, auth, and sync logic (added step 15); called from app.js via small hook functions rather than being deeply woven into it
- **service-worker.js** — offline caching; caches the app shell (listed below) on install, serves from cache when offline
- **manifest.json** — PWA metadata (app name, icons, install behavior) for "Add to Home Screen"
- **icon-192.png / icon-512.png** — app icons used by manifest.json for home screen/install
- **Project_Workflow_and_Build_Sequence.md** — this file; process, sequence, and technical notes (not app code, not served to users)

## Build sequence (small steps, one per chat)
1. Basic app shell — PWA files (manifest, icon), installable empty page
2. Book data model + manual add/view/delete (local storage only, no cloud yet)
3. All book fields + dropdowns (Reading Status, Ownership, Format, Language)
4. Language switcher (dropdown with flags + translate all existing labels/fields)
5. Stats counters
6. Shelf management (add/remove/rename/merge)
7. App layout restructure — top app bar (hamburger, search, sort, view-toggle icons), side drawer menu (incl. show/hide stats counters toggle), Shelves/Books tabs, breadcrumb + item count + filter row, Books view grouped by author with A–Z fast-scroll index, floating "+" button
8. Add-book modal: manual entry tab; fix missing edit function for books
9. Google book and Open Library search integration (Title/ISBN tabs)
10. ISBN barcode scanning via device camera
11. Cover image fetching by ISBN
11b. Split single index.html into three files (index.html, style.css, app.js) — no new features, pure refactor to reduce file size and quota use in future build chats. Reasoning: file had grown past 1,500 lines, making every build chat resend/rebuild the whole thing even for small changes.
12. Export to XLSX
13. Import from XLSX + validation
14. Offline caching (service worker)
15. Google Drive sync
16. Android polish / install flow

Step 15 is done.

## Derailed functionality implemeted

Google Drive sync (step 15)
- Manual sync only — no auto-sync. The "Google Drive" drawer item doubles as:
  - Connect (when signed out) → triggers Google sign-in, then runs an initial sync
  - Sync now (when signed in) → tap again anytime to sync
  - Disconnect → offered as a secondary option on the result modal after each sync
- Scope used: drive.appdata — app can only see/edit its own hidden file, not the whole Drive.
- Storage: single hidden JSON file (biblioteca-data.json) in the Drive "app data" folder —
  not visible in normal Drive UI by design.
- Sync behavior: always a full replace, never a merge.
  - First sync: local data uploaded as-is
  - No changes either side: no-op
  - Conflict (both sides changed since last sync): modal shows book counts + last-changed
    times for local vs. Drive; user picks "Keep local" or "Keep Drive" — whichever is chosen
    completely overwrites the other side, no per-book merging


## End-of-feature checklist (every build chat)
1. Confirm the feature works (test in browser / on phone via GitHub Pages URL).
2. On github.com: open the repo → **Add file → Create new file** (for new files) or click the file → pencil icon (to edit existing ones) → paste the code.
3. Scroll down → write a short commit message → **Commit changes**.
4. Start a new chat for the next feature, telling Claude "here's my current code" (paste/upload from GitHub) instead of re-explaining the whole app.
## Reminder: keep service-worker.js in sync
Whenever a build step adds a **new file** the app loads (JS, CSS, or otherwise), or changes an **existing app-shell file** (index.html, style.css, app.js, manifest.json, icons):
1. Add/update the file in service-worker.js's cached-files list
2. Bump the CACHE_NAME/version (e.g. v1 → v2) — otherwise devices with an already-installed app keep serving the old cached list indefinitely, even after the code is updated
3. Test offline mode again after any such change (DevTools → Network → Offline, or airplane mode on Android)

## Lessons learned along the way
- **"Add from GitHub" is read-only**: it lets Claude pull in current files, but doesn't auto-commit changes back — still paste results into GitHub's website manually.
- **Connector can fail intermittently**: retry once; if it fails again, fall back to manually pasting file content rather than burning quota troubleshooting it.
- **Catch structural issues early**: when something feels architecturally off (e.g. a UI pattern, a missing layout piece), fix it or insert a new step before building further on top of it — cheaper than retrofitting later.
- **"Add to project" vs. GitHub sync**: the quick chat button has no version history and isn't backed by the actual codebase; GitHub commit + "Sync now" does, at the cost of a couple more clicks. Worth it for docs/files you'll keep revising.
- **GitHub repo-sync setup for project knowledge is browser/desktop only** (as of now) — not available in the Android app for initial setup; using it once configured may still work on mobile.
- **Test big structural steps thoroughly**: after a step that touches a lot of the file (e.g. layout restructure), re-check that everything built in *previous* steps still works, not just the new feature.
- **Watch chat length**: periodically check whether a coach or build chat is getting long, and start fresh once a milestone is reached — history isn't lost as long as key docs are kept current in project knowledge.
- **Split into separate files once large**: a single-file app gets expensive to rebuild every step once it passes ~1,000+ lines — every build chat has to resend and retype the whole thing even for small changes. Splitting into index.html/style.css/app.js (done at step 11b) means most future build chats only need the one file that's actually changing.
- **Bump the service worker cache version on every app-shell change**: whenever `index.html`, `style.css`, `app.js`, `manifest.json`, or an icon file changes, also increment `CACHE_NAME`/`RUNTIME_CACHE` in `service-worker.js` (e.g. `v1` → `v2`) and commit both together — otherwise phones keep serving the old cached files after an update.

## Quota tips
- Keep build chats short and single-feature.
- Ask for only new/changed code, not full re-prints of unchanged files.
- Test after each small step rather than batching multiple features before debugging.

## Technical Notes, Configuration & Known Risks

### Repository
- Repo is **public** (required for GitHub Pages to serve files; a private repo gains no real privacy since the live site exposes source anyway)

### Google Books API key
- Key is restricted via **HTTP referrer** to `myspace-a.github.io/*`
- Free tier only — **no billing account attached**
- Google account used to generate the key: stored privately outside this repo (not documented here — public repo)
- Key is visible in client-side page source; this is a known, accepted tradeoff for a static (no-backend) app, mitigated by the referrer restriction and lack of billing

### Google Drive Sync
- OAuth Client ID setup (one-time, done via Google Cloud Console "Clients" page — note the
  UI has been renamed from the old single "Credentials" page): same project as the Google
  Books API key, Drive API enabled, consent screen in Testing mode with own account as test user.

### App architecture limits
- **Client-only app**: no backend server, no login/authentication
- **Data storage**: book data lives in each browser's own localStorage — not backed up until Google Drive sync (step 15) is built; clearing browser data or switching devices/browsers loses local data
- **Sharing the live link**: anyone can open and use the app, but each person's data is isolated to their own browser's localStorage — no shared or visible access to others' books/shelves
- **No per-user accounts**: whoever has the link has full read/write access to whatever data exists in their own session; there's no way to restrict who can use the app