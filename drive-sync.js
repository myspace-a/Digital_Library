// --- Google Drive sync (Step 15) ---
// Self-contained module: only touches localStorage (via the same keys
// app.js already uses) and calls a few existing app.js functions
// (getLang, showModal, hideModal, renderAll). Everything Drive-specific —
// auth, upload/download, conflict handling, its own two-language strings —
// lives in this file.
//
// Design choices (confirmed with the person building this app):
//  - Manual sync only: nothing syncs automatically. The Google Drive
//    drawer item doubles as "Connect" (when signed out) and "Sync now"
//    (when signed in).
//  - Scope: drive.appdata — this app can only see/edit the one hidden
//    file it creates for itself, never the rest of the person's Drive.
//  - Conflict handling: if local data and the Drive file were both
//    modified since the last sync, ask via modal which one to keep.
//    No automatic merging.

const DRIVE_CLIENT_ID = '596184675880-839jnq48hs6g2hm7bts6et5uce4psvn1.apps.googleusercontent.com';
const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.appdata';
const DRIVE_FILE_NAME = 'biblioteca-data.json';
const DRIVE_CONNECTED_KEY = 'biblioteca_drive_connected';
const LOCAL_MODIFIED_KEY = 'biblioteca_last_modified'; // written by app.js's saveBooks()/saveShelves()

const driveTranslations = {
  it: {
    connectedSuffix: ' ✓ Connesso',
    menuStatusConnecting: 'Connessione in corso...',
    menuTitle: 'Google Drive',
    syncNowBtn: 'Sincronizza ora',
    disconnectBtn: 'Disconnetti',
    okBtn: 'OK',
    lastSyncPrefix: 'Ultima sincronizzazione: ',
    neverSynced: 'Mai sincronizzato.',
    connectErrorTitle: 'Connessione non riuscita',
    connectErrorMsg: 'Impossibile connettersi a Google Drive. Controlla la connessione e riprova.',
    syncedInitialTitle: 'Sincronizzazione completata',
    syncedInitialMsg: 'La tua libreria è stata caricata su Google Drive per la prima volta.',
    syncUpToDateTitle: 'Già aggiornato',
    syncUpToDateMsg: 'I tuoi dati locali e quelli su Google Drive sono già sincronizzati.',
    syncErrorTitle: 'Sincronizzazione non riuscita',
    syncErrorMsg: 'Non è stato possibile sincronizzare con Google Drive. Riprova più tardi.',
    conflictTitle: 'Versioni diverse trovate',
    conflictMsg: 'Locale: {localCount} libri (modificato il {localTime}).\nGoogle Drive: {remoteCount} libri (modificato il {remoteTime}).\nQuale versione vuoi mantenere?',
    keepLocalBtn: 'Mantieni locale',
    keepDriveBtn: 'Mantieni Drive',
    afterConflictLocalTitle: 'Versione locale mantenuta',
    afterConflictLocalMsg: 'I tuoi dati locali sono stati caricati su Google Drive.',
    afterConflictDriveTitle: 'Versione Drive applicata',
    afterConflictDriveMsg: 'I dati da Google Drive hanno sostituito quelli locali.',
    disconnectedTitle: 'Disconnesso',
    disconnectedMsg: 'Sei stato disconnesso da Google Drive. I tuoi dati restano salvati su questo dispositivo.'
  },
  en: {
    connectedSuffix: ' ✓ Connected',
    menuStatusConnecting: 'Connecting...',
    menuTitle: 'Google Drive',
    syncNowBtn: 'Sync now',
    disconnectBtn: 'Disconnect',
    okBtn: 'OK',
    lastSyncPrefix: 'Last synced: ',
    neverSynced: 'Never synced yet.',
    connectErrorTitle: 'Connection failed',
    connectErrorMsg: 'Could not connect to Google Drive. Check your connection and try again.',
    syncedInitialTitle: 'Sync complete',
    syncedInitialMsg: 'Your library has been uploaded to Google Drive for the first time.',
    syncUpToDateTitle: 'Already up to date',
    syncUpToDateMsg: 'Your local data and Google Drive are already in sync.',
    syncErrorTitle: 'Sync failed',
    syncErrorMsg: 'Could not sync with Google Drive. Please try again later.',
    conflictTitle: 'Different versions found',
    conflictMsg: 'Local: {localCount} books (last changed {localTime}).\nGoogle Drive: {remoteCount} books (last changed {remoteTime}).\nWhich version do you want to keep?',
    keepLocalBtn: 'Keep local',
    keepDriveBtn: 'Keep Drive',
    afterConflictLocalTitle: 'Local version kept',
    afterConflictLocalMsg: 'Your local data has been uploaded to Google Drive.',
    afterConflictDriveTitle: 'Drive version applied',
    afterConflictDriveMsg: 'The data from Google Drive has replaced your local data.',
    disconnectedTitle: 'Disconnected',
    disconnectedMsg: 'You have been disconnected from Google Drive. Your data stays saved on this device.'
  }
};

