import React from "react";
import "../App.css";

function BookCard({ book }) {
  const coverId = book.cover_i;
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/128x180?text=No+Cover";

  return (
    <div className="book-card">
      {/* forgot alt at first lol */}
      <img src={coverUrl} alt={book.title} className="book-cover" />
      <div className="book-info">
        <h3>{book.title}</h3>
        <p>
          <strong>Author:</strong> {book.author_name?.join(", ") || "Unknown"}
        </p>
        <p>
          <strong>First Published:</strong>{" "}
          {book.first_publish_year || "Unknown"}
        </p>
      </div>
    </div>
  );
}

export default BookCard;
