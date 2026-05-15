// ── MODALS ────────────────────────────────────────────────────────

function openModal(type, bookId) {
  state.modalType  = type;
  state.starRating = 4;
  if (bookId) state.selectedBook = state.books.find(b => b.id === bookId);
  else state.selectedBook = null;
  renderModal();
}

function closeModal() {
  const mount = document.getElementById('modalMount');
  if (mount) mount.innerHTML = '';
  state.modalType = null;
  state.selectedBook = null;
}

function renderModal() {
  const m = state.modalType;
  const b = state.selectedBook;
  let html = '';

  // ── BOOK DETAIL ──────────────────────────────────────────────────
  if (m === 'bookDetail' && b) {
    const pill = b.status === 'available'
      ? '<span class="pill pill-green">✅ Available</span>'
      : b.status === 'overdue'
        ? `<span class="pill pill-red">⚠️ Overdue — ${daysOverdue(b.dueDate)} days</span>`
        : `<span class="pill pill-amber">📤 Borrowed</span>`;

    html = `<div class="modal-overlay" onclick="if(event.target===this)closeModal()">
    <div class="modal">
      <div class="modal-header">
        <h2>${b.emoji} ${b.title}</h2>
        <button class="close-btn" onclick="closeModal()"><i class="ti ti-x"></i></button>
      </div>
      <div class="modal-body">
        <div style="display:flex;gap:16px;margin-bottom:1.25rem;align-items:flex-start">
          <div class="book-detail-cover" style="background:${b.color}">${b.emoji}</div>
          <div style="flex:1">
            <div style="font-size:12px;color:var(--text3);margin-bottom:4px">${b.category}</div>
            <div style="font-weight:600;font-size:15px;margin-bottom:4px">${b.title}</div>
            <div style="font-size:13px;color:var(--text2);margin-bottom:8px">by ${b.author}</div>
            <div style="font-size:12px;color:var(--text3);margin-bottom:8px">${b.pages} pages${b.mrn ? ' · MRN: ' + b.mrn : ''}</div>
            ${b.rating > 0 ? starsHtml(b.rating, '14px') : '<span style="font-size:12px;color:var(--text3)">No ratings yet</span>'}
            <div style="margin-top:8px">${pill}</div>
            ${b.borrowedBy ? `<div style="font-size:12px;color:var(--text2);margin-top:8px;padding:8px;background:var(--bg);border-radius:8px">
              <b>${b.borrowedBy}</b><br>
              Borrowed: ${formatDate(b.borrowedDate)}<br>
              Due: <span style="${b.status==='overdue'?'color:var(--red);font-weight:600':''}"">${formatDate(b.dueDate)}</span>
            </div>` : ''}
          </div>
        </div>
        <div style="font-weight:600;font-size:13px;margin-bottom:10px">
          Reviews (${b.reviews.length})
        </div>
        ${b.reviews.length === 0
          ? `<div class="empty" style="padding:1rem">No reviews yet — be the first!</div>`
          : b.reviews.map(r => `
            <div class="review-card" style="margin-bottom:8px">
              <div class="review-meta">
                <div class="avatar" style="background:${r.avatar || '#1D9E75'}">${r.student.slice(0,2).toUpperCase()}</div>
                <div>
                  <b style="font-size:13px">${r.student}</b>
                  <span style="color:var(--text3);font-size:12px"> · Class ${r.class}</span>
                </div>
                <div style="margin-left:auto">${starsHtml(r.rating)}</div>
              </div>
              <div class="review-text">"${r.text}"</div>
            </div>`).join('')
        }
      </div>
      <div class="modal-footer">
        ${b.status === 'available'
          ? `<button class="btn btn-primary" onclick="closeModal();openModal('issue',${b.id})"><i class="ti ti-qrcode"></i>Issue Book</button>`
          : `<button class="btn btn-outline" onclick="closeModal();openModal('return',${b.id})"><i class="ti ti-arrow-back-up"></i>Return</button>`}
        <button class="btn btn-purple" onclick="closeModal();openModal('review',${b.id})"><i class="ti ti-star"></i>Add Review</button>
        <button class="btn btn-ghost" onclick="closeModal()">Close</button>
      </div>
    </div></div>`;
  }

  // ── ISSUE BOOK ───────────────────────────────────────────────────
  else if (m === 'issue' && b) {
    html = `<div class="modal-overlay" onclick="if(event.target===this)closeModal()">
    <div class="modal">
      <div class="modal-header">
        <h2><i class="ti ti-qrcode" style="color:var(--green)"></i> Issue Book</h2>
        <button class="close-btn" onclick="closeModal()"><i class="ti ti-x"></i></button>
      </div>
      <div class="modal-body">
        <div style="display:flex;align-items:center;gap:12px;padding:12px;background:${b.color};border-radius:10px;margin-bottom:1.25rem">
          <span style="font-size:34px">${b.emoji}</span>
          <div>
            <div style="font-weight:600;font-size:14px">${b.title}</div>
            <div style="font-size:12px;color:var(--text2)">${b.author} · ${b.pages} pages</div>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Student Name *</label>
          <input class="form-input" id="issue-student" list="students-list" placeholder="Type or select student name" autocomplete="off">
          <datalist id="students-list">
            ${state.students.map(s => `<option value="${s.name} (Class ${s.class})">`).join('')}
          </datalist>
        </div>
        <div class="form-group">
          <label class="form-label">Borrow Duration</label>
          <select class="form-input" id="issue-days">
            <option value="7">7 days</option>
            <option value="14" selected>14 days (recommended)</option>
            <option value="21">21 days</option>
            <option value="30">30 days</option>
          </select>
        </div>
        <div style="font-size:12px;color:var(--text3);background:var(--green-light);padding:10px 12px;border-radius:8px">
          <i class="ti ti-info-circle" style="color:var(--green)"></i>
          Due date will be set automatically. Overdue books turn red in the dashboard.
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" onclick="doIssue(${b.id})"><i class="ti ti-check"></i>Issue Now</button>
        <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      </div>
    </div></div>`;
  }

  // ── RETURN BOOK ──────────────────────────────────────────────────
  else if (m === 'return' && b) {
    html = `<div class="modal-overlay" onclick="if(event.target===this)closeModal()">
    <div class="modal">
      <div class="modal-header">
        <h2><i class="ti ti-arrow-back-up" style="color:var(--green)"></i> Return Book</h2>
        <button class="close-btn" onclick="closeModal()"><i class="ti ti-x"></i></button>
      </div>
      <div class="modal-body" style="text-align:center">
        <div style="font-size:56px;margin-bottom:12px">${b.emoji}</div>
        <div style="font-weight:600;font-size:16px;margin-bottom:6px">${b.title}</div>
        <div style="color:var(--text3);font-size:13px;margin-bottom:12px">Borrowed by <b style="color:var(--text)">${b.borrowedBy}</b></div>
        ${b.status === 'overdue'
          ? `<div class="pill pill-red" style="display:inline-block;margin-bottom:12px">⚠️ Overdue by ${daysOverdue(b.dueDate)} days</div>`
          : ''}
        <div style="background:var(--green-light);border-radius:10px;padding:12px;font-size:13px;color:var(--text2)">
          Returning this book will add <b>${b.pages} pages</b> to <b>${b.borrowedBy}</b>'s reading record and move them up the leaderboard!
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" onclick="confirmReturn(${b.id})"><i class="ti ti-check"></i>Confirm Return</button>
        <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      </div>
    </div></div>`;
  }

  // ── WRITE REVIEW ─────────────────────────────────────────────────
  else if (m === 'review') {
    html = `<div class="modal-overlay" onclick="if(event.target===this)closeModal()">
    <div class="modal">
      <div class="modal-header">
        <h2><i class="ti ti-star" style="color:#f59e0b"></i> Write a Review</h2>
        <button class="close-btn" onclick="closeModal()"><i class="ti ti-x"></i></button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label class="form-label">Select Book *</label>
          <select class="form-input" id="rev-book">
            ${state.books.map(bk => `<option value="${bk.id}" ${state.selectedBook?.id === bk.id ? 'selected' : ''}>${bk.emoji} ${bk.title}</option>`).join('')}
          </select>
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Your Name *</label>
            <input class="form-input" id="rev-name" list="students-list2" placeholder="Student name">
            <datalist id="students-list2">${state.students.map(s => `<option value="${s.name}">`).join('')}</datalist>
          </div>
          <div class="form-group">
            <label class="form-label">Class</label>
            <input class="form-input" id="rev-class" placeholder="e.g. 6A">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Rating *</label>
          <div class="star-rating" id="starRating">
            ${[1,2,3,4,5].map(i => `<span onclick="setStarRating(${i})" class="${i <= state.starRating ? 'active' : ''}">★</span>`).join('')}
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Your Review *</label>
          <input class="form-input" id="rev-text" placeholder="Share what you liked about this book...">
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" onclick="doReview()"><i class="ti ti-send"></i>Submit Review</button>
        <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      </div>
    </div></div>`;
  }

  // ── ADD STUDENT ──────────────────────────────────────────────────
  else if (m === 'addStudent') {
    html = `<div class="modal-overlay" onclick="if(event.target===this)closeModal()">
    <div class="modal">
      <div class="modal-header">
        <h2><i class="ti ti-user-plus" style="color:var(--green)"></i> Add Student</h2>
        <button class="close-btn" onclick="closeModal()"><i class="ti ti-x"></i></button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label class="form-label">Full Name *</label>
          <input class="form-input" id="st-name" placeholder="Student full name">
        </div>
        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Class *</label>
            <input class="form-input" id="st-class" placeholder="e.g. 7A">
          </div>
          <div class="form-group">
            <label class="form-label">Student ID</label>
            <input class="form-input" id="st-id" placeholder="e.g. S011">
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary" onclick="doAddStudent()"><i class="ti ti-check"></i>Add Student</button>
        <button class="btn btn-ghost" onclick="closeModal()">Cancel</button>
      </div>
    </div></div>`;
  }

  document.getElementById('modalMount').innerHTML = html;
}

