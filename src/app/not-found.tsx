
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="text-white text-center min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="font-made-outer-alt text-7xl">404</h1>
      <p className="text-5xl font-made-outer-alt text-gray-500">pagE not foUnd</p>
      <Image src="/404.png" alt="404 Not Found" width={400} height={300} />
    </div>
  );
}