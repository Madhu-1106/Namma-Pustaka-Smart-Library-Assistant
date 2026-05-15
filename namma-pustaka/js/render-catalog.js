// ── CATALOG TAB ───────────────────────────────────────────────────

function renderCatalog() {
  const books  = filteredBooks();
  const total  = state.books.length;
  const avail  = state.books.filter(b => b.status === 'available').length;
  const ov     = overdueCount();
  const borrow = borrowedCount() - ov;
  const categories = ['All','Story','Science','History','Nature','Math','Art','Health','Sports'];

  let html = `
  <div class="stats">
    <div class="stat"><div class="stat-num">${total}</div><div class="stat-label">📚 Total Books</div></div>
    <div class="stat"><div class="stat-num">${avail}</div><div class="stat-label">✅ Available</div></div>
    <div class="stat"><div class="stat-num amber">${borrow}</div><div class="stat-label">📤 Borrowed</div></div>
    <div class="stat"><div class="stat-num red">${ov}</div><div class="stat-label">⚠️ Overdue</div></div>
  </div>`;

  if (ov > 0) {
    html += `<div class="overdue-alert">
      <i class="ti ti-alert-triangle"></i>
      <span><b>${ov} book${ov > 1 ? 's' : ''} overdue!</b> Please remind students to return them promptly.</span>
    </div>`;
  }

  // Category filters
  html += `<div class="cat-tabs">`;
  categories.forEach(c => {
    html += `<button class="cat-btn ${state.category === c ? 'active' : ''}" onclick="setCategory('${c}')">
      ${c === 'All' ? '📚 All' : EMOJIS[c] + ' ' + c}
    </button>`;
  });
  html += `</div>`;

  if (books.length === 0) {
    html += `<div class="empty"><i class="ti ti-search"></i>No books found for "${state.searchQuery || state.category}"</div>`;
  } else {
    html += `<div style="font-size:12px;color:var(--text3);margin-bottom:10px">Showing ${books.length} book${books.length !== 1 ? 's' : ''}</div>`;
    html += `<div class="book-grid">`;
    books.forEach((b, idx) => {
      const badge = b.status === 'available'
        ? '<span class="book-badge badge-available">Available</span>'
        : b.status === 'overdue'
          ? `<span class="book-badge badge-overdue">Overdue</span>`
          : `<span class="book-badge badge-borrowed">Borrowed</span>`;

      html += `<div class="book-card" onclick="openModal('bookDetail',${b.id})" style="animation-delay:${idx * 0.03}s">
        <div class="book-cover" style="background:${b.color}">${b.emoji}${badge}</div>
        <div class="book-info">
          <div class="book-title">${b.title}</div>
          <div class="book-author">${b.author}</div>
          ${b.rating > 0 ? starsHtml(b.rating) : '<span style="font-size:11px;color:var(--text3)">No reviews yet</span>'}
        </div>
      </div>`;
    });
    html += `</div>`;
  }
  return html;
}
