import React, { useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [error1, setError] = useState(null);

  useEffect(() => {
    fetchMovieHandler();
  }, []);
  const fetchMovieHandler = async () => {
    setIsLoading(true);
    try {
      const rawResponse = await fetch("https://swapi.dev/api/films/", {
        method: "get",
      });
      if (!rawResponse.ok) {
        throw new Error("Something went wrong");
      }
      const response = await rawResponse.json();

      setMovies(
        response.results.map((movie) => {
          return {
            id: movie.episode_id,
            title: movie.title,
            releaseDate: movie.release_date,
            openingText: movie.opening_crawl,
          };
        })
      );
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error1 && <p>No Movies Found</p>}
        {isLoading && <p>Loading ...</p>}
        {!isLoading && error1 && <p>{error1}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
