import { Pixelify_Sans } from "next/font/google";
import Link from "next/link";
import './globals.css'

const pxel = Pixelify_Sans({
  variable: "--font-pixelify",
  subsets: ["latin"],
  });
  

export default function Landing() {
  return (
    <div className={`flex flex-col min-h-screen  ${pxel.className} font-pixelify antialiased`}>
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-tighter font-pixelify">
            <span className="text-[#FF8C00]">SQL</span>
            <span className="text-slate-900 dark:text-slate-100">BIT</span>
          </h1>
          <p className="text-slate-900 dark:text-slate-300 text-sm sm:text-base md:text-lg 2xl:text-xl max-w-2xl mx-auto px-4 sm:px-0">
            No Fuss SQL Playground with prebuilt queries and tables.
          </p>
          <div className="mt-8">
            <Link
              href="/app"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm sm:text-base font-semibold rounded-md text-white dark:text-slate-900  bg-[#FF8C00] hover:bg-[#FF9F33] transition-colors duration-200"
            >
              TRY IT OUT
            </Link>
          </div>
        </div>
      </main>
      <footer>
          <p className="text-slate-900 dark:text-slate-400  text-xs sm:text-sm absolute left-1/2 bottom-5 -translate-x-1/2">
            Developed by <Link href="https://xianvy.vercel.app" target="_blank" rel="noopener noreferrer" className="text-[#FF8C00] hover:text-[#FF9F33] transition-colors duration-200">XIAN VY</Link>
         </p>
      </footer>
    </div>
  );
}
