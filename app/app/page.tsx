'use client'
import { QueryBuilder } from "@/components/features/query-builder";
import { ResultsTable } from "@/components/features/results";
import TableList from "@/components/features/table-list";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useScreenSize } from "@/hooks/useScreenSize";
import { Loader2 } from "lucide-react";
import { Geist_Mono } from "next/font/google";
import { Pixelify_Sans } from "next/font/google";

import Link from "next/link";

const geist = Geist_Mono({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const pxel = Pixelify_Sans({
  variable: "--font-pixelify",
  subsets: ["latin"],
  });
export default function Home() {
  const screenWidth = useScreenSize();
  if (!screenWidth) {
    return <div className="flex min-h-screen w-full justify-center items-center bg-slate-900">
             <Loader2 className="animate-spin h-5 w-5 text-[#FF8C00]" />
           </div>;
  }
  const isXsScreen = screenWidth <= 640
  const isMdScreen = screenWidth >= 768;
  const isLgScreen = screenWidth >= 1024;
  return (
      <div className={`flex flex-col items-center min-h-screen bg-slate-900 ${geist.variable}`}>
        <div className="flex justify-between px-4 sm:px-6 xl:px-10 items-center w-full border-b border-slate-800 h-10 md:h-12">
          <h1 className={`text-base md:text-xl 2xl:text-2xl !font-black text-center ${pxel.className} font-pixelify`}>
            <span className="text-[#FF8C00]">SQL</span>
            <span className="text-slate-100">BIT</span>
          </h1>
          <div className="flex items-center gap-2">
            <Link href="/about" className="text-slate-300 hover:text-slate-100 text-xs xl:text-sm">
              about
            </Link>
          </div>
        </div>
        <main className="w-full mx-auto sm:px-5 md:px-10 2xl:px-16 flex-1">
          <ResizablePanelGroup 
            direction={isLgScreen  ? "horizontal" : "vertical"} 
            className="min-h-[calc(100vh-3.5rem)]"
          >
            <ResizablePanel defaultSize={
              isXsScreen ? 60 : 
              !isMdScreen ? 100 :
              isLgScreen ? 75 : 25
            }>
              <div className={`h-full w-full ${isXsScreen ? "border-0" : "border-x border-slate-800"}`}>
                <ResizablePanelGroup direction="vertical" className="h-full">
                  <ResizablePanel defaultSize={50}>
                    <QueryBuilder />
                  </ResizablePanel>
                  <ResizableHandle withHandle className="bg-transparent"/>
                  <ResizablePanel defaultSize={50}>
                    <ResultsTable />
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle className="lg:bg-transparent" />
            <ResizablePanel defaultSize={isXsScreen ? 40 : 25}>
              <div className={`h-full border-0 ${isLgScreen ? " border-r border-slate-800":"border-x border-slate-800"} `}>
                <ScrollArea className="h-[90vh] ">
                  <TableList />
                </ScrollArea>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </main>
      </div>
  );
}
