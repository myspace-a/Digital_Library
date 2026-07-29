if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').catch(() => {});
}

const STORAGE_KEY = 'biblioteca_books';
const LANG_KEY = 'biblioteca_lang';
const SHELVES_KEY = 'biblioteca_shelves';

const GOOGLE_BOOKS_API_KEY = 'AIzaSyCHm31s7AWGIhAR2hHd-e-Zjr3RVTCQNUU';

let currentTab = 'books';
let shelfFilter = null;
let editingBookId = null;

const translations = {
  it: {
    appTitle: '📚 La Mia Biblioteca',
    addBtn: 'Aggiungi',
    saveBtn: 'Salva modifiche',
    deleteBtn: 'Elimina',
    emptyMsg: 'Nessun libro ancora. Aggiungine uno sopra!',
    phTitle: 'Titolo',
    phAuthor: 'Autore',
    phPublisher: 'Editore',
    phSeries: 'Serie',
    phVolume: 'Volume',
    phIsbn: 'ISBN',
    phShelf: 'Scaffale',
    statTotalLabel: 'Totale',
    statReadLabel: 'Letti',
    statOwnedLabel: 'Posseduti',
    statOnLoanLabel: 'In prestito',
    currentLangLabel: 'Italiano',
    currentLangFlag: '🇮🇹',
    newShelfPh: 'Nuovo scaffale',
    addShelfBtn: 'Aggiungi scaffale',
    noShelvesMsg: 'Nessuno scaffale creato.',
    confirmDeleteShelfTitle: 'Eliminare lo scaffale?',
    confirmDeleteShelfMsg: 'I libri assegnati a questo scaffale diventeranno "Senza scaffale".',
    confirmMergeTitle: 'Scaffale già esistente',
    confirmMergeMsg: 'Esiste già uno scaffale con questo nome. Vuoi unire i due scaffali?',
    mergeYesBtn: 'Sì, unisci',
    mergeNoBtn: 'No, modifica nome',
    modalCancelBtn: 'Annulla',
    modalConfirmBtn: 'Conferma',
    modalOkBtn: 'OK',
    duplicateShelfTitle: 'Scaffale già esistente',
    duplicateShelfMsg: 'Esiste già uno scaffale con questo nome (maiuscole e minuscole non fanno differenza).',
    hamburgerTitle: 'Menu',
    searchTitle: 'Cerca',
    sortTitle: 'Ordina',
    viewToggleTitle: 'Cambia vista',
    filterTitle: 'Filtra',
    closeDrawerTitle: 'Chiudi menu',
    fabAddTitle: 'Aggiungi libro',
    closeAddPanelTitle: 'Chiudi',
    menuTitle: 'Menu',
    drawerLangLabel: 'Lingua',
    drawerImportExport: 'Importa / Esporta',
    drawerDrive: 'Google Drive',
    comingSoonTitle: 'Presto disponibile',
    comingSoonMsg: 'Questa funzione sarà disponibile in un prossimo aggiornamento.',
    tabShelves: 'Scaffali',
    tabBooks: 'Libri',
    breadcrumbShelves: 'Tutti gli scaffali',
    breadcrumbBooks: 'Tutti i libri',
    itemCountBooksLabel: 'libri',
    itemCountShelvesLabel: 'scaffali',
    addBookTitle: 'Aggiungi libro',
    editBookTitle: 'Modifica libro',
    addTabManual: 'Inserimento manuale',
    addTabSearchTitle: 'Cerca per titolo',
    addTabSearchIsbn: 'Cerca per ISBN',
    addTabScan: 'Scansiona ISBN',
    searchTitlePh: 'Titolo del libro',
    searchIsbnPh: 'ISBN',
    searchBtn: 'Cerca',
    searchLoading: 'Ricerca in corso...',
    searchNoResults: 'Nessun risultato trovato.',
    searchError: 'Ricerca non riuscita. Riprova.',
    scanStartBtn: 'Avvia scansione',
    scanStopBtn: 'Ferma scansione',
    scanScanning: 'Inquadra il codice a barre ISBN...',
    scanNotSupported: 'La scansione non è supportata su questo dispositivo o browser. Usa la ricerca per ISBN.',
    scanCameraError: 'Impossibile accedere alla fotocamera. Controlla i permessi del browser.',
    renameBtn: 'Rinomina',
    shelfMenuLabel: 'Altre azioni',
    drawerShowStats: 'Mostra statistiche',
    drawerHideStats: 'Nascondi statistiche',
    backToShelves: '← Scaffali',
    confirmDeleteBookTitle: 'Eliminare il libro?',
    confirmDeleteBookMsg: 'Questa azione non può essere annullata.'
  },
  en: {
    appTitle: '📚 My Library',
    addBtn: 'Add',
    saveBtn: 'Save changes',
    deleteBtn: 'Delete',
    emptyMsg: 'No books yet. Add one above!',
    phTitle: 'Title',
    phAuthor: 'Author',
    phPublisher: 'Publisher',
    phSeries: 'Series',
    phVolume: 'Volume',
    phIsbn: 'ISBN',
    phShelf: 'Shelf',
    statTotalLabel: 'Total',
    statReadLabel: 'Read',
    statOwnedLabel: 'Owned',
    statOnLoanLabel: 'On loan',
    currentLangLabel: 'English',
    currentLangFlag: '🇬🇧',
    newShelfPh: 'New shelf',
    addShelfBtn: 'Add shelf',
    noShelvesMsg: 'No shelves yet.',
    confirmDeleteShelfTitle: 'Delete this shelf?',
    confirmDeleteShelfMsg: 'Books on this shelf will become "No shelf".',
    confirmMergeTitle: 'Shelf already exists',
    confirmMergeMsg: 'A shelf with this name already exists. Do you want to merge the two shelves?',
    mergeYesBtn: 'Yes, merge',
    mergeNoBtn: 'No, edit name',
    modalCancelBtn: 'Cancel',
    modalConfirmBtn: 'Confirm',
    modalOkBtn: 'OK',
    duplicateShelfTitle: 'Shelf already exists',
    duplicateShelfMsg: 'A shelf with this name already exists (capitalization doesn\'t matter).',
    hamburgerTitle: 'Menu',
    searchTitle: 'Search',
    sortTitle: 'Sort',
    viewToggleTitle: 'Toggle view',
    filterTitle: 'Filter',
    closeDrawerTitle: 'Close menu',
    fabAddTitle: 'Add book',
    closeAddPanelTitle: 'Close',
    menuTitle: 'Menu',
    drawerLangLabel: 'Language',
    drawerImportExport: 'Import / Export',
    drawerDrive: 'Google Drive',
    comingSoonTitle: 'Coming soon',
    comingSoonMsg: 'This feature will be available in a future update.',
    tabShelves: 'Shelves',
    tabBooks: 'Books',
    breadcrumbShelves: 'All shelves',
    breadcrumbBooks: 'All books',
    itemCountBooksLabel: 'books',
    itemCountShelvesLabel: 'shelves',
    addBookTitle: 'Add book',
    editBookTitle: 'Edit book',
    addTabManual: 'Manual entry',
    addTabSearchTitle: 'Search by title',
    addTabSearchIsbn: 'Search by ISBN',
    addTabScan: 'Scan ISBN',
    searchTitlePh: 'Book title',
    searchIsbnPh: 'ISBN',
    searchBtn: 'Search',
    searchLoading: 'Searching...',
    searchNoResults: 'No results found.',
    searchError: 'Search failed. Please try again.',
    scanStartBtn: 'Start scanning',
    scanStopBtn: 'Stop scanning',
    scanScanning: 'Point the camera at the ISBN barcode...',
    scanNotSupported: 'Scanning is not supported on this device or browser. Please use ISBN search instead.',
    scanCameraError: 'Could not access the camera. Please check browser permissions.',
    renameBtn: 'Rename',
    shelfMenuLabel: 'More actions',
    drawerShowStats: 'Show stats',
    drawerHideStats: 'Hide stats',
    backToShelves: '← Shelves',
    confirmDeleteBookTitle: 'Delete this book?',
    confirmDeleteBookMsg: 'This action cannot be undone.'
  }
};

