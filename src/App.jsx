import React, { useState, useEffect } from "react";
import "./App.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

function App() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDecade, setSelectedDecade] = useState("All");
  const [expandedBook, setExpandedBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch(
        "https://openlibrary.org/search.json?q=harry+potter&limit=50"
      );
      const data = await res.json();
      setBooks(data.docs);
      setFilteredBooks(data.docs);
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    let filtered = books;
    if (searchQuery) {
      filtered = filtered.filter(
        (b) =>
          b.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          b.author_name?.some((a) =>
            a.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }
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

  const totalBooks = filteredBooks.length;
  const avgYear =
    filteredBooks.reduce((sum, b) => sum + (b.first_publish_year || 0), 0) /
    (filteredBooks.length || 1);
  const uniqueAuthors = new Set(
    filteredBooks.flatMap((b) => b.author_name || [])
  ).size;

  const decadeData = Object.values(
    filteredBooks.reduce((acc, b) => {
      const y = b.first_publish_year;
      if (y) {
        const d = Math.floor(y / 10) * 10;
        acc[d] = acc[d] || { decade: d, count: 0 };
        acc[d].count += 1;
      }
      return acc;
    }, {})
  ).sort((a, b) => a.decade - b.decade);

  const authorData = Object.values(
    filteredBooks.reduce((acc, b) => {
      const a = b.author_name ? b.author_name[0] : "Unknown";
      acc[a] = acc[a] || { author: a, count: 0 };
      acc[a].count += 1;
      return acc;
    }, {})
  )
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

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

      <div className="charts">
        <div className="chart-container">
          <h3>Books per Decade</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={decadeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="decade" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Top Authors by Number of Books</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={authorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="author" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by title or author..."
          className="search-bar"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="filter-dropdown"
          onChange={(e) => setSelectedDecade(e.target.value)}
        >
          <option value="All">All Decades</option>
          <option value="1990">1990s</option>
          <option value="2000">2000s</option>
          <option value="2010">2010s</option>
          <option value="2020">2020s</option>
        </select>
      </div>

      <div className="book-list">
        {filteredBooks.slice(0, 20).map((b, i) => {
          const coverUrl = b.cover_i
            ? `https://covers.openlibrary.org/b/id/${b.cover_i}-M.jpg`
            : "https://via.placeholder.com/128x180?text=No+Cover";
          return (
            <div
              key={i}
              className="book-card"
              onClick={() =>
                setExpandedBook(expandedBook === i ? null : i)
              }
            >
              <img src={coverUrl} alt={b.title} className="book-cover" />
              <div className="book-info">
                <h3>{b.title}</h3>
                <p>
                  <strong>Author:</strong>{" "}
                  {b.author_name?.join(", ") || "Unknown"}
                </p>
                <p>
                  <strong>First Published:</strong>{" "}
                  {b.first_publish_year || "Unknown"}
                </p>
                {expandedBook === i && (
                  <div className="extra-details">
                    <p>
                      <strong>Publisher:</strong>{" "}
                      {b.publisher?.slice(0, 3).join(", ") || "Unknown"}
                    </p>
                    <p>
                      <strong>Subjects:</strong>{" "}
                      {b.subject?.slice(0, 5).join(", ") || "Unknown"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <footer className="footer">
        <p>🐍🦁🐦‍⬛🦡</p>
      </footer>
    </div>
  );
}

export default App;
