// ── NAMMA-PUSTAKA MAIN APP ────────────────────────────────────────

function switchTab(tab) {
  state.tab = tab;
  state.searchQuery = '';
  document.getElementById('globalSearch').value = '';
  document.getElementById('clearSearch').style.display = 'none';
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const btn = document.getElementById('tab-' + tab);
  if (btn) btn.classList.add('active');
  render();
}

function handleSearch(v) {
  state.searchQuery = v;
  document.getElementById('clearSearch').style.display = v ? 'flex' : 'none';
  if (state.tab !== 'catalog') {
    state.tab = 'catalog';
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('tab-catalog').classList.add('active');
  }
  render();
}

function clearSearch() {
  state.searchQuery = '';
  document.getElementById('globalSearch').value = '';
  document.getElementById('clearSearch').style.display = 'none';
  render();
}

function setCategory(cat) {
  state.category = cat;
  render();
}

function returnBook(bookId) { openModal('return', bookId); }

function render() {
  let html = '';
  if (state.tab === 'catalog')      html = renderCatalog();
  else if (state.tab === 'borrow')  html = renderQRBorrow();
  else if (state.tab === 'transactions') html = renderTransactions();
  else if (state.tab === 'reviews') html = renderReviews();
  else if (state.tab === 'leaderboard') html = renderLeaderboard();
  else if (state.tab === 'addbook') html = renderAddBook();
  else if (state.tab === 'students') html = renderStudents();

  document.getElementById('mainContent').innerHTML = html;
  updateNotifyBadge();

  if (state.modalType) renderModal();

  // Animate leaderboard bars
  setTimeout(() => {
    document.querySelectorAll('[data-width]').forEach(el => { el.style.width = el.dataset.width; });
  }, 80);
}

// Init
render();
