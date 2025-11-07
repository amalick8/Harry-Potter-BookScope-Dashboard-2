import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(undefined); // undefined = loading, null = not found
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://openlibrary.org/search.json?q=harry+potter&limit=50"
        );
        const data = await res.json();

        // Support both index-based ids (e.g. "/book/3") and key-tail ids (e.g. "/book/OL12345W")
        let found = null;
        if (id && /^\d+$/.test(id)) {
          const idx = parseInt(id, 10);
          found = data.docs[idx];
        }
        if (!found) {
          found = data.docs.find((d) => d.key?.split("/").pop() === id);
        }

        setBook(found ?? null);
      } catch (err) {
        setError(err?.message || String(err));
        setBook(null);
      }
    };
    fetchData();
  }, [id]);

  if (book === undefined) return <p>Loading...</p>;
  if (error)
    return (
      <div className="detail-view">
        <Link to="/" className="back-link">
          ← Back to Dashboard
        </Link>
        <p>Error: {error}</p>
      </div>
    );
  if (!book)
    return (
      <div className="detail-view">
        <Link to="/" className="back-link">
          ← Back to Dashboard
        </Link>
        <p>Book not found.</p>
      </div>
    );

  const coverId = book.cover_i;
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : "https://via.placeholder.com/200x300?text=No+Cover";

  return (
    <div className="detail-view">
      <Link to="/" className="back-link">
        ← Back to Dashboard
      </Link>
      <div className="detail-content">
        <img src={coverUrl} alt={book.title} className="detail-cover" />
        <div className="detail-info">
          <h2>{book.title}</h2>
          <p>
            <strong>Author:</strong> {book.author_name?.join(", ") || "Unknown"}
          </p>
          <p>
            <strong>First Published:</strong>{" "}
            {book.first_publish_year || "Unknown"}
          </p>
          <p>
            <strong>Publisher:</strong>{" "}
            {book.publisher?.join(", ") || "Unknown"}
          </p>
          <p>
            <strong>Subject:</strong>{" "}
            {book.subject?.slice(0, 5).join(", ") || "Unknown"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;
