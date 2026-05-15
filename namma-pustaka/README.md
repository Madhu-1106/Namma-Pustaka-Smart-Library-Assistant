# Namma-Pustaka · ನಮ್ಮ ಪುಸ್ತಕ
### Smart Library Assistant for Rural Schools
**MindMatrix VTU Internship — Project #97**

---

## 📖 About
Namma-Pustaka is a Smart Library Assistant designed for rural schools. It turns a simple shelf into a digital catalog. Students can browse book covers, see details, and teachers can track who has borrowed what — preventing lost books and building a reading culture.

---

## 🚀 How to Run
Simply open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari). No server or installation needed.

---

## 📁 Project Structure
```
namma-pustaka/
├── index.html              # Main HTML entry point
├── css/
│   └── style.css           # All styles
├── js/
│   ├── data.js             # Seed data (books, students, history)
│   ├── state.js            # Global application state
│   ├── utils.js            # Shared utility functions
│   ├── render-catalog.js   # Book catalog tab
│   ├── render-borrow.js    # QR borrow tab
│   ├── render-transactions.js  # Transactions tab
│   ├── render-reviews.js   # Reviews tab
│   ├── render-leaderboard.js   # Leaderboard tab
│   ├── render-addbook.js   # Add book tab
│   ├── render-students.js  # Students tab
│   ├── modals.js           # All modal dialogs + actions
│   └── app.js              # Main controller + router
└── README.md
```

---

## ✨ Features
| Feature | Description |
|---------|-------------|
| 📚 Book Catalog | Browse by category (Story, Science, History, Nature, Math, Art, Health, Sports) |
| 🔍 Search | Search books by title, author, or category |
| 📷 QR Borrow | Simulate QR code scanning to issue books (uses Google ML Kit in Android) |
| 📋 Transactions | View all active borrowings with overdue highlighting in red |
| ⭐ Reviews | Students leave star ratings and one-sentence reviews |
| 🏆 Leaderboard | Tracks which student has read the most pages this month |
| ➕ Add Book | Add new books via form or camera entry |
| 👤 Students | Manage student profiles and track reading stats |
| 🔔 Notifications | Bell icon shows overdue book alerts |
| 🌐 Kannada support | App header shows Kannada script (ನಮ್ಮ ಪುಸ್ತಕ) |

---

## 🎯 Success Criteria (from spec)
- ✅ Add a new book via camera-based entry
- ✅ Overdue status turns text color to Red automatically
- ✅ Library catalog searchable by Book Name or Author

---

## 🛠️ Android App Implementation Notes
This is a web prototype. For the Android app:
- **QR Scanning**: Google ML Kit (`com.google.mlkit:barcode-scanning`)
- **Database**: Room DB for books and transaction history
- **UI**: RecyclerView with Grid layout (like this catalog view)
- **Camera**: CameraX for book cover capture on Add Book screen
- **Language**: Kotlin

---

## 📊 Tech Stack (Web Prototype)
- Vanilla HTML5 + CSS3 + JavaScript (no frameworks)
- Google Fonts (Sora, Noto Sans Kannada, JetBrains Mono)
- Tabler Icons (CDN)
- Fully responsive (mobile-first)

---

*Developed for MindMatrix VTU Internship Program · May 2026*
