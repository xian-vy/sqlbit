import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usePagination } from "@/hooks/usePagination";
import { useSqlStore } from "@/store/sqlStore";
import { Expand, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { ResultsPagination } from "./results-pagination";

export function ResultsTable() {
  const { queryResults, queryError } = useSqlStore();
  const [expandedResults, setExpandedResults] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(50);

  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    nextPage,
    previousPage,
    canGoNext,
    canGoPrevious,
    startIndex,
    endIndex,
    totalItems,
  } = usePagination({
    data: queryResults || [],
    itemsPerPage,
  });


  if (queryError) {
    return (
      <div className="text-[0.7rem] sm:text-[0.8rem] 2xl:text-sm p-5 text-center h-[20vh] md:h-[50vh] text-red-600 dark:!text-red-400 flex items-center justify-center">
        {queryError}
      </div>
    );
  }

  if (!queryResults) {
    return (
      <div className="text-[0.7rem] sm:text-[0.8rem] 2xl:text-sm p-5 text-center h-[20vh] md:h-[50vh] flex items-center justify-center text-slate-400">
        No results to display. Run a query to see results.
      </div>
    );
  }

  if (queryResults.length === 0) {
    return (
      <div className="text-[0.7rem] sm:text-[0.8rem] 2xl:text-sm p-5 text-center h-[20vh] md:h-[50vh] flex items-center justify-center text-slate-400">
        Returned 0 rows
      </div>
    );
  }

  const columns = Object.keys(queryResults[0]);

  return (
    <Card className={`!shadow-none bg-transparent rounded-none border-0 ${expandedResults ? 'bg-background fixed inset-0 z-50 border py-2' : 'py-2 2xl:py-3'} gap-2`}>
      <div className="flex flex-col lg:flex-row justify-between items-center px-2 md:px-4">
          <div className="flex items-center justify-between lg:justify-start gap-4 w-full">
              <span className="text-[0.65rem] sm:text-[0.7rem] md:text-xs text-muted-foreground">
                {totalItems > 0 ? `Showing ${startIndex}-${endIndex} of ${totalItems} results` : ''}
              </span>
              <Button
                variant="ghost"
                onClick={() => setExpandedResults(!expandedResults)}
                className={`h-7 w-7 cursor-pointer !rounded-none !bg-background border-0 z-10 lg:hidden`}
              >
                {expandedResults ? <X strokeWidth={2} className="!w-3.5 md:!w-4 md:!h-4 !h-3" /> : <Expand strokeWidth={2} className="!w-3 !h-3" />}
              </Button>
        </div>
          <ResultsPagination
            currentPage={currentPage}
            totalPages={totalPages}
            goToPage={goToPage}
            nextPage={nextPage}
            previousPage={previousPage}
            canGoNext={canGoNext}
            canGoPrevious={canGoPrevious}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            expandedResults={expandedResults}
            setExpandedResults={setExpandedResults}
          />
      </div>

      <ScrollArea className={`w-full ${expandedResults ? 'h-[95vh]' : 'h-[65vh] lg:h-[60vh]'}`}>
        <ScrollBar orientation="horizontal" className="mt-0" />
        <div className="min-w-full inline-block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                {columns.map((column) => (
                  <TableHead key={column}>{column}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell>{rowIndex + 1}</TableCell>
                  {columns.map((column) => (
                    <TableCell key={`${rowIndex}-${column}`}>
                      {row[column] === null ? 'NULL' : String(row[column])}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>

      
    </Card>
  );
}