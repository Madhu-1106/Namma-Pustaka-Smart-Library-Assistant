// ── ADD BOOK TAB ──────────────────────────────────────────────────

function renderAddBook() {
  return `<div class="card">
    <div class="card-title"><i class="ti ti-circle-plus"></i>Add New Book to Library</div>
    <p class="section-sub">Fill in the book details. Title and Author are required. In the Android app, use the camera to auto-fill details by photographing the book cover.</p>

    <div class="grid-2">
      <div class="form-group" style="grid-column:1/-1">
        <label class="form-label">Book Title *</label>
        <input class="form-input" id="nb-title" placeholder="e.g. The Jungle Book" autocomplete="off">
      </div>
      <div class="form-group">
        <label class="form-label">Author *</label>
        <input class="form-input" id="nb-author" placeholder="Author name">
      </div>
      <div class="form-group">
        <label class="form-label">Category *</label>
        <select class="form-input" id="nb-category">
          <option>Story</option>
          <option>Science</option>
          <option>History</option>
          <option>Nature</option>
          <option>Math</option>
          <option>Art</option>
          <option>Health</option>
          <option>Sports</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Number of Pages</label>
        <input class="form-input" id="nb-pages" type="number" placeholder="e.g. 200" min="1" max="2000">
      </div>
      <div class="form-group">
        <label class="form-label">MRN / Accession No.</label>
        <input class="form-input" id="nb-mrn" placeholder="Library accession number">
      </div>
      <div class="form-group">
        <label class="form-label">Publisher</label>
        <input class="form-input" id="nb-publisher" placeholder="Publisher name">
      </div>
      <div class="form-group" style="grid-column:1/-1">
        <label class="form-label">Description / Notes</label>
        <textarea class="form-input" id="nb-notes" placeholder="Brief description of the book (optional)"></textarea>
      </div>
    </div>

    <!-- Preview -->
    <div id="nb-preview" style="display:none;padding:12px;background:var(--bg);border-radius:10px;margin-bottom:14px;display:flex;align-items:center;gap:12px">
      <div id="nb-preview-cover" style="width:50px;height:64px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:28px;background:#E1F5EE;flex-shrink:0"></div>
      <div>
        <div id="nb-preview-title" style="font-weight:600;font-size:13px"></div>
        <div id="nb-preview-author" style="font-size:12px;color:var(--text3)"></div>
        <span id="nb-preview-cat" class="pill pill-green" style="margin-top:4px;display:inline-block;font-size:10px"></span>
      </div>
    </div>

    <div style="display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn btn-primary" onclick="submitAddBook()">
        <i class="ti ti-check"></i>Add to Library
      </button>
      <button class="btn btn-outline" onclick="openCameraEntry()">
        <i class="ti ti-camera"></i>Camera Entry
      </button>
      <button class="btn btn-ghost" onclick="clearAddForm()">
        <i class="ti ti-refresh"></i>Clear Form
      </button>
    </div>
  </div>

  <div class="card">
    <div class="card-title"><i class="ti ti-info-circle"></i>Book Entry Guidelines</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px">
      ${[
        ['ti-pencil','Title should match the book cover exactly'],
        ['ti-user','Include full author name as printed on the book'],
        ['ti-tag','Choose the most relevant category for easy browsing'],
        ['ti-barcode','MRN is your school library accession number'],
        ['ti-camera','Use Camera Entry to photograph book for quick fill'],
        ['ti-star','Students can add reviews after the book is in catalog'],
      ].map(([icon, tip]) => `<div style="display:flex;align-items:flex-start;gap:8px;font-size:12px;color:var(--text2);padding:8px;background:var(--bg);border-radius:8px">
        <i class="ti ${icon}" style="color:var(--green);font-size:16px;flex-shrink:0;margin-top:1px"></i>${tip}
      </div>`).join('')}
    </div>
  </div>

  <script>
    // Live preview
    function updatePreview() {
      const title = document.getElementById('nb-title')?.value.trim();
      const author = document.getElementById('nb-author')?.value.trim();
      const cat = document.getElementById('nb-category')?.value;
      const preview = document.getElementById('nb-preview');
      if (!preview) return;
      if (title) {
        preview.style.display = 'flex';
        document.getElementById('nb-preview-cover').textContent = (window.EMOJIS && EMOJIS[cat]) || '📚';
        document.getElementById('nb-preview-title').textContent = title;
        document.getElementById('nb-preview-author').textContent = author || 'Unknown Author';
        document.getElementById('nb-preview-cat').textContent = cat;
      } else {
        preview.style.display = 'none';
      }
    }
    setTimeout(() => {
      ['nb-title','nb-author','nb-category'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', updatePreview);
      });
    }, 100);
  </script>`;
}

function submitAddBook() {
  const title     = document.getElementById('nb-title').value.trim();
  const author    = document.getElementById('nb-author').value.trim();
  const category  = document.getElementById('nb-category').value;
  const pages     = parseInt(document.getElementById('nb-pages').value) || 100;
  const mrn       = document.getElementById('nb-mrn').value.trim();

  if (!title)  { showToast('⚠️ Book title is required', 'error'); document.getElementById('nb-title').focus(); return; }
  if (!author) { showToast('⚠️ Author name is required', 'error'); document.getElementById('nb-author').focus(); return; }

  if (state.books.find(b => b.title.toLowerCase() === title.toLowerCase())) {
    showToast('⚠️ A book with this title already exists', 'error');
    return;
  }

  const newBook = {
    id: Date.now(),
    title, author, category,
    emoji: EMOJIS[category] || '📚',
    color: COVER_COLORS[Math.floor(Math.random() * COVER_COLORS.length)],
    status: 'available',
    rating: 0,
    reviews: [],
    pages,
    mrn: mrn || null,
  };

  state.books.unshift(newBook);
  showToast('📖 "' + title + '" added to library!');
  switchTab('catalog');
}

function clearAddForm() {
  ['nb-title','nb-author','nb-pages','nb-mrn','nb-publisher','nb-notes'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  const preview = document.getElementById('nb-preview');
  if (preview) preview.style.display = 'none';
}

function openCameraEntry() {
  showToast('📷 In Android app, camera opens to scan book cover');
  document.getElementById('nb-title').focus();
}
