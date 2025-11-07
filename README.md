# ⚡ BookScope – Harry Potter Dashboard

A React-based data dashboard that visualizes information from the **OpenLibrary API**, focused on *Harry Potter* books. It shows real-time stats, search and filter options, and a sleek dark Hogwarts-inspired design.

---

## 🌐 Live Demo

![Screen recording of Bookscope Dashboard](./screen-recording.gif)

---

## 🎯 Project Overview

This dashboard explores the magical world of *Harry Potter* through data. It fetches 50 books using the OpenLibrary API and displays them in a searchable, filterable list. The dashboard includes key summary stats, making it easy to understand patterns in the data (like how many books exist and when most were published).

---

## 🚀 Features

- [x] Fetches data from the **OpenLibrary API**
- [x] Displays **10+ unique book items** (title, author, year, cover)
- [x] Uses **useEffect()** and **async/await**
- [x] Shows **three summary statistics**:
  - Total Books  
  - Average Publish Year  
  - Unique Authors  
- [x] Includes a **search bar** (real-time filtering by title or author)
- [x] Includes a **dropdown filter** by decade
- [x] Responsive layout (3 cards per row)
- [x] Hogwarts dark-gold theme ✨
- [x] Contains full README and GIF section for submission

---

## 🧠 How It Works

1. The app fetches 50 *Harry Potter* books using the OpenLibrary API  
2. Results are stored in React state (`useState`)  
3. `useEffect` loads the data asynchronously  
4. Users can:
   - Type in the **search bar** to filter by title/author  
   - Select a **decade filter** (1990s, 2000s, etc.)  
5. Summary stats update dynamically as filters change  
6. The app uses `.map()` and `.filter()` for rendering and filtering

---

## 🧰 Tech Stack

| Tool | Purpose |
|------|----------|
| **React (Vite)** | Frontend framework |
| **OpenLibrary API** | Public data source |
| **JavaScript (ES6)** | Logic and interactivity |
| **CSS3** | Styling and layout |
| **GitHub Pages / Render** | Deployment platform |

---

## ⚙️ Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/amalick8/Bookscope-Dashboard.git
cd Bookscope-Dashboard

# 2. Install dependencies
npm install

# 3. Run the app locally
npm run dev
