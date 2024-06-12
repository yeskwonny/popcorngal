import { BiCameraMovie } from "react-icons/bi";
import { BsBookmarkStar } from "react-icons/bs";
import { FaRegHourglassHalf } from "react-icons/fa6";
import { TiDeleteOutline } from "react-icons/ti";

function WatchedList({ watchedList, handleDeleteButton }) {
  return (
    <ul>
      {watchedList.map((movie) => (
        <li key={movie.imdbID} className="flex items-start mb-4">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-24 h-auto mr-4"
          />
          <div className="self-center">
            <h2 className="text-lg font-semibold mb-2">{movie.title}</h2>

            <div className="flex flex-wrap gap-4 items-center ">
              <p className="flex items-center">
                <span className="mr-1">
                  <BsBookmarkStar />
                </span>
                <span>{movie.userRating}</span>
              </p>
              <p className="flex items-center">
                <span className="mr-1">
                  <BiCameraMovie />
                </span>
                <span>{movie.imdbRating}</span>
              </p>
              <p className="flex items-center">
                <span className="mr-1">
                  <FaRegHourglassHalf />
                </span>
                <span>{movie.runtime} min</span>
              </p>
              <button
                className="ml-3 text-[25px]"
                onClick={() => handleDeleteButton(movie.imdbID)}
              >
                <TiDeleteOutline />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
export default WatchedList;
