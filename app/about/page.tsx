import { Pixelify_Sans } from "next/font/google";
import Link from "next/link";

const pxel = Pixelify_Sans({
variable: "--font-pixelify",
subsets: ["latin"],
});

const page = () => {
  return (
    <div className={`flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 min-h-screen ${pxel.className}`}>
    <div className="text-center space-y-8">
      <h1 className="text-6xl sm:text-7xl lg:text-8xl font-light tracking-tighter font-pixelify">
        <span className="text-[#FF8C00]">SQL</span>
        <span className="text-slate-100">BIT</span>
      </h1>
      <p className="text-slate-400 text-base sm:text-base 2xl:text-lg max-w-2xl mx-auto">
        Developed by <a href="https://xianvy.vercel.app" target="_blank" rel="noopener noreferrer" className="text-[#FF8C00] hover:text-[#FF9F33] transition-colors duration-200">Xian Vy</a>.
        </p>
      <div className="mt-8">
        <Link
          href="/app"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-slate-900 bg-[#FF8C00] hover:bg-[#FF9F33] transition-colors duration-200"
        >
          Back to Editor
        </Link>
      </div>
    </div>
  </div>
  )
}

export default page