const valueTranslations = {
  it: {
    'Cartaceo': 'Cartaceo', 'Ebook': 'Ebook', 'Audiolibro': 'Audiolibro',
    'Da leggere': 'Da leggere', 'In lettura': 'In lettura', 'Letto': 'Letto',
    'Posseduto': 'Posseduto', 'In prestito': 'In prestito', 'Non posseduto': 'Non posseduto',
    'Italiano': 'Italiano', 'English': 'English', 'Français': 'Français', 'Deutsch': 'Deutsch', 'Español': 'Español',
    'Senza scaffale': 'Senza scaffale'
  },
  en: {
    'Cartaceo': 'Paperback', 'Ebook': 'Ebook', 'Audiolibro': 'Audiobook',
    'Da leggere': 'To read', 'In lettura': 'Reading', 'Letto': 'Read',
    'Posseduto': 'Owned', 'In prestito': 'On loan', 'Non posseduto': 'Not owned',
    'Italiano': 'Italian', 'English': 'English', 'Français': 'French', 'Deutsch': 'German', 'Español': 'Spanish',
    'Senza scaffale': 'No shelf'
  }
};

const LANG_CODE_MAP = {
  it: 'Italiano', ita: 'Italiano',
  en: 'English', eng: 'English',
  fr: 'Français', fre: 'Français', fra: 'Français',
  de: 'Deutsch', ger: 'Deutsch', deu: 'Deutsch',
  es: 'Español', spa: 'Español'
};

function getLang() {
  return localStorage.getItem(LANG_KEY) || 'it';
}

function translateValue(value) {
  const lang = getLang();
  return valueTranslations[lang][value] || value;
}

function translatePage(lang) {
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;

  const t = translations[lang];

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) el.textContent = t[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key]) el.placeholder = t[key];
  });

  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (t[key]) el.title = t[key];
  });

  document.querySelectorAll('option[data-i18n-option]').forEach(opt => {
    const canonicalValue = opt.getAttribute('data-i18n-option');
    opt.textContent = valueTranslations[lang][canonicalValue] || canonicalValue;
  });

  document.getElementById('langToggleFlag').textContent = t.currentLangFlag;
  document.getElementById('langToggleLabel').textContent = t.currentLangLabel;

  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  applyStatsVisibility();
  refreshAddPanelLabels();
  renderAll();
}

