import Counter from "@/components/ui/counter/Counter";

const Counters = () => {
    return (
      <section className="snap-start w-full min-h-screen relative flex flex-col justify-center items-center px-6 xl:px-24 py-24 gap-6 mt-10">
        <h1 className=" text-3xl xl:text-7xl font-made-outer-alt font-normal text-white text-center xl:text-center w-full text-shadow-lg">
          TrUstEd by modErn travElErs
        </h1>
        <h1 className="mb-36 text-3xl xl:text-6xl font-made-outer-alt font-normal text-gray-400 text-center xl:text-center w-full text-shadow-lg">
          worlwidE
        </h1>
        <div className="grid grid-cols-1 xl:flex xl:flex-row w-full justify-center items-center xl:gap-24 text-shadow-lg">
          <div className="relative p-12 h-64 flex flex-col justify-center items-center">
            <div className="absolute top-15 left-5 xl:top-0 xl:left-0 w-16 h-16 border-t-2 border-l-2 border-white"></div>
            <div className="absolute bottom-15 right-5 xl:bottom-0 xl:right-0 w-16 h-16 border-b-2 border-r-2 border-white"></div>
            <Counter name="Trips" value={86} description="PlannEd with Nomadia" />
          </div>
          <div className="relative p-12 h-64 flex flex-col justify-center items-center">
            <div className="absolute top-15 left-5 xl:top-0 xl:left-0 w-16 h-16 border-t-2 border-l-2 border-white"></div>
            <div className="absolute bottom-15 right-5 xl:bottom-0 xl:right-0 w-16 h-16 border-b-2 border-r-2 border-white"></div>
            <Counter name="CoUntriEs" value={37} description="ExplorEd by oUr UsErs" />
          </div>
          <div className="relative p-12 h-64 flex flex-col justify-center items-center">
            <div className="absolute top-15 left-5 xl:top-0 xl:left-0 w-16 h-16 border-t-2 border-l-2 border-white"></div>
            <div className="absolute bottom-15 right-5 xl:bottom-0 xl:right-0 w-16 h-16 border-b-2 border-r-2 border-white"></div>
            <Counter name="Nomads" value={3274} description="growing CommUnity" />
          </div>
        </div>
      </section>
    );
}

export default Counters;