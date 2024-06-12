import { useEffect, useState } from "react";
import Logo from "./Components/Logo";
import Search from "./Components/Search";
import Loader from "./Components/Loader";
import MovieList from "./Components/MovieList";
import MovieDetail from "./Components/MovieDetail";
import WatchedList from "./Components/WatchedList";
import { AiOutlineNumber } from "react-icons/ai";
import { BsBookmarkStar } from "react-icons/bs";

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // get watchedlist from local storage
  const [watchedList, setWatchedList] = useState(function () {
    const savedData = localStorage.getItem("watchedList");
    return savedData ? JSON.parse(savedData) : [];
  });
  // add watched movie in the array
  function handleOnAddButton(newMovie) {
    setWatchedList((movies) => [...movies, newMovie]);
    console.log(watchedList);
  }
  function handleCloseButton() {
    setSelectedMovieId("");
  }
  function handleDeleteButton(id) {
    setWatchedList((list) => list.filter((item) => item.imdbID !== id));
  }

  // fetch data
  useEffect(() => {
    //abort API
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await fetch(
          `http://www.omdbapi.com/?apikey=${
            import.meta.env.VITE_SOME_KEY
          }&s=${query}`,
          { signal: controller.signal }
        );
        // when fetch fails
        if (!data.ok) throw new Error("Something went wrong");

        const parsedData = await data.json();
        // when parseData fails
        if (parsedData.Response === "False") throw new Error(parsedData.Error);
        // set result in movies
        setMovies(parsedData.Search);
      } catch (err) {
        if (!err.name === "AbortError") {
          setError(err.message);
          console.error(err.name);
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (!query) {
      setMovies([]);
      return;
    }
    fetchData();
    return function () {
      controller.abort();
    };
  }, [query]);

  // close movie detail when users change the query
  useEffect(() => {
    if (query !== "") setSelectedMovieId("");
  }, [query]);

  // save watchlist in local storage
  useEffect(
    function () {
      localStorage.setItem("watchedList", JSON.stringify(watchedList));
    },
    [watchedList]
  );
  return (
    <div className=" bg-[#ffffff]">
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
      </Nav>
      <Main>
        <Box>
          {isLoading ? (
            <Loader />
          ) : (
            <MovieList
              watchedList={watchedList}
              movies={movies}
              setSelectedMovieId={setSelectedMovieId}
              isLoading={isLoading}
            />
          )}
        </Box>

        <Box>
          {selectedMovieId ? (
            <MovieDetail
              selectedMovieId={selectedMovieId}
              watchedList={watchedList}
              onClick={handleOnAddButton}
              handleCloseButton={handleCloseButton}
            />
          ) : (
            <>
              <Summary watchedList={watchedList} />
              <WatchedList
                watchedList={watchedList}
                handleDeleteButton={handleDeleteButton}
              />
            </>
          )}
        </Box>
      </Main>
    </div>
  );
}

// make this box resuable using children prop (component compostion)
function Box({ children }) {
  return (
    <div className=" w-[450px] h-screen text-[#222831] bg-[#f2f2f2] mt-10  border-[2px] border-[#222831] rounded-xl relative overflow-y-scroll scrollbar flex flex-col px-3 py-3 mb-3">
      {children}
    </div>
  );
}

function Main({ children }) {
  return <main className="flex justify-center gap-3">{children}</main>;
}

function Nav({ children }) {
  return (
    <header className="flex px-3 py-4 justify-center gap-1 ">{children}</header>
  );
}

function Summary({ watchedList }) {
  const numberOfWatched = watchedList.length;
  const sumRating = watchedList
    .map((movie) => movie.userRating)
    .reduce((pre, cur) => pre + cur, 0);
  const averageRating = Math.floor(sumRating / numberOfWatched);

  return (
    <div className="bg-[#222831] text-[#f2f2f2] font-bold text-[18px] rounded-md py-1 mb-3">
      <h1 className="text-center">Movies you watched</h1>
      <div className="flex justify-center gap-3 mt-3 mb-5">
        <p className="flex items-center gap-1">
          <AiOutlineNumber />
          <span>{watchedList ? numberOfWatched : 0}</span>
        </p>

        <p className="flex items-center gap-1">
          <BsBookmarkStar />
          <span>{averageRating ? averageRating : 0}</span>
        </p>
      </div>
    </div>
  );
}

export default App;