function getBooks() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveBooks(books) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}

function updateStats() {
  const books = getBooks();
  document.getElementById('statTotal').textContent = books.length;
  document.getElementById('statRead').textContent = books.filter(b => b.status === 'Letto').length;
  document.getElementById('statOwned').textContent = books.filter(b => b.ownership === 'Posseduto').length;
  document.getElementById('statOnLoan').textContent = books.filter(b => b.ownership === 'In prestito').length;
}

function renderAll() {
  updateStats();
  renderShelvesView();
  renderBooksView();
  updatePathRow();
}

function addBook(data) {
  const books = getBooks();
  books.push({ id: Date.now().toString(), ...data });
  saveBooks(books);
  renderAll();
}

function updateBook(id, data) {
  const books = getBooks().map(b => (b.id === id ? { ...b, ...data } : b));
  saveBooks(books);
  renderAll();
}

function deleteBook(id) {
  const books = getBooks().filter(b => b.id !== id);
  saveBooks(books);
  renderAll();
}

function getSurname(author) {
  const parts = (author || '').trim().split(/\s+/);
  return parts.length && parts[0] !== '' ? parts[parts.length - 1] : '#';
}

function renderBooksView() {
  const allBooks = getBooks();
  const books = shelfFilter
    ? allBooks.filter(b => (b.shelf || '').toLowerCase() === shelfFilter.toLowerCase())
    : allBooks;
  const container = document.getElementById('bookGroups');
  const emptyMsg = document.getElementById('emptyMsg');
  const azIndex = document.getElementById('azIndex');
  container.innerHTML = '';
  azIndex.innerHTML = '';

  if (books.length === 0) {
    emptyMsg.style.display = 'block';
    return;
  }
  emptyMsg.style.display = 'none';

  const groups = {};
  books.forEach(b => {
    const surname = getSurname(b.author);
    const letter = surname.charAt(0).toLocaleUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(b);
  });

  const presentLetters = Object.keys(groups).sort();
  presentLetters.forEach(letter => {
    groups[letter].sort((a, b) =>
      getSurname(a.author).localeCompare(getSurname(b.author)) || a.title.localeCompare(b.title)
    );
  });

  presentLetters.forEach(letter => {
    const heading = document.createElement('div');
    heading.className = 'group-heading';
    heading.id = 'group-' + letter;
    heading.textContent = letter;
    container.appendChild(heading);

    groups[letter].forEach(book => {
      const row = document.createElement('div');
      row.className = 'book-row';
      row.dataset.id = book.id;
      const coverInner = book.cover
        ? `<img src="${escapeHtml(book.cover)}" alt="" onerror="this.remove(); this.parentElement.textContent='📖';">`
        : '📖';
      row.innerHTML = `
        <div class="book-cover-placeholder">${coverInner}</div>
        <div class="book-info">
          <strong>${escapeHtml(book.title)}</strong>
          <div class="sub">${escapeHtml(book.author)}</div>
          <div class="badges">
            <span class="badge">${escapeHtml(translateValue(book.status))}</span>
            <span class="badge">${escapeHtml(translateValue(book.format))}</span>
          </div>
        </div>
      `;
      row.addEventListener('click', () => openAddPanel(book));
      container.appendChild(row);
    });
  });

  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
    const btn = document.createElement('button');
    btn.textContent = letter;
    if (presentLetters.includes(letter)) {
      btn.classList.add('active-letter');
      btn.addEventListener('click', () => {
        const target = document.getElementById('group-' + letter);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } else {
      btn.disabled = true;
    }
    azIndex.appendChild(btn);
  });
}

function getShelves() {
  const raw = localStorage.getItem(SHELVES_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveShelves(shelves) {
  localStorage.setItem(SHELVES_KEY, JSON.stringify(shelves));
}

function initShelvesFromBooks() {
  if (localStorage.getItem(SHELVES_KEY) !== null) return;
  const names = [];
  getBooks().forEach(b => {
    const shelf = (b.shelf || '').trim();
    if (shelf && !names.some(n => n.toLowerCase() === shelf.toLowerCase())) {
      names.push(shelf);
    }
  });
  saveShelves(names);
}

function renderShelvesView() {
  const shelves = getShelves();
  const books = getBooks();
  const list = document.getElementById('shelfList');
  const emptyMsg = document.getElementById('noShelvesMsg');
  const t = translations[getLang()];
  list.innerHTML = '';

  if (shelves.length === 0) {
    emptyMsg.style.display = 'block';
    renderShelfOptions();
    return;
  }
  emptyMsg.style.display = 'none';

  shelves.forEach(name => {
    const count = books.filter(b => (b.shelf || '').toLowerCase() === name.toLowerCase()).length;
    const li = document.createElement('li');
    li.className = 'shelf-row';
    li.innerHTML = `
      <span class="shelf-thumb">🗂️</span>
      <div class="shelf-main">
        <span class="shelf-name" tabindex="0" data-shelf="${escapeHtml(name)}">${escapeHtml(name)}</span>
        <span class="shelf-count">${count} ${escapeHtml(t.itemCountBooksLabel)}</span>
      </div>
      <button class="shelf-menu-btn" data-shelf="${escapeHtml(name)}" aria-label="${escapeHtml(t.shelfMenuLabel)}">⋮</button>
      <div class="shelf-menu" hidden>
        <button type="button" class="shelf-rename-opt">${escapeHtml(t.renameBtn)}</button>
        <button type="button" class="shelf-delete-opt">${escapeHtml(t.deleteBtn)}</button>
      </div>
    `;
    list.appendChild(li);
  });

  list.querySelectorAll('.shelf-row').forEach(row => {
    const name = row.querySelector('.shelf-name').dataset.shelf;
    row.querySelector('.shelf-thumb').addEventListener('click', () => viewShelfBooks(name));
    row.querySelector('.shelf-main').addEventListener('click', () => viewShelfBooks(name));
  });

  list.querySelectorAll('.shelf-menu-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const menu = btn.nextElementSibling;
      const wasHidden = menu.hidden;
      closeAllShelfMenus();
      menu.hidden = !wasHidden;
    });
  });

  list.querySelectorAll('.shelf-row').forEach(row => {
    const name = row.querySelector('.shelf-name').dataset.shelf;
    const menu = row.querySelector('.shelf-menu');
    menu.querySelector('.shelf-rename-opt').addEventListener('click', () => {
      menu.hidden = true;
      startEditShelf(row.querySelector('.shelf-name'));
    });
    menu.querySelector('.shelf-delete-opt').addEventListener('click', () => {
      menu.hidden = true;
      confirmDeleteShelf(name);
    });
  });

  renderShelfOptions();
}

