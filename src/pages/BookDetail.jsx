import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://openlibrary.org/search.json?q=harry+potter&limit=50"
      );
      const data = await res.json();
      setBook(data.docs[id]);
    };
    fetchData();
  }, [id]);

  if (!book) return <p>Loading...</p>;

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
