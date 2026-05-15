// ── QR BORROW TAB ─────────────────────────────────────────────────

function renderQRBorrow() {
  const available = state.books.filter(b => b.status === 'available');

  let html = `<div class="card">
    <div class="card-title"><i class="ti ti-qrcode"></i>QR Borrow System</div>
    <p class="section-sub">Scan the QR code on any book to issue it to a student instantly. In the Android app, this uses Google ML Kit for real-time scanning.</p>

    <div class="qr-box" onclick="simulateQRScan()">
      <span class="qr-icon">📷</span>
      <div class="qr-text">
        <b>Tap to Simulate QR Scan</b><br>
        <span style="font-size:12px;color:var(--text3)">Point camera at book's QR code · Google ML Kit</span>
      </div>
    </div>

    <div style="margin-top:1.5rem">
      <div style="font-size:13px;font-weight:600;color:var(--text2);margin-bottom:10px;display:flex;align-items:center;gap:6px">
        <i class="ti ti-hand-finger" style="font-size:16px"></i> Or select available book manually
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">`;

  if (available.length === 0) {
    html += `<div class="empty" style="grid-column:1/-1;padding:1.5rem">All books are currently borrowed</div>`;
  } else {
    available.forEach(b => {
      html += `<button onclick="openModal('issue',${b.id})"
        style="display:flex;align-items:center;gap:10px;padding:11px 12px;border:1px solid var(--border);border-radius:10px;background:var(--card);cursor:pointer;font-family:var(--font);font-size:12px;text-align:left;transition:all .2s"
        onmouseenter="this.style.borderColor='var(--green)';this.style.background='var(--green-light)'"
        onmouseleave="this.style.borderColor='var(--border)';this.style.background='var(--card)'">
        <span style="font-size:22px;flex-shrink:0">${b.emoji}</span>
        <div style="overflow:hidden">
          <div style="font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${b.title}</div>
          <div style="color:var(--text3);font-size:11px">${b.category} · ${b.pages} pages</div>
        </div>
      </button>`;
    });
  }

  html += `</div></div></div>

  <div class="card">
    <div class="card-title"><i class="ti ti-info-circle"></i>How QR Borrow Works</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px">
      ${[
        ['📦','Each book has a unique QR code sticker on its back cover'],
        ['📷','Teacher opens the app and taps "QR Borrow" tab'],
        ['🔍','Camera scans the QR — book is instantly identified via ML Kit'],
        ['👤','Teacher selects student name and borrow duration'],
        ['✅','Book is issued; due date is set automatically'],
        ['🔔','App alerts when a book becomes overdue'],
      ].map(([ico, txt]) => `<div style="display:flex;flex-direction:column;align-items:flex-start;gap:6px;padding:12px;background:var(--bg);border-radius:10px;font-size:12px;color:var(--text2)">
        <span style="font-size:24px">${ico}</span>${txt}</div>`).join('')}
    </div>
  </div>`;

  return html;
}

function simulateQRScan() {
  const available = state.books.filter(b => b.status === 'available');
  if (available.length === 0) { showToast('No available books to scan', 'error'); return; }
  const book = available[Math.floor(Math.random() * available.length)];
  showToast('📷 QR Scanned: "' + book.title + '"');
  setTimeout(() => openModal('issue', book.id), 700);
}