function closeAllShelfMenus() {
  document.querySelectorAll('.shelf-menu').forEach(m => m.hidden = true);
}

function renderShelfOptions() {
  const select = document.getElementById('shelfInput');
  if (!select) return;

  const previousValue = select.value;
  const shelves = getShelves();
  select.innerHTML = '';

  const noneOpt = document.createElement('option');
  noneOpt.value = '';
  noneOpt.textContent = translateValue('Senza scaffale');
  select.appendChild(noneOpt);

  shelves.forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = name;
    select.appendChild(opt);
  });

  if (shelves.includes(previousValue)) {
    select.value = previousValue;
  }
}

function addShelf() {
  const input = document.getElementById('newShelfInput');
  const name = input.value.trim();
  if (!name) return;

  const shelves = getShelves();
  const exists = shelves.some(s => s.toLowerCase() === name.toLowerCase());
  if (exists) {
    const t = translations[getLang()];
    showModal({
      title: t.duplicateShelfTitle,
      msg: t.duplicateShelfMsg,
      primaryLabel: t.modalOkBtn,
      onPrimary: hideModal
    });
    return;
  }

  shelves.push(name);
  saveShelves(shelves);
  input.value = '';
  renderAll();
}

function confirmDeleteShelf(name) {
  const t = translations[getLang()];
  showModal({
    title: t.confirmDeleteShelfTitle,
    msg: t.confirmDeleteShelfMsg,
    primaryLabel: t.modalConfirmBtn,
    secondaryLabel: t.modalCancelBtn,
    onPrimary: () => { deleteShelf(name); hideModal(); },
    onSecondary: hideModal
  });
}

function deleteShelf(name) {
  const shelves = getShelves().filter(s => s.toLowerCase() !== name.toLowerCase());
  saveShelves(shelves);

  const books = getBooks().map(b =>
    (b.shelf && b.shelf.toLowerCase() === name.toLowerCase()) ? { ...b, shelf: '' } : b
  );
  saveBooks(books);

  renderAll();
}

function startEditShelf(span) {
  const oldName = span.dataset.shelf;
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'shelf-edit-input';
  input.value = oldName;
  span.replaceWith(input);
  input.focus();
  input.select();

  let settled = false;
  function finish(commit) {
    if (settled) return;
    settled = true;
    if (!commit) { renderAll(); return; }

    const newName = input.value.trim();
    if (!newName || newName.toLowerCase() === oldName.toLowerCase()) {
      renderAll();
      return;
    }
    attemptRenameShelf(oldName, newName);
  }

  input.addEventListener('blur', () => finish(true));
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') finish(true);
    if (e.key === 'Escape') finish(false);
  });
}

function attemptRenameShelf(oldName, newName) {
  const shelves = getShelves();
  const duplicate = shelves.find(s =>
    s.toLowerCase() === newName.toLowerCase() && s.toLowerCase() !== oldName.toLowerCase()
  );

  if (duplicate) {
    const t = translations[getLang()];
    showModal({
      title: t.confirmMergeTitle,
      msg: t.confirmMergeMsg,
      primaryLabel: t.mergeYesBtn,
      secondaryLabel: t.mergeNoBtn,
      onPrimary: () => { mergeShelves(oldName, duplicate); hideModal(); },
      onSecondary: () => { hideModal(); renderAll(); }
    });
    return;
  }

  renameShelf(oldName, newName);
}

function renameShelf(oldName, newName) {
  const shelves = getShelves().map(s => s.toLowerCase() === oldName.toLowerCase() ? newName : s);
  saveShelves(shelves);

  const books = getBooks().map(b =>
    (b.shelf && b.shelf.toLowerCase() === oldName.toLowerCase()) ? { ...b, shelf: newName } : b
  );
  saveBooks(books);

  renderAll();
}

