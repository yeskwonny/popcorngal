function Search({ query, setQuery }) {
  //getting movies from query

  return (
    <div className="mx-auto">
      <input
        type="text"
        value={query}
        placeholder="Search movies..."
        className="border-b-2 border-b-[#222831]/[.70] w-[300px]"
        onChange={(e) => setQuery(e.target.value)}
      ></input>
    </div>
  );
}

export default Search;
