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
  const isXsScreen = screenWidth <= 640
  const isMdScreen = screenWidth >= 768;
  const isLgScreen = screenWidth >= 1024;
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="flex flex-col items-center min-h-screen">
        <div className="flex justify-between px-4 sm:px-6 xl:px-10 items-center w-full border-b h-10 md:h-12">
          <h1 className="text-xs md:text-sm 2xl:text-base font-bold text-center">SQLBIT</h1>
          <ModeToggle />
        </div>
        <main className="w-full mx-auto  sm:px-5 md:px-10 2xl:px-16 flex-1">
          <ResizablePanelGroup 
            direction={isLgScreen  ? "horizontal" : "vertical"} 
            className="min-h-[calc(100vh-3.5rem)]"
          >
            <ResizablePanel defaultSize={
              isXsScreen ? 60 : 
              !isMdScreen ? 100 :
              isLgScreen ? 75 : 25
            }>
              <div className={`h-full w-full ${isXsScreen ? "border-0" : "border-x"}`}>
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
              <div className={`h-full border-0 ${isLgScreen ? " border-r":"border-x"} `}>
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