function mergeShelves(oldName, targetName) {
  const shelves = getShelves().filter(s => s.toLowerCase() !== oldName.toLowerCase());
  saveShelves(shelves);

  const books = getBooks().map(b =>
    (b.shelf && b.shelf.toLowerCase() === oldName.toLowerCase()) ? { ...b, shelf: targetName } : b
  );
  saveBooks(books);

  renderAll();
}

function showModal({ title, msg, primaryLabel, secondaryLabel, onPrimary, onSecondary }) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalMsg').textContent = msg;
  const primaryBtn = document.getElementById('modalBtnPrimary');
  const secondaryBtn = document.getElementById('modalBtnSecondary');
  primaryBtn.textContent = primaryLabel;
  primaryBtn.onclick = onPrimary;

  if (secondaryLabel) {
    secondaryBtn.textContent = secondaryLabel;
    secondaryBtn.onclick = onSecondary;
    secondaryBtn.style.display = '';
  } else {
    secondaryBtn.style.display = 'none';
  }

  document.getElementById('modalOverlay').hidden = false;
}

function hideModal() {
  document.getElementById('modalOverlay').hidden = true;
}

function switchTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  document.getElementById('shelvesView').hidden = tab !== 'shelves';
  document.getElementById('booksView').hidden = tab !== 'books';
  updatePathRow();
}

function updatePathRow() {
  const t = translations[getLang()];
  const breadcrumb = document.getElementById('breadcrumb');
  const itemCount = document.getElementById('itemCount');
  breadcrumb.innerHTML = '';

  if (currentTab === 'shelves') {
    breadcrumb.textContent = t.breadcrumbShelves;
    itemCount.textContent = `${getShelves().length} ${t.itemCountShelvesLabel}`;
  } else if (shelfFilter) {
    const back = document.createElement('span');
    back.textContent = t.backToShelves;
    back.style.cursor = 'pointer';
    back.style.textDecoration = 'underline';
    back.addEventListener('click', () => {
      shelfFilter = null;
      switchTab('shelves');
    });
    breadcrumb.appendChild(back);
    breadcrumb.append(' / ' + shelfFilter);

    const count = getBooks().filter(b => (b.shelf || '').toLowerCase() === shelfFilter.toLowerCase()).length;
    itemCount.textContent = `${count} ${t.itemCountBooksLabel}`;
  } else {
    breadcrumb.textContent = t.breadcrumbBooks;
    itemCount.textContent = `${getBooks().length} ${t.itemCountBooksLabel}`;
  }
}

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    shelfFilter = null;
    switchTab(btn.dataset.tab);
    renderBooksView();
  });
});

function viewShelfBooks(name) {
  shelfFilter = name;
  switchTab('books');
  renderBooksView();
}

function showComingSoon() {
  const t = translations[getLang()];
  showModal({
    title: t.comingSoonTitle,
    msg: t.comingSoonMsg,
    primaryLabel: t.modalOkBtn,
    onPrimary: hideModal
  });
}
document.getElementById('searchIconBtn').addEventListener('click', showComingSoon);
document.getElementById('sortIconBtn').addEventListener('click', showComingSoon);
document.getElementById('viewToggleBtn').addEventListener('click', showComingSoon);
document.getElementById('filterBtn').addEventListener('click', showComingSoon);
document.getElementById('drawerImportExport').addEventListener('click', showComingSoon);
document.getElementById('drawerDrive').addEventListener('click', showComingSoon);

const STATS_VISIBLE_KEY = 'biblioteca_stats_visible';

function getStatsVisible() {
  const v = localStorage.getItem(STATS_VISIBLE_KEY);
  return v === null ? true : v === 'true';
}

function applyStatsVisibility() {
  const visible = getStatsVisible();
  document.getElementById('statsBar').style.display = visible ? 'flex' : 'none';
  const t = translations[getLang()];
  document.getElementById('drawerToggleStats').textContent = visible ? t.drawerHideStats : t.drawerShowStats;
}

document.getElementById('drawerToggleStats').addEventListener('click', () => {
  localStorage.setItem(STATS_VISIBLE_KEY, (!getStatsVisible()).toString());
  applyStatsVisibility();
});

function openDrawer() {
  document.getElementById('sideDrawer').hidden = false;
  document.getElementById('drawerOverlay').hidden = false;
}
function closeDrawer() {
  document.getElementById('sideDrawer').hidden = true;
  document.getElementById('drawerOverlay').hidden = true;
}
document.getElementById('hamburgerBtn').addEventListener('click', openDrawer);
document.getElementById('closeDrawerBtn').addEventListener('click', closeDrawer);
document.getElementById('drawerOverlay').addEventListener('click', closeDrawer);

function fillForm(book) {
  document.getElementById('titleInput').value = book.title || '';
  document.getElementById('authorInput').value = book.author || '';
  document.getElementById('publisherInput').value = book.publisher || '';
  document.getElementById('seriesInput').value = book.series || '';
  document.getElementById('volumeInput').value = book.volume || '';
  document.getElementById('isbnInput').value = book.isbn || '';
  document.getElementById('coverInput').value = book.cover || '';
  renderShelfOptions();
  document.getElementById('shelfInput').value = book.shelf || '';
  document.getElementById('languageInput').value = book.language || 'Italiano';
  document.getElementById('formatInput').value = book.format || 'Cartaceo';
  document.getElementById('statusInput').value = book.status || 'Da leggere';
  document.getElementById('ownershipInput').value = book.ownership || 'Posseduto';
}

