// ── REVIEWS TAB ───────────────────────────────────────────────────

function renderReviews() {
  const allReviews = [];
  state.books.forEach(b => b.reviews.forEach(r => allReviews.push({...r, book:b.title, bookId:b.id, emoji:b.emoji})));

  // Top-rated books
  const topBooks = [...state.books].filter(b => b.rating > 0).sort((a,b) => b.rating - a.rating).slice(0, 3);

  let html = ``;

  // Top rated mini
  if (topBooks.length) {
    html += `<div class="card">
      <div class="card-title"><i class="ti ti-award"></i>Top Rated Books</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px">`;
    topBooks.forEach((b, i) => {
      const medals = ['🥇','🥈','🥉'];
      html += `<div style="display:flex;align-items:center;gap:10px;padding:10px;background:var(--bg);border-radius:10px;cursor:pointer" onclick="openModal('bookDetail',${b.id})">
        <span style="font-size:28px">${b.emoji}</span>
        <div>
          <div style="font-size:12px;font-weight:600;line-height:1.3">${medals[i] || ''} ${b.title}</div>
          ${starsHtml(b.rating)}
        </div>
      </div>`;
    });
    html += `</div></div>`;
  }

  html += `<div class="card">
    <div class="card-title"><i class="ti ti-star"></i>Review Corner (${allReviews.length})</div>
    <div style="display:flex;justify-content:flex-end;margin-bottom:14px">
      <button class="btn btn-primary" onclick="openModal('review',null)">
        <i class="ti ti-pencil"></i>Write a Review
      </button>
    </div>`;

  if (allReviews.length === 0) {
    html += `<div class="empty"><i class="ti ti-star"></i>No reviews yet. Be the first to share your thoughts!</div>`;
  } else {
    allReviews.slice().reverse().forEach(r => {
      html += `<div class="review-card">
        <div class="review-meta">
          <div class="avatar" style="background:${r.avatar || '#1D9E75'}">${r.student.slice(0,2).toUpperCase()}</div>
          <div>
            <div style="font-size:13px;font-weight:600">${r.student}
              <span style="color:var(--text3);font-weight:400">· Class ${r.class}</span>
            </div>
            <div style="font-size:11px;color:var(--text3)">${r.emoji} ${r.book}</div>
          </div>
          <div style="margin-left:auto">${starsHtml(r.rating)}</div>
        </div>
        <div class="review-text">"${r.text}"</div>
      </div>`;
    });
  }
  html += `</div>`;
  return html;
}
