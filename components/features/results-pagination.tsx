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
import { Button } from "../ui/button";
import { Expand, X } from "lucide-react";
import React from "react";

interface ResultsPaginationProps {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  itemsPerPage: number;
  setItemsPerPage: (n: number) => void;
  expandedResults: boolean;
  setExpandedResults: (b: boolean) => void;
}

export const ResultsPagination: React.FC<ResultsPaginationProps> = ({
  currentPage,
  totalPages,
  goToPage,
  nextPage,
  previousPage,
  canGoNext,
  canGoPrevious,
  itemsPerPage,
  setItemsPerPage,
  expandedResults,
  setExpandedResults,
}) => {
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
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between lg:justify-end gap-1 sm:gap-2 md:gap-3 lg:gap-4 w-full -ml-4">
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={previousPage}
                className={!canGoPrevious ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {getPageNumbers().map((page, index) => (
              <PaginationItem key={index}>
                {page === "ellipsis" ? (
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
                className={!canGoNext ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <div className="flex items-center gap-2">
        <Select value={String(itemsPerPage)} onValueChange={(value) => setItemsPerPage(Number(value))}>
          <SelectTrigger className="!h-6 w-16 text-[0.6rem] sm:text-[0.7rem] !rounded-none shadow-none -mr-2">
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
      <Button
        variant="ghost"
        onClick={() => setExpandedResults(!expandedResults)}
        className={`h-7 w-7 cursor-pointer !rounded-none !bg-background border-0 z-10 hidden lg:block`}
      >
        {expandedResults ? (
          <X strokeWidth={2} className="!w-3.5 md:!w-4 md:!h-4 !h-3" />
        ) : (
          <Expand strokeWidth={2} className="!w-3 !h-3" />
        )}
      </Button>
    </div>
  );
}; 