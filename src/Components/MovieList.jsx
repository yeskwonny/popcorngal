import { IoIosCheckmarkCircle } from "react-icons/io";

function MovieList({ movies, setSelectedMovieId, watchedList }) {
  return (
    <ul className="">
      {movies.length === 0 ? (
        <li className="text-center">Search your movies!</li>
      ) : (
        movies.map((movie) => (
          <Movie
            movies={movies}
            movie={movie}
            key={movie.imdbID}
            setSelectedMovieId={setSelectedMovieId}
            watchedList={watchedList}
          />
        ))
      )}
    </ul>
  );
}

function Movie({ movie, setSelectedMovieId, watchedList }) {
  const checked = watchedList.map((movie) => movie.imdbID);

  return (
    <li
      className="flex gap-3 border-b-[2px] border-b-[#222831]  py-3 hover:bg-[#c0a0b9] hover:duration-150 cursor-pointer"
      onClick={() => setSelectedMovieId(movie.imdbID)}
    >
      <img className="w-16" src={movie.Poster} alt={`${movie.Title} poster`} />
      <div className="">
        <div className="flex items-center">
          <h3>{movie.Title} </h3>
          {checked.includes(movie.imdbID) ? (
            <span>
              <IoIosCheckmarkCircle />
            </span>
          ) : (
            <></>
          )}
        </div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

export default MovieList;
