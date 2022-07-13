import React, { useState, useEffect, useCallback } from "react";


import AddMovie from "./components/AddMovie";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
	//changing states
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);



	//fetch api call
	const fetchMoviesHandler = useCallback(async () => {
		setIsLoading(true);
		setError(null);

		try {
			// const response = await fetch("https://swapi.dev/api/films/");
			const response = await fetch("https://react-http-requests-78a78-default-rtdb.firebaseio.com/movies.json");
			if (!response.ok) {
				throw new Error("SOMETHING WENT WRONG!");
			}

			const data = await response.json();

			//setting the parameters to be displayed or fetched
			const transformedMovies = data.results.map((movieData) => {
				return {
					id: movieData.episode_id,
					title: movieData.title,
					openingText: movieData.opening_crawl,
					releaseDate: movieData.release_date,
				};
			});
			setMovies(transformedMovies);
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
	}, []);

  useEffect(() => {
		fetchMoviesHandler();
	}, [fetchMoviesHandler]);

  function addMovieHandler(movie) {
    console.log(movie);
  }

	let content = <p>Found no movies!</p>;

	if (movies.length > 0) {
		content = <MoviesList movies={movies} />;
	}
	if (error) {
		content = <p> {error}</p>;
	}
	if (isLoading) {
		content = <p>Loading...</p>;
	}

	return (
		<React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
			<section>
				<button onClick={fetchMoviesHandler}>Fetch Movies</button>
			</section>
			<section>{content}</section>
		</React.Fragment>
	);
}

export default App;
