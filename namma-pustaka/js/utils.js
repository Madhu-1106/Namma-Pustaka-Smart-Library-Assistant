// ── NAMMA-PUSTAKA UTILITIES ───────────────────────────────────────

function showToast(msg, type='') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show' + (type ? ' ' + type : '');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2800);
}

function starsHtml(r, size='') {
  let s = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(r)) s += '★';
    else if (i === Math.ceil(r) && r % 1 >= .5) s += '½';
    else s += '☆';
  }
  return `<span class="stars" style="${size ? 'font-size:'+size : ''}">${s}
    <span style="color:var(--text3);font-size:11px;font-weight:500">${r.toFixed(1)}</span>
  </span>`;
}

function daysOverdue(dueDate) {
  const due = new Date(dueDate);
  const now = new Date();
  return Math.max(0, Math.floor((now - due) / (1000 * 60 * 60 * 24)));
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });
}

function overdueCount() { return state.books.filter(b => b.status === 'overdue').length; }
function borrowedCount() { return state.books.filter(b => b.status === 'borrowed' || b.status === 'overdue').length; }

function filteredBooks() {
  let books = state.books;
  if (state.category !== 'All') books = books.filter(b => b.category === state.category);
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    books = books.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.category.toLowerCase().includes(q));
  }
  return books;
}

function getNotifications() {
  const notes = [];
  state.books.forEach(b => {
    if (b.status === 'overdue') {
      notes.push({ title: b.title, msg: `Borrowed by ${b.borrowedBy} — overdue by ${daysOverdue(b.dueDate)} days`, type: 'overdue' });
    }
  });
  return notes;
}

function updateNotifyBadge() {
  const count = getNotifications().length;
  const badge = document.getElementById('notifyBadge');
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}

function toggleNotifications() {
  const panel = document.getElementById('notifyPanel');
  if (panel.style.display === 'none') {
    const notes = getNotifications();
    let html = `<div class="notify-header">Notifications (${notes.length})</div>`;
    if (notes.length === 0) {
      html += `<div style="padding:16px;font-size:13px;color:var(--text3);text-align:center">All clear! No overdue books.</div>`;
    } else {
      notes.forEach(n => {
        html += `<div class="notify-item">
          <i class="ti ti-alert-triangle"></i>
          <div class="notify-item-text">
            <div class="notify-item-title">${n.title}</div>
            ${n.msg}
          </div>
        </div>`;
      });
    }
    document.getElementById('notifyContent').innerHTML = html;
    panel.style.display = 'block';
    document.addEventListener('click', closeNotifyOnOutside, { once: true });
  } else {
    panel.style.display = 'none';
  }
}

function closeNotifyOnOutside(e) {
  const panel = document.getElementById('notifyPanel');
  const btn   = document.getElementById('notifyBtn');
  if (!panel.contains(e.target) && !btn.contains(e.target)) {
    panel.style.display = 'none';
  }
}