function resetForm() {
  document.getElementById('addForm').reset();
  document.getElementById('coverInput').value = '';
  renderShelfOptions();
}

function openAddPanel(book) {
  const t = translations[getLang()];
  editingBookId = book ? book.id : null;

  if (book) {
    fillForm(book);
  } else {
    resetForm();
  }
  refreshAddPanelLabels();

  document.getElementById('searchTitleTabBtn').style.display = editingBookId ? 'none' : '';
  document.getElementById('searchIsbnTabBtn').style.display = editingBookId ? 'none' : '';
  document.getElementById('scanIsbnTabBtn').style.display = editingBookId ? 'none' : '';
  document.getElementById('searchTitleInput').value = '';
  document.getElementById('searchTitleResults').innerHTML = '';
  document.getElementById('searchIsbnInput').value = '';
  document.getElementById('searchIsbnResults').innerHTML = '';
  stopScan();
  switchAddTab('manual');

  document.getElementById('addPanelOverlay').hidden = false;
}

function closeAddPanel() {
  stopScan();
  document.getElementById('addPanelOverlay').hidden = true;
  editingBookId = null;
}

function refreshAddPanelLabels() {
  const t = translations[getLang()];
  document.getElementById('addPanelTitle').textContent = editingBookId ? t.editBookTitle : t.addBookTitle;
  document.getElementById('submitBookBtn').textContent = editingBookId ? t.saveBtn : t.addBtn;
  document.getElementById('deleteBookBtn').style.display = editingBookId ? 'block' : 'none';
}

document.getElementById('fabAdd').addEventListener('click', () => openAddPanel());
document.getElementById('closeAddPanelBtn').addEventListener('click', closeAddPanel);
document.getElementById('addPanelOverlay').addEventListener('click', (e) => {
  if (e.target.id === 'addPanelOverlay') closeAddPanel();
});

document.getElementById('deleteBookBtn').addEventListener('click', () => {
  if (!editingBookId) return;
  const t = translations[getLang()];
  const idToDelete = editingBookId;
  showModal({
    title: t.confirmDeleteBookTitle,
    msg: t.confirmDeleteBookMsg,
    primaryLabel: t.modalConfirmBtn,
    secondaryLabel: t.modalCancelBtn,
    onPrimary: () => { deleteBook(idToDelete); hideModal(); closeAddPanel(); },
    onSecondary: hideModal
  });
});

document.getElementById('addShelfBtn').addEventListener('click', addShelf);
document.getElementById('newShelfInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addShelf();
});

document.getElementById('addForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const fields = {
    title: document.getElementById('titleInput'),
    author: document.getElementById('authorInput'),
    publisher: document.getElementById('publisherInput'),
    series: document.getElementById('seriesInput'),
    volume: document.getElementById('volumeInput'),
    isbn: document.getElementById('isbnInput'),
    cover: document.getElementById('coverInput'),
    shelf: document.getElementById('shelfInput'),
    language: document.getElementById('languageInput'),
    format: document.getElementById('formatInput'),
    status: document.getElementById('statusInput'),
    ownership: document.getElementById('ownershipInput'),
  };

  const data = {
    title: fields.title.value.trim(),
    author: fields.author.value.trim(),
    publisher: fields.publisher.value.trim(),
    series: fields.series.value.trim(),
    volume: fields.volume.value.trim(),
    isbn: fields.isbn.value.trim(),
    cover: fields.cover.value.trim(),
    shelf: fields.shelf.value.trim(),
    language: fields.language.value,
    format: fields.format.value,
    status: fields.status.value,
    ownership: fields.ownership.value,
  };

  // Step 11: if this is a new book with an ISBN but no cover yet
  // (e.g. manual entry, or a search result that had no image),
  // try to fetch one automatically before saving.
  if (!editingBookId && data.isbn && !data.cover) {
    const submitBtn = document.getElementById('submitBookBtn');
    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = '...';
    try {
      const fetchedCover = await fetchCoverByIsbn(data.isbn);
      if (fetchedCover) data.cover = fetchedCover;
    } catch (err) {
      // fetching failed — the placeholder icon will be used instead
    }
    submitBtn.disabled = false;
    submitBtn.textContent = originalLabel;
  }

  if (editingBookId) {
    updateBook(editingBookId, data);
  } else {
    addBook(data);
  }

  closeAddPanel();
});

function switchAddTab(tab) {
  document.querySelectorAll('.add-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tab);
  });
  document.getElementById('manualTabPanel').hidden = tab !== 'manual';
  document.getElementById('searchTitlePanel').hidden = tab !== 'searchTitle';
  document.getElementById('searchIsbnPanel').hidden = tab !== 'searchIsbn';
  document.getElementById('scanIsbnPanel').hidden = tab !== 'scanIsbn';
  if (tab !== 'scanIsbn') stopScan();
}
document.querySelectorAll('.add-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => switchAddTab(btn.dataset.tab));
});