// ── MODAL ACTIONS ─────────────────────────────────────────────────

function setStarRating(n) {
  state.starRating = n;
  const spans = document.querySelectorAll('#starRating span');
  spans.forEach((s, i) => s.classList.toggle('active', i < n));
}

function doIssue(bookId) {
  const raw     = document.getElementById('issue-student').value.trim();
  const student = raw.replace(/\s*\(Class [^)]+\)$/, '').trim();
  const days    = parseInt(document.getElementById('issue-days').value);
  if (!student) { showToast('⚠️ Enter student name', 'error'); return; }

  const book = state.books.find(b => b.id === bookId);
  if (book && book.status === 'available') {
    const due = new Date();
    due.setDate(due.getDate() + days);
    book.status      = 'borrowed';
    book.borrowedBy  = student;
    book.borrowedDate = new Date().toISOString().split('T')[0];
    book.dueDate     = due.toISOString().split('T')[0];
    showToast('📚 Issued to ' + student + '!');
    closeModal(); render();
  }
}

function confirmReturn(bookId) {
  const book = state.books.find(b => b.id === bookId);
  if (book) {
    const st = state.students.find(s => s.name === book.borrowedBy);
    if (st) { st.pages += book.pages; st.booksRead++; }
    state.history.push({
      bookId: book.id,
      bookTitle: book.title,
      student: book.borrowedBy,
      action: 'returned',
      date: new Date().toISOString().split('T')[0],
      pages: book.pages,
    });
    book.status = 'available';
    delete book.borrowedBy; delete book.borrowedDate; delete book.dueDate;
    showToast('✅ Book returned successfully!');
    closeModal(); render();
  }
}

