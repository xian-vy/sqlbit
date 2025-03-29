'use client'
import { QueryBuilder } from "@/components/features/query-builder";
import { ResultsTable } from "@/components/features/results";
import TableList from "@/components/features/table-list";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useScreenSize } from "@/hooks/useScreenSize";

export default function Home() {
  const screenWidth = useScreenSize();
  if (!screenWidth) {
    return <p>loading...</p>;
  }
  const isXsScreen = screenWidth < 768;
  const isMdScreen = screenWidth >= 768;
  const isLgScreen = screenWidth >= 1024;
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <div className="flex flex-col items-center min-h-screen">
        <div className="flex justify-between px-5 md:px-10 items-center w-full border-b h-10 md:h-14">
          <h1 className="text-xs md:text-sm font-semibold text-center">SQLBIT</h1>
          <ModeToggle />
        </div>
        <main className="w-full mx-auto  sm:px-5 xl:px-10 flex-1">
          <ResizablePanelGroup 
            direction={isXsScreen ? "vertical" : "horizontal"} 
            className="min-h-[calc(100vh-3.5rem)]"
          >
            <ResizablePanel defaultSize={
              isXsScreen ? 60 : 
              !isMdScreen ? 100 :
              isLgScreen ? 60 : 75
            }>
              <div className={`h-full w-full ${isXsScreen ? "border-x border-y-0" : "border-r-0 border-l border-y-0"}`}>
                <ResizablePanelGroup direction="vertical" className="h-full">
                  <ResizablePanel defaultSize={50}>
                    <QueryBuilder />
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize={50}>
                    <ResultsTable />
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={isXsScreen ? 40 : 25}>
              <div className={`h-full ${isXsScreen ? "border-x":"border-r"} `}>
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
