
import Counter from "@/components/ui/counter/Counter";

const Counters = () => {
    return(
    <section className="snap-start w-full bg-black h-screen relative">
        <div className="absolute inset-0"></div>
        <div className="relative z-10 h-full">
          <h1 className="text-4xl font-made-outer-alt font-normal ml-60 mb-4 text-white text-left absolute top-50 left-0 right-0 z-20 text-shadow-lg">
            Trusted by modern travelers worldwide.
          </h1>
          <div className="flex flex-row h-full w-full justify-center items-center px-24 gap-24 text-shadow-lg">
            <div className="relative p-12 h-64 flex flex-col justify-center items-center">
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white"></div>
              <Counter name="Trips" value={86} description="PlannEd with Nomadia" />
            </div>
            <div className="relative p-12 h-64 flex flex-col justify-center items-center">
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white"></div>
              <Counter name="CoUntriEs" value={37} description="ExplorEd by oUr UsErs" />
            </div>
            <div className="relative p-12 h-64 flex flex-col justify-center items-center">
              <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white"></div>
              <Counter name="Nomads" value={3274} description="growing CommUnity" />
            </div>
          </div>
        </div>
      </section>
    )
}

export default Counters;