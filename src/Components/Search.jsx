function Search({ query, setQuery }) {
  //getting movies from query

  return (
    <div className="">
      <input
        type="text"
        value={query}
        placeholder="Search movies..."
        className="border-b-2 border-b-[#222831]/[.70] w-[500px] focus:outline-none focus:ring-0 mt-2"
        onChange={(e) => setQuery(e.target.value)}
      ></input>
    </div>
  );
}

export default Search;
