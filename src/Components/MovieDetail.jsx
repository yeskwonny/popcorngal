import StarRating from "./Star";
import Loader from "./Loader";
import { useState, useEffect } from "react";
import { BiCameraMovie } from "react-icons/bi";
import { BsBookmarkStar } from "react-icons/bs";
function MovieDetail({
  selectedMovieId,
  watchedList,
  onClick,
  handleCloseButton,
}) {
  const [selectedMovie, setSelectedMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = selectedMovie;
  // hadle add button and add watched movie in the array
  function handleOnAddButton() {
    if (!userRating) return;
    const newWatchedMovie = {
      imdbID: selectedMovieId,
      title,
      year,
      poster,
      imdbRating: +imdbRating,
      runtime: +runtime.split(" ")[0],
      userRating,
    };
    onClick(newWatchedMovie);
    handleCloseButton();
  }
  // if the movie is already rated, don't show star and show your rate
  //  아래와 같이 하면 무한루프 too many render가 생성.
  // watchedList.includes((movies) => movies.imdbID === selectedMovieId)
  //   ? setIsWatched(true)
  //   : setIsWatched(false);

  const isWatched = watchedList
    .map((movies) => movies.imdbID)
    .includes(selectedMovieId);

  // getting userRating from watched List
  const watchedRating = watchedList.find(
    (movie) => movie.imdbID == selectedMovieId
  )?.userRating;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetch(
          `http://www.omdbapi.com/?apikey=${
            import.meta.env.VITE_SOME_KEY
          }&i=${selectedMovieId}`
        );
        // when fetch fails
        if (!data.ok) throw new Error("Something went wrong");

        const parsedData = await data.json();
        setSelectedMovie(parsedData);
        setUserRating("");
        setIsLoading(false);
        // when parseData fails
        if (parsedData.Response === "False") throw new Error(parsedData.Error);
        // set result in movies
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [selectedMovieId]);

  return (
    <div className="relative h-full mx-auto">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <button
            onClick={handleCloseButton}
            className="bg-slate-50 z-50 rounded-full w-8 h-8 absolute left-2 top-1 hover:bg-[#c0a0b9]"
          >
            &larr;
          </button>
          <header className="grid grid-cols-2 -z-0">
            <img src={poster} className="w-[200px] justify-self-center" />
            <div className="self-center grid gap-3 ml-4">
              <h2 className="text-[20px]">{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p className="">{genre}</p>
              <p className="flex items-center">
                <BiCameraMovie />
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="flex flex-col items-center mt-8 mb-6 gap-3">
              {!isWatched ? (
                <>
                  <StarRating
                    size={20}
                    maxRating={10}
                    onSetRating={setUserRating}
                  />
                  {userRating && (
                    <button
                      className="bg-slate-50 w-[120px] px-2 py-3 rounded-md hover:bg-[#c0a0b9] border-solid border-2 border-[#222831]"
                      onClick={handleOnAddButton}
                    >
                      +Add to list
                    </button>
                  )}
                </>
              ) : (
                <p className="flex items-center gap-1 font-semibold text-[18px]">
                  You rated this movie <BsBookmarkStar />
                  {watchedRating}
                </p>
              )}
            </div>
            <div className="flex flex-col items-center gap-1 text-sm text-center">
              <p>Starring {actors}</p>
              <p>Directed by {director}</p>
              <em className="text-center mt-5 flex-wrap text-xl">{plot}</em>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default MovieDetail;
