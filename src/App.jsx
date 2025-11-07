import React, { useState, useEffect } from "react";
import "./App.css";
import BookCard from "./components/BookCard";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";

function App() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDecade, setSelectedDecade] = useState("All");

  // 🧠 Fetching from OpenLibrary
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(
          "https://openlibrary.org/search.json?q=harry+potter&limit=50"
        );
        const data = await res.json();
        setBooks(data.docs);
        setFilteredBooks(data.docs);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchBooks();
  }, []);

  // 🔍 Handle Search + Filter
  useEffect(() => {
    let filtered = books;

    // filter by search
    if (searchQuery) {
      filtered = filtered.filter(
        (b) =>
          b.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.author_name?.some((a) =>
            a.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // filter by decade
    if (selectedDecade !== "All") {
      const decadeStart = parseInt(selectedDecade);
      filtered = filtered.filter(
        (b) =>
          b.first_publish_year &&
          b.first_publish_year >= decadeStart &&
          b.first_publish_year < decadeStart + 10
      );
    }

    setFilteredBooks(filtered);
  }, [searchQuery, selectedDecade, books]);

  // 📊 Summary stats
  const totalBooks = filteredBooks.length;
  const avgYear =
    filteredBooks.reduce((sum, b) => sum + (b.first_publish_year || 0), 0) /
    (filteredBooks.length || 1);
  const uniqueAuthors = new Set(
    filteredBooks.flatMap((b) => b.author_name || [])
  ).size;

  return (
    <div className="App">
      <header className="header">
        <h1>BookScope - Harry Potter Dashboard ⚡️</h1>
        <h2 className="subtitle">
          Exploring the wizarding world through OpenLibrary data
        </h2>
      </header>

      <div className="stats">
        <div className="stat-card">Total Books: {totalBooks}</div>
        <div className="stat-card">
          Avg Publish Year: {isNaN(avgYear) ? "N/A" : avgYear.toFixed(0)}
        </div>
        <div className="stat-card">Unique Authors: {uniqueAuthors}</div>
      </div>

      <div className="controls">
        <SearchBar setSearchQuery={setSearchQuery} />
        <Filter setSelectedDecade={setSelectedDecade} />
      </div>

      <div className="book-list">
        {filteredBooks.slice(0, 20).map((b, i) => (
          <BookCard key={i} book={b} />
        ))}
      </div>

      <footer className="footer">
        <p>🐍🦁🐦‍⬛🦡</p>
      </footer>
    </div>
  );
}

export default App;
