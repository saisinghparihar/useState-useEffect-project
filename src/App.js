import React, { useEffect, useState } from "react";
import "./App.css";
import searchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API = "http://www.omdbapi.com/?i=tt3896198&apikey=ba6eb971";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovie = async (title) => {
    const response = await fetch(`${API}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };
  useEffect(() => {
    searchMovie(searchTerm);
  }, [searchTerm]);

  return (
    <div className="app">
      <h1>Sasta Netflix</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <img
          src={searchIcon}
          alt="search-icon"
          onClick={() => {
            searchMovie(searchTerm);
          }}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No Movies found</h2>
        </div>
      )}
    </div>
  );
}
