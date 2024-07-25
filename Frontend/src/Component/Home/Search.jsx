const Search = () => {
  return (
    <>
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <div className="bg-[url('https://img.freepik.com/free-vector/hand-draw-city-skyline-sketch_1035-19581.jpg?t=st=1721422986~exp=1721426586~hmac=3f7b4227da15e6f21323251720d5ce5302a46f8036ec80a8cfb4aab51a7ba2e9&w=900')] bg-cover bg-center bg-no-repeat w-full h-[400px] flex flex-col items-center justify-center gap-6 px-4 md:px-6">
        <h1 className="text-3xl font-bold text-zinc-950 bg-white shadow-xl">
          Find Your Dream Home
        </h1>
        <div className="flex w-full max-w-3xl items-center rounded-lg bg-gray-50 backdrop-blur-sm">
          <img
            src="https://w7.pngwing.com/pngs/348/1019/png-transparent-search-icon.png"
            className="ml-4 h-5 w-5 text-muted-foreground text-zinc-950"
            alt="search"
          />
          <input
            type="search"
            placeholder="Search by city, neighborhood, or address"
            className="flex-1 w-4/6 bg-transparent py-3 pr-4 text-zinc-950 focus:outline-none"
          />
          <div className="flex border-l ">
            <button className=" px-4 py-3 hover:bg-black hover:text-white">
              Buy
            </button>
            
          </div>
        </div>
      </div>
      </div>
    </>
  );
};
export default Search;