function dt() {
  // Falls back to Italian if app.js's getLang() isn't available yet.
  const lang = (typeof getLang === 'function') ? getLang() : 'it';
  return driveTranslations[lang] || driveTranslations.it;
}

function formatSyncTime(ts) {
  if (!ts) return dt().neverSynced;
  try {
    return new Date(Number(ts)).toLocaleString();
  } catch (err) {
    return dt().neverSynced;
  }
}

// --- Connection state helpers ---

function isDriveConnected() {
  return localStorage.getItem(DRIVE_CONNECTED_KEY) === 'true';
}

function setDriveConnected(value) {
  localStorage.setItem(DRIVE_CONNECTED_KEY, value ? 'true' : 'false');
}

function updateDriveButtonLabel() {
  const btn = document.getElementById('drawerDrive');
  if (!btn) return;
  const t = dt();
  const base = btn.getAttribute('data-i18n');
  const baseLabel = (typeof translations !== 'undefined' && base && translations[getLang()] && translations[getLang()][base])
    ? translations[getLang()][base]
    : 'Google Drive';
  btn.textContent = isDriveConnected() ? (baseLabel + t.connectedSuffix) : baseLabel;
}

// --- Google Identity Services (auth) ---

let tokenClient = null;
let accessToken = null;
let tokenExpiresAt = 0;

function gisReady() {
  return typeof google !== 'undefined' && google.accounts && google.accounts.oauth2;
}

function ensureTokenClient() {
  if (tokenClient || !gisReady()) return;
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: DRIVE_CLIENT_ID,
    scope: DRIVE_SCOPE,
    callback: () => {} // overridden per-call in requestAccessToken()
  });
}

function requestAccessToken(promptMode) {
  return new Promise((resolve, reject) => {
    ensureTokenClient();
    if (!tokenClient) {
      reject(new Error('gis-not-ready'));
      return;
    }
    tokenClient.callback = (resp) => {
      if (resp.error) {
        reject(new Error(resp.error));
        return;
      }
      accessToken = resp.access_token;
      tokenExpiresAt = Date.now() + (resp.expires_in * 1000);
      resolve(accessToken);
    };
    try {
      tokenClient.requestAccessToken({ prompt: promptMode });
    } catch (err) {
      reject(err);
    }
  });
}

async function getValidToken(interactive) {
  if (accessToken && Date.now() < tokenExpiresAt - 30000) return accessToken;
  try {
    // Try silently first (works if the person already granted access
    // earlier in this browser and third-party cookie access allows it).
    return await requestAccessToken('');
  } catch (err) {
    if (!interactive) throw err;
    return requestAccessToken('consent');
  }
}

function driveDisconnect() {
  if (accessToken && gisReady() && google.accounts.oauth2.revoke) {
    try { google.accounts.oauth2.revoke(accessToken, () => {}); } catch (err) { /* ignore */ }
  }
  accessToken = null;
  tokenExpiresAt = 0;
  setDriveConnected(false);
  updateDriveButtonLabel();
  const t = dt();
  showModal({
    title: t.disconnectedTitle,
    msg: t.disconnectedMsg,
    primaryLabel: t.okBtn,
    onPrimary: hideModal
  });
}

// --- Drive REST calls (appDataFolder, single JSON file) ---

async function driveFindFile(token) {
  const url = 'https://www.googleapis.com/drive/v3/files?spaces=appDataFolder'
    + '&q=' + encodeURIComponent(`name='${DRIVE_FILE_NAME}'`)
    + '&fields=files(id,modifiedTime)';
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` }, cache: 'no-store' });
  if (!res.ok) throw new Error('drive-list-failed');
  const data = await res.json();
  return (data.files && data.files[0]) || null;
}

async function driveDownloadFile(token, fileId) {
   const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('drive-download-failed');
  return res.json();
}
async function driveUploadFile(token, fileId, payload) {
  if (fileId) {
    // Existing file: simple media update, no metadata change needed.
    const res = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('drive-upload-failed');
    return res.json();
  }

  // New file: multipart upload so we can set parents: ['appDataFolder'].
  const boundary = 'biblioteca_boundary_' + Date.now();
  const metadata = { name: DRIVE_FILE_NAME, parents: ['appDataFolder'] };
  const body =
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n` +
    `--${boundary}\r\nContent-Type: application/json\r\n\r\n${JSON.stringify(payload)}\r\n` +
    `--${boundary}--`;

  const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': `multipart/related; boundary=${boundary}` },
    body
  });
  if (!res.ok) throw new Error('drive-upload-failed');
  return res.json();
}

// --- Local data snapshot / apply ---

