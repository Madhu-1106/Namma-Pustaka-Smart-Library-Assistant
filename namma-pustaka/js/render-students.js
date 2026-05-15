// ── STUDENTS TAB ──────────────────────────────────────────────────

function renderStudents() {
  let html = `<div class="card">
    <div class="card-title"><i class="ti ti-users"></i>Student Profiles</div>
    <div style="display:flex;justify-content:flex-end;margin-bottom:14px">
      <button class="btn btn-primary" onclick="openModal('addStudent',null)">
        <i class="ti ti-user-plus"></i>Add Student
      </button>
    </div>`;

  if (state.students.length === 0) {
    html += `<div class="empty"><i class="ti ti-users"></i>No students registered yet.</div>`;
  } else {
    state.students.forEach(s => {
      const borrowed = state.books.filter(b => (b.status === 'borrowed' || b.status === 'overdue') && b.borrowedBy === s.name);
      html += `<div class="student-card">
        <div class="student-avatar" style="background:${s.avatar || '#1D9E75'}">${s.name.slice(0,2).toUpperCase()}</div>
        <div style="flex:1">
          <div style="font-weight:600;font-size:13px">${s.name}</div>
          <div style="font-size:11px;color:var(--text3)">Class ${s.class} · ${s.id}</div>
          <div style="font-size:11px;color:var(--text3);margin-top:2px">${s.booksRead} books read · ${s.pages.toLocaleString()} pages</div>
        </div>
        ${borrowed.length > 0
          ? `<span class="pill pill-amber">${borrowed.length} book${borrowed.length > 1 ? 's' : ''} out</span>`
          : `<span class="pill pill-green">No books out</span>`}
      </div>`;
    });
  }

  html += `</div>

  <div class="card">
    <div class="card-title"><i class="ti ti-chart-pie"></i>Class Distribution</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:10px">`;

  const classes = {};
  state.students.forEach(s => {
    if (!classes[s.class]) classes[s.class] = 0;
    classes[s.class]++;
  });
  Object.entries(classes).sort().forEach(([cls, count]) => {
    html += `<div class="stat">
      <div class="stat-num" style="font-size:22px">${count}</div>
      <div class="stat-label">Class ${cls}</div>
    </div>`;
  });

  html += `</div></div>`;
  return html;
}
