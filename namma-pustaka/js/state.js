// ── NAMMA-PUSTAKA STATE ───────────────────────────────────────────

let state = {
  tab: 'catalog',
  category: 'All',
  searchQuery: '',
  books: JSON.parse(JSON.stringify(SEED_BOOKS)),
  students: JSON.parse(JSON.stringify(SEED_STUDENTS)),
  history: JSON.parse(JSON.stringify(SEED_HISTORY)),
  selectedBook: null,
  modalType: null,
  starRating: 4,
};