async function fetchGoogleBooks(url) {
  const fullUrl = GOOGLE_BOOKS_API_KEY
    ? `${url}&key=${encodeURIComponent(GOOGLE_BOOKS_API_KEY)}`
    : url;
  const res = await fetch(fullUrl);
  if (!res.ok) throw new Error('Google Books request failed');
  const data = await res.json();
  return data.items || [];
}

async function fetchOpenLibrary(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Open Library request failed');
  const data = await res.json();
  return data.docs || [];
}

function normalizeGoogleBooksItem(item) {
  const vi = item.volumeInfo || {};
  const ids = vi.industryIdentifiers || [];
  const isbn13 = ids.find(id => id.type === 'ISBN_13');
  const isbn10 = ids.find(id => id.type === 'ISBN_10');
  const isbn = (isbn13 || isbn10 || {}).identifier || '';
  const images = vi.imageLinks || {};
  return {
    title: vi.title || '',
    author: (vi.authors && vi.authors[0]) || '',
    publisher: vi.publisher || '',
    isbn: isbn,
    language: vi.language || '',
    year: vi.publishedDate ? vi.publishedDate.slice(0, 4) : '',
    coverThumb: images.smallThumbnail || images.thumbnail || '',
    coverFull: images.thumbnail || images.smallThumbnail || ''
  };
}

function normalizeOpenLibraryDoc(doc) {
  return {
    title: doc.title || '',
    author: (doc.author_name && doc.author_name[0]) || '',
    publisher: (doc.publisher && doc.publisher[0]) || '',
    isbn: (doc.isbn && doc.isbn[0]) || '',
    language: (doc.language && doc.language[0]) || '',
    year: doc.first_publish_year || '',
    coverThumb: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-S.jpg` : '',
    coverFull: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg` : ''
  };
}

async function fetchGoogleBooksByTitle(query) {
  const items = await fetchGoogleBooks(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(query)}&maxResults=10`);
  return items.map(normalizeGoogleBooksItem);
}

async function fetchGoogleBooksByIsbn(query) {
  const items = await fetchGoogleBooks(`https://www.googleapis.com/books/v1/volumes?q=isbn:${encodeURIComponent(query)}&maxResults=10`);
  return items.map(normalizeGoogleBooksItem);
}

async function fetchOpenLibraryByTitle(query) {
  const docs = await fetchOpenLibrary(`https://openlibrary.org/search.json?title=${encodeURIComponent(query)}&limit=10`);
  return docs.map(normalizeOpenLibraryDoc);
}

async function fetchOpenLibraryByIsbn(query) {
  const docs = await fetchOpenLibrary(`https://openlibrary.org/search.json?isbn=${encodeURIComponent(query)}&limit=10`);
  return docs.map(normalizeOpenLibraryDoc);
}

// --- Automatic cover image fetching by ISBN (Step 11) ---
// Fallback order per requirements: Google Books -> Open Library -> Amazon.
// Note: Amazon has no free public search API (flagged in the requirements
// doc), so that step is skipped here for now — if no cover is found via
// Google Books or Open Library, the placeholder icon is used instead.
async function fetchCoverByIsbn(isbn) {
  if (!isbn) return '';

  try {
    const googleResults = await fetchGoogleBooksByIsbn(isbn);
    const withCover = googleResults.find(r => r.coverFull);
    if (withCover) return withCover.coverFull;
  } catch (err) {
    // Google Books failed — fall through to Open Library
  }

  try {
    const olResults = await fetchOpenLibraryByIsbn(isbn);
    const withCover = olResults.find(r => r.coverFull);
    if (withCover) return withCover.coverFull;
  } catch (err) {
    // Open Library failed too — falls through to placeholder
  }

  return '';
}

function renderSearchResults(container, results) {
  const t = translations[getLang()];
  container.innerHTML = '';

  if (!results.length) {
    const p = document.createElement('p');
    p.className = 'search-no-results';
    p.textContent = t.searchNoResults;
    container.appendChild(p);
    return;
  }

  results.forEach(r => {
    const item = document.createElement('div');
    item.className = 'search-result-item';
    item.innerHTML = `
      <div class="search-result-cover">${r.coverThumb ? `<img src="${r.coverThumb}" alt="">` : '📖'}</div>
      <div class="search-result-info">
        <strong>${escapeHtml(r.title)}</strong>
        <div class="sub">${escapeHtml(r.author)}${r.year ? ' · ' + escapeHtml(String(r.year)) : ''}</div>
      </div>
    `;
    item.addEventListener('click', () => selectSearchResult(r));
    container.appendChild(item);
  });
}

function selectSearchResult(r) {
  document.getElementById('titleInput').value = r.title || '';
  document.getElementById('authorInput').value = r.author || '';
  document.getElementById('publisherInput').value = r.publisher || '';
  document.getElementById('isbnInput').value = r.isbn || '';

  const mappedLang = LANG_CODE_MAP[r.language];
  if (mappedLang) {
    document.getElementById('languageInput').value = mappedLang;
  }

  document.getElementById('coverInput').value = r.coverFull || '';

  switchAddTab('manual');
}

async function searchWithFallback(googleFn, openLibraryFn, query) {
  try {
    const googleResults = await googleFn(query);
    if (googleResults.length) return googleResults;
  } catch (err) {
    // Google Books failed outright — fall through to Open Library
  }
  return openLibraryFn(query);
}

