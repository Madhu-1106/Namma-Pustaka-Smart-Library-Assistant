// ── TRANSACTIONS TAB ──────────────────────────────────────────────

function renderTransactions() {
  const active = state.books.filter(b => b.status === 'borrowed' || b.status === 'overdue');

  let html = `<div class="card">
    <div class="card-title"><i class="ti ti-list-check"></i>Active Borrowings</div>`;

  if (active.length === 0) {
    html += `<div class="empty"><i class="ti ti-check"></i>All books have been returned! Great job.</div>`;
  } else {
    html += `<div style="overflow-x:auto"><table class="tbl">
      <thead><tr>
        <th>Book</th>
        <th>Student</th>
        <th>Borrowed On</th>
        <th>Due Date</th>
        <th>Status</th>
        <th>Action</th>
      </tr></thead>
      <tbody>`;

    active.sort((a, b) => a.status === 'overdue' ? -1 : 1).forEach(b => {
      const days = b.status === 'overdue' ? daysOverdue(b.dueDate) : 0;
      const pill = b.status === 'overdue'
        ? `<span class="pill pill-red">Overdue ${days}d</span>`
        : `<span class="pill pill-amber">Borrowed</span>`;

      html += `<tr>
        <td>
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-size:20px">${b.emoji}</span>
            <div>
              <div style="font-weight:500;font-size:13px">${b.title}</div>
              <div style="font-size:11px;color:var(--text3)">${b.category}</div>
            </div>
          </div>
        </td>
        <td><b>${b.borrowedBy}</b></td>
        <td style="font-family:var(--font-mono);font-size:12px;color:var(--text3)">${formatDate(b.borrowedDate)}</td>
        <td style="font-family:var(--font-mono);font-size:12px;${b.status === 'overdue' ? 'color:var(--red);font-weight:600' : ''}">${formatDate(b.dueDate)}</td>
        <td>${pill}</td>
        <td>
          <button class="btn btn-outline btn-sm" onclick="openModal('return',${b.id})">
            <i class="ti ti-arrow-back-up"></i>Return
          </button>
        </td>
      </tr>`;
    });
    html += `</tbody></table></div>`;
  }
  html += `</div>`;

  // Return history
  html += `<div class="card">
    <div class="card-title"><i class="ti ti-history"></i>Return History</div>`;

  if (state.history.length === 0) {
    html += `<div class="empty" style="padding:1.5rem">No history yet — return books above to populate.</div>`;
  } else {
    state.history.slice().reverse().forEach(h => {
      const book = state.books.find(b => b.id === h.bookId) || {};
      html += `<div class="history-item">
        <i class="ti ti-check-circle" style="color:var(--green)"></i>
        <span style="font-size:18px">${book.emoji || '📚'}</span>
        <div style="flex:1">
          <div style="font-weight:500">${h.bookTitle}</div>
          <div style="font-size:11px;color:var(--text3)">Returned by <b>${h.student}</b> · ${formatDate(h.date)} · ${h.pages} pages credited</div>
        </div>
        <span class="pill pill-green">Returned</span>
      </div>`;
    });
  }
  html += `</div>`;

  return html;
}
