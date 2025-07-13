import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usePagination } from "@/hooks/usePagination";
import { useSqlStore } from "@/store/sqlStore";
import { Expand,  X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

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

  useEffect(() => {
    if (queryResults && queryResults.length > 0) {
      goToPage(1);
    }
  }, [queryResults, goToPage]);

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

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

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
          <div className="flex items-center justify-between lg:justify-end gap-1 sm:gap-2 md:gap-3 lg:gap-4 w-full">
               {totalPages > 1 && (
                <div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={previousPage}
                        className={!canGoPrevious ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                    
                    {getPageNumbers().map((page, index) => (
                      <PaginationItem key={index}>
                        {page === 'ellipsis' ? (
                          <PaginationEllipsis />
                        ) : (
                          <PaginationLink
                            onClick={() => goToPage(page as number)}
                            isActive={currentPage === page}
                            className="!text-[0.6rem] md:!text-[0.7rem] !h-6 !w-6"
                          >
                            {page}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext
                        onClick={nextPage}
                        className={!canGoNext ? 'pointer-events-none opacity-50' : ''}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
             )}
              {totalPages > 1 && (
                  <div className="flex items-center gap-2">
                    <Select value={String(itemsPerPage)} onValueChange={(value) => setItemsPerPage(Number(value))}>
                      <SelectTrigger className="!h-6 w-16 text-[0.6rem] sm:text-[0.7rem] !rounded-none shadow-none">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                        <SelectItem value="200">200</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              <Button
                variant="ghost"
                onClick={() => setExpandedResults(!expandedResults)}
                className={`h-7 w-7 cursor-pointer !rounded-none !bg-background border-0 z-10 hidden lg:block`}
              >
                {expandedResults ? <X strokeWidth={2} className="!w-3.5 md:!w-4 md:!h-4 !h-3" /> : <Expand strokeWidth={2} className="!w-3 !h-3" />}
              </Button>
        </div>

      </div>

      <ScrollArea className={`w-full ${expandedResults ? 'h-full' : 'h-[calc(80vh-3rem)]'}`}>
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