async function runTitleSearch() {
  const query = document.getElementById('searchTitleInput').value.trim();
  const resultsEl = document.getElementById('searchTitleResults');
  if (!query) return;
  const t = translations[getLang()];
  resultsEl.innerHTML = `<p class="search-status">${escapeHtml(t.searchLoading)}</p>`;
  try {
    const results = await searchWithFallback(fetchGoogleBooksByTitle, fetchOpenLibraryByTitle, query);
    renderSearchResults(resultsEl, results);
  } catch (err) {
    resultsEl.innerHTML = `<p class="search-status">${escapeHtml(t.searchError)}</p>`;
  }
}

async function runIsbnSearch() {
  const query = document.getElementById('searchIsbnInput').value.trim();
  const resultsEl = document.getElementById('searchIsbnResults');
  if (!query) return;
  const t = translations[getLang()];
  resultsEl.innerHTML = `<p class="search-status">${escapeHtml(t.searchLoading)}</p>`;
  try {
    const results = await searchWithFallback(fetchGoogleBooksByIsbn, fetchOpenLibraryByIsbn, query);
    renderSearchResults(resultsEl, results);
  } catch (err) {
    resultsEl.innerHTML = `<p class="search-status">${escapeHtml(t.searchError)}</p>`;
  }
}

document.getElementById('searchTitleBtn').addEventListener('click', runTitleSearch);
document.getElementById('searchTitleInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); runTitleSearch(); }
});
document.getElementById('searchIsbnBtn').addEventListener('click', runIsbnSearch);
document.getElementById('searchIsbnInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); runIsbnSearch(); }
});

// --- ISBN barcode scanning via device camera (Step 10) ---
// Uses the browser's built-in BarcodeDetector API — no external library needed.
// Supported on Chrome/Edge (Android and desktop). Where it isn't supported,
// we show a friendly message and the person can fall back to ISBN search.

let scanStream = null;
let scanRafId = null;

function isScanSupported() {
  return ('BarcodeDetector' in window) && !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

function showScanStatus(msg) {
  const el = document.getElementById('scanStatus');
  el.textContent = msg;
  el.style.display = 'block';
}

async function startScan() {
  const t = translations[getLang()];

  if (!isScanSupported()) {
    showScanStatus(t.scanNotSupported);
    return;
  }

  let detector;
  try {
    detector = new BarcodeDetector({ formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e'] });
  } catch (err) {
    showScanStatus(t.scanNotSupported);
    return;
  }

  try {
    scanStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
  } catch (err) {
    showScanStatus(t.scanCameraError);
    return;
  }

  const video = document.getElementById('scanVideo');
  video.srcObject = scanStream;
  try {
    await video.play();
  } catch (err) {
    // stream still runs even if play() is briefly rejected
  }

  document.getElementById('scanVideoWrap').style.display = 'block';
  document.getElementById('scanStartBtn').style.display = 'none';
  showScanStatus(t.scanScanning);

  scanLoop(video, detector);
}

async function scanLoop(video, detector) {
  if (!scanStream) return;

  try {
    const barcodes = await detector.detect(video);
    if (barcodes.length) {
      const digitsOnly = (barcodes[0].rawValue || '').replace(/[^0-9Xx]/g, '');
      if (digitsOnly) {
        handleScannedIsbn(digitsOnly);
        return;
      }
    }
  } catch (err) {
    // one failed detection frame isn't fatal — keep trying
  }

  scanRafId = requestAnimationFrame(() => scanLoop(video, detector));
}

function stopScan() {
  if (scanRafId) {
    cancelAnimationFrame(scanRafId);
    scanRafId = null;
  }
  if (scanStream) {
    scanStream.getTracks().forEach(track => track.stop());
    scanStream = null;
  }
  const video = document.getElementById('scanVideo');
  video.srcObject = null;
  document.getElementById('scanVideoWrap').style.display = 'none';
  document.getElementById('scanStartBtn').style.display = 'block';
  document.getElementById('scanStatus').style.display = 'none';
}

function handleScannedIsbn(isbn) {
  stopScan();
  document.getElementById('searchIsbnInput').value = isbn;
  switchAddTab('searchIsbn');
  runIsbnSearch();
}

document.getElementById('scanStartBtn').addEventListener('click', startScan);
document.getElementById('scanStopBtn').addEventListener('click', stopScan);

const langToggle = document.getElementById('langToggle');
const langMenu = document.getElementById('langMenu');

function closeLangMenu() {
  langMenu.hidden = true;
  langToggle.setAttribute('aria-expanded', 'false');
}
function openLangMenu() {
  langMenu.hidden = false;
  langToggle.setAttribute('aria-expanded', 'true');
}
langToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  if (langMenu.hidden) openLangMenu(); else closeLangMenu();
});
document.querySelectorAll('.lang-option').forEach(btn => {
  btn.addEventListener('click', () => {
    translatePage(btn.dataset.lang);
    closeLangMenu();
  });
});

document.addEventListener('click', (e) => {
  if (!langMenu.hidden && !e.target.closest('.lang-dropdown')) closeLangMenu();
  closeAllShelfMenus();
});

initShelvesFromBooks();
switchTab('books');
translatePage(getLang());
