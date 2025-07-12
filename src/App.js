import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';

const API_KEY = 'a8e27b76';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${page}`);
      const data = await res.json();
      if (data.Response === 'True') {
        setMovies(data.Search);
        setTotalPages(Math.ceil(data.totalResults / 10));
      } else {
        setMovies([]);
        setTotalPages(1);
      }
    };

    if (query.length > 2) {
      fetchMovies();
    }
  }, [query, page]);

  return (
    <div className="app-container">
      <h1>🎬 Movie Search</h1>
      <SearchBar query={query} setQuery={setQuery} />

      <div className="movies-grid">
        {movies.length > 0 ? (
          movies.map(movie => <MovieCard key={movie.imdbID} movie={movie} />)
        ) : (
          <p className="not-found">No movies found</p>
        )}
      </div>

      {movies.length > 0 && (
        <div className="pagination">
          <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>Prev</button>
          <span>Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page === totalPages}>Next</button>
        </div>
      )}
    </div>
  );
}

export default App;