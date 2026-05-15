// ── LEADERBOARD TAB ───────────────────────────────────────────────

function renderLeaderboard() {
  const sorted = [...state.students].sort((a, b) => b.pages - a.pages);
  const maxPages = sorted[0]?.pages || 1;

  let html = `<div class="card">
    <div class="card-title"><i class="ti ti-trophy"></i>Reading Leaderboard — May 2026</div>
    <p class="section-sub">Tracks total pages read this month. Keep reading to climb the board! 📚</p>`;

  sorted.forEach((s, i) => {
    const rankClass = i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : 'rank-n';
    const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : '';
    const barWidth = Math.round((s.pages / maxPages) * 100);

    html += `<div class="lb-row">
      <div class="lb-rank ${rankClass}">${medal || (i + 1)}</div>
      <div style="flex-shrink:0">
        <div class="lb-name">${s.name}</div>
        <div class="lb-class">Class ${s.class} · ${s.booksRead} book${s.booksRead !== 1 ? 's' : ''} read</div>
      </div>
      <div style="flex:1;margin:0 14px">
        <div class="lb-bar-wrap"><div class="lb-bar" style="width:0%" data-width="${barWidth}%"></div></div>
      </div>
      <div class="lb-pages">${s.pages.toLocaleString()} pages</div>
    </div>`;
  });
  html += `</div>`;

  // Class Stats
  const classes = {};
  state.students.forEach(s => {
    if (!classes[s.class]) classes[s.class] = { pages: 0, count: 0, books: 0 };
    classes[s.class].pages += s.pages;
    classes[s.class].count++;
    classes[s.class].books += s.booksRead;
  });

  html += `<div class="card">
    <div class="card-title"><i class="ti ti-chart-bar"></i>Class Performance</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px">`;

  Object.entries(classes).sort((a, b) => b[1].pages - a[1].pages).forEach(([cls, d]) => {
    html += `<div class="stat">
      <div class="stat-num" style="font-size:20px">${d.pages.toLocaleString()}</div>
      <div class="stat-label" style="font-weight:600">Class ${cls}</div>
      <div class="stat-label">${d.count} students · ${d.books} books</div>
    </div>`;
  });

  html += `</div></div>

  <div class="card">
    <div class="card-title"><i class="ti ti-bulb"></i>Reading Goals</div>
    <p class="section-sub">Monthly target: 300 pages per student</p>
    <div style="display:flex;flex-direction:column;gap:10px">`;

  sorted.slice(0, 5).forEach(s => {
    const target = 300;
    const pct = Math.min(100, Math.round((s.pages / target) * 100));
    html += `<div>
      <div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:5px">
        <span style="font-weight:500">${s.name}</span>
        <span style="color:${pct >= 100 ? 'var(--green)' : 'var(--text3)'}">${pct}% ${pct >= 100 ? '🎉' : ''}</span>
      </div>
      <div class="progress-wrap">
        <div class="progress-bar" style="width:0%;background:${pct >= 100 ? 'var(--green)' : 'var(--amber)'}" data-width="${pct}%"></div>
      </div>
    </div>`;
  });

  html += `</div></div>`;

  // Animate bars after render
  setTimeout(() => {
    document.querySelectorAll('[data-width]').forEach(el => { el.style.width = el.dataset.width; });
  }, 80);

  return html;
}
