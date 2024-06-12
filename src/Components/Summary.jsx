import { AiOutlineNumber } from "react-icons/ai";
import { BsBookmarkStar } from "react-icons/bs";

function Summary({ watchedList }) {
  const numberOfWatched = watchedList.length;
  const sumRating = watchedList
    .map((movie) => movie.userRating)
    .reduce((pre, cur) => pre + cur, 0);
  const averageRating = Math.floor(sumRating / numberOfWatched);

  return (
    <div className="bg-[#222831] text-[#f2f2f2] font-bold text-[18px] rounded-md py-1 mb-3 mx-auto w-[360px]">
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

export default Summary;
