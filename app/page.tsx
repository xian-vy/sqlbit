'use client'
import { QueryBuilder } from "@/components/features/query-builder";
import { ResultsTable } from "@/components/features/results";
import TableList from "@/components/features/table-list";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useScreenSize } from "@/hooks/useScreenSize";
import { Loader2 } from "lucide-react";

export default function Home() {
  const screenWidth = useScreenSize();
  if (!screenWidth) {
    return <div className="flex min-h-screen w-full justify-center items-center bg-background">
             <Loader2 className="animate-spin h-5 w-5" />
           </div>;
  }
  const isXsScreen = screenWidth < 768;
  const isMdScreen = screenWidth >= 768;
  const isLgScreen = screenWidth >= 1024;
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="flex flex-col items-center min-h-screen">
        <div className="flex justify-between px-4 md:px-6 xl:px-10 items-center w-full border-b h-10 md:h-14">
          <h1 className="text-xs md:text-sm 2xl:text-base font-bold text-center">SQLBIT</h1>
          <ModeToggle />
        </div>
        <main className="w-full mx-auto  md:px-5 xl:px-10 flex-1">
          <ResizablePanelGroup 
            direction={isXsScreen ? "vertical" : "horizontal"} 
            className="min-h-[calc(100vh-3.5rem)]"
          >
            <ResizablePanel defaultSize={
              isXsScreen ? 60 : 
              !isMdScreen ? 100 :
              isLgScreen ? 60 : 75
            }>
              <div className={`h-full w-full ${isXsScreen ? "border-0" : "border-r-0 border-l border-y-0"}`}>
                <ResizablePanelGroup direction="vertical" className="h-full">
                  <ResizablePanel defaultSize={50}>
                    <QueryBuilder />
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={50}>
                      <ScrollArea className="w-full h-[100vh] ">
                          <ScrollArea className="w-full h-[100vh] ">
                              <ResultsTable />
                           </ScrollArea>
                           <ScrollBar orientation="horizontal" />
                     </ScrollArea>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={isXsScreen ? 40 : 25}>
              <div className={`h-full ${isXsScreen ? "border-0":"border-r"} `}>
                <ScrollArea className="h-[90vh] ">
                  <TableList />
                </ScrollArea>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </main>
      </div>
    </ThemeProvider>
  );
}