function doReview() {
  const bookId = parseInt(document.getElementById('rev-book').value);
  const name   = document.getElementById('rev-name').value.trim();
  const cls    = document.getElementById('rev-class').value.trim() || '?';
  const text   = document.getElementById('rev-text').value.trim();
  const rating = state.starRating;

  if (!name) { showToast('⚠️ Please enter your name', 'error'); return; }
  if (!text) { showToast('⚠️ Please write a review', 'error'); return; }

  const book = state.books.find(b => b.id === bookId);
  if (book) {
    book.reviews.push({ student: name, class: cls, text, rating, avatar: COLORS[book.reviews.length % COLORS.length] });
    const total = book.reviews.reduce((s, r) => s + r.rating, 0);
    book.rating = +(total / book.reviews.length).toFixed(1);
    showToast('⭐ Review submitted! Thank you.');
    closeModal(); render();
  }
}

function doAddStudent() {
  const name  = document.getElementById('st-name').value.trim();
  const cls   = document.getElementById('st-class').value.trim();
  const id    = document.getElementById('st-id').value.trim() || ('S' + String(state.students.length + 1).padStart(3,'0'));
  if (!name) { showToast('⚠️ Student name is required', 'error'); return; }
  if (!cls)  { showToast('⚠️ Class is required', 'error'); return; }
  state.students.push({ id, name, class: cls, pages: 0, booksRead: 0, avatar: COLORS[state.students.length % COLORS.length] });
  showToast('👤 ' + name + ' added!');
  closeModal(); render();
}
