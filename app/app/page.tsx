'use client'
import { QueryBuilder } from "@/components/features/query-builder";
import { ResultsTable } from "@/components/features/results";
import TableList from "@/components/features/table-list";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { Database,  SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { Geist_Mono, Pixelify_Sans } from "next/font/google";

const geist = Geist_Mono({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const pxel = Pixelify_Sans({
  variable: "--font-pixelify",
  subsets: ["latin"],
  });

export default function Home() {
  const {theme, setTheme} = useTheme()

  const handleThemeToggle = ()=> {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  
  return (
      <div className={`flex flex-col items-center min-h-screen ${geist.variable} bg-background`}>
        <div className="flex justify-between px-4 sm:px-6 xl:px-10 items-center w-full border-b h-10 md:h-12">
          <h1 className={`text-base md:text-xl 2xl:text-2xl !font-black text-center ${pxel.className} font-pixelify`}>
            <span className="text-[#FF8C00]">SQL</span>
            <span className="text-slate-900 dark:text-slate-100">BIT</span>
          </h1>
          <div className="flex items-center gap-4 sm:gap-5 w-fit">
            <Sheet>
                <SheetTrigger className="text-slate-900 dark:text-slate-300  text-[0.6rem] sm:text-[0.7rem] font-medium tracking-wide flex items-center gap-1.5 cursor-pointer">
                    <Database className="w-3 3xl:w-4 h-3 3xl:h-4 shrink-0" /> SCHEMA
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-[500px] lg:max-w-[600px] gap-0">
                  <SheetHeader>
                     <SheetTitle className="flex items-center gap-2 text-xs xl:text-sm">  <Database className="w-4 h-4 shrink-0" /> SCHEMA</SheetTitle>
                  </SheetHeader>
                  <ScrollArea className="px-2 sm:px-4 md:px-6 h-[90vh]">
                      <TableList />
                  </ScrollArea>
                </SheetContent>
            </Sheet>
            <button  onClick={handleThemeToggle} className="cursor-pointer text-black/80 dark:text-slate-300">
                <SunMoon className="w-3.5 3xl:w-5 h-3.5 3xl:h-5 shrink-0" />
            </button>
          </div>
        </div>
        <main className="w-full h-full mx-auto lg:px-10 2xl:px-16 3xl:!px-24 flex-1">
              <ResizablePanelGroup direction="vertical" className={`min-h-[calc(100vh-3.5rem)] lg:border-x`}>
                  <ResizablePanel defaultSize={30} minSize={15}>
                    <QueryBuilder />
                  </ResizablePanel>
                  <ResizableHandle withHandle className="bg-transparent"/>
                  <ResizablePanel defaultSize={70} maxSize={85}>
                    <ResultsTable />
                  </ResizablePanel>
              </ResizablePanelGroup>
        </main>
      </div>
  );
}