function gatherLocalData() {
  return {
    books: JSON.parse(localStorage.getItem('biblioteca_books') || '[]'),
    shelves: JSON.parse(localStorage.getItem('biblioteca_shelves') || '[]'),
    modifiedAt: parseInt(localStorage.getItem(LOCAL_MODIFIED_KEY) || '0', 10) || Date.now()
  };
}

function applyRemoteData(remote) {
  localStorage.setItem('biblioteca_books', JSON.stringify(remote.books || []));
  localStorage.setItem('biblioteca_shelves', JSON.stringify(remote.shelves || []));
  localStorage.setItem(LOCAL_MODIFIED_KEY, String(remote.modifiedAt || Date.now()));
  if (typeof renderAll === 'function') renderAll();
}

function rememberLastSync(ts) {
  localStorage.setItem('biblioteca_drive_last_sync', String(ts || Date.now()));
}

// --- Core sync flow ---

async function performSync(interactive) {
  const token = await getValidToken(interactive);
  const remoteFile = await driveFindFile(token);
  const local = gatherLocalData();

  if (!remoteFile) {
    await driveUploadFile(token, null, local);
    rememberLastSync(local.modifiedAt);
    return { outcome: 'pushed-initial' };
  }

  const remote = await driveDownloadFile(token, remoteFile.id);
  const remoteModified = remote.modifiedAt || 0;

  if (remoteModified === local.modifiedAt) {
    rememberLastSync(local.modifiedAt);
    return { outcome: 'up-to-date' };
  }

  return { outcome: 'conflict', token, fileId: remoteFile.id, local, remote };
}

async function handleSyncClick() {
  const t = dt();
  let result;
  try {
    result = await performSync(true);
  } catch (err) {
    showModal({
      title: t.connectErrorTitle,
      msg: t.connectErrorMsg,
      primaryLabel: t.okBtn,
      onPrimary: hideModal
    });
    return;
  }

  if (result.outcome === 'pushed-initial') {
    showModal({
      title: t.syncedInitialTitle,
      msg: t.syncedInitialMsg,
      primaryLabel: t.okBtn,
      secondaryLabel: t.disconnectBtn,
      onPrimary: hideModal,
      onSecondary: () => { hideModal(); driveDisconnect(); }
    });
    return;
  }

  if (result.outcome === 'up-to-date') {
    showModal({
      title: t.syncUpToDateTitle,
      msg: t.syncUpToDateMsg,
      primaryLabel: t.okBtn,
      secondaryLabel: t.disconnectBtn,
      onPrimary: hideModal,
      onSecondary: () => { hideModal(); driveDisconnect(); }
    });
    return;
  }

  // conflict
  const { token, fileId, local, remote } = result;
  const msg = t.conflictMsg
    .replace('{localCount}', (local.books || []).length)
    .replace('{localTime}', formatSyncTime(local.modifiedAt))
    .replace('{remoteCount}', (remote.books || []).length)
    .replace('{remoteTime}', formatSyncTime(remote.modifiedAt));

  showModal({
    title: t.conflictTitle,
    msg,
    primaryLabel: t.keepLocalBtn,
    secondaryLabel: t.keepDriveBtn,
    onPrimary: async () => {
      hideModal();
      try {
        await driveUploadFile(token, fileId, local);
        rememberLastSync(local.modifiedAt);
        showModal({
          title: t.afterConflictLocalTitle,
          msg: t.afterConflictLocalMsg,
          primaryLabel: t.okBtn,
          onPrimary: hideModal
        });
      } catch (err) {
        showModal({ title: t.syncErrorTitle, msg: t.syncErrorMsg, primaryLabel: t.okBtn, onPrimary: hideModal });
      }
    },
    onSecondary: () => {
      hideModal();
      applyRemoteData(remote);
      rememberLastSync(remote.modifiedAt);
      showModal({
        title: t.afterConflictDriveTitle,
        msg: t.afterConflictDriveMsg,
        primaryLabel: t.okBtn,
        onPrimary: hideModal
      });
    }
  });
}

async function driveConnectFlow() {
  const t = dt();
  try {
    await getValidToken(true);
  } catch (err) {
    showModal({
      title: t.connectErrorTitle,
      msg: t.connectErrorMsg,
      primaryLabel: t.okBtn,
      onPrimary: hideModal
    });
    return;
  }
  setDriveConnected(true);
  updateDriveButtonLabel();
  // Right after connecting, run the same sync flow used by "Sync now"
  // so the person's first connection immediately reconciles local vs Drive.
  await handleSyncClick();
}

function onDriveButtonClick() {
  closeDrawer();
  if (!isDriveConnected()) {
    driveConnectFlow();
  } else {
    handleSyncClick();
  }
}

// This script tag sits at the end of <body>, after app.js, so the DOM
// (including #drawerDrive) already exists by the time this file runs.
const driveBtn = document.getElementById('drawerDrive');
if (driveBtn) driveBtn.addEventListener('click', onDriveButtonClick);
updateDriveButtonLabel();
