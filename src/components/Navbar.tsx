import Image from 'next/image';
import Link from 'next/link';


const Navbar = () => {
    return (
        <div className="fixed top-0 left-0 z-1000 flex w-screen justify-between border-b pl-48 pr-48 py-4 px-4 backdrop-blur-md bg-white/10 border-b-0,5 border-solid border-black ">
            <div className='flex items-center gap-5 pl-30px text-xs text-black'>
                <Image src="/nomadiaBlack.png" alt="Nomadia White Logo" width={250} height={100} />
            </div>
            <nav className='flex items-center gap-5 pr-30px text-xl'>
                <Link href="/about" className="font-semibold text-black no-underline hover:underline text-2xl">Pricing</Link>
                <Link href="/blog" className="font-semibold text-black no-underline hover:underline text-2xl">Sign In</Link>
                <Link href="/search" className="font-semibold text-black no-underline hover:underline text-2xl">Login</Link>
            </nav>
        </div>
    )
}

export default Navbar;

