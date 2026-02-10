import AirportText from "@/components/home/AirportText";


export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center bg-cover bg-center">
        <div className="text-center h-150">
          <h1 className="text-8xl font-black mb-4 leading-loose">NOMADIA</h1>
          <h1 className="text-7xl font-black mb-4 ">EXPLORE THE BEST</h1>
          <h1 className="text-7xl font-black mb-4 "><AirportText words={["LANDSCAPES", "CITIES", "CULTURES", "WITH US", "ANY TIME"]} /></h1>
        </div>
      </main>
    </div>
  );
}
