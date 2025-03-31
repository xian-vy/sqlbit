import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useSqlStore } from "@/store/sqlStore";
import { Maximize2, Minimize2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

export function ResultsTable() {
  const { queryResults, queryError } = useSqlStore();
  const [expandedResults, setExpandedResults] = useState(false);

  if (queryError) {
    return (
      <div className="text-[0.7rem] sm:text-[0.8rem] 2xl:text-sm p-5 text-center h-[20vh] md:h-[50vh] text-red-600 dark:!text-red-400 flex items-center justify-center">
        {queryError}
      </div>
    );
  }

  if (!queryResults ) {
    return (
      <div className="text-[0.7rem] sm:text-[0.8rem] 2xl:text-sm p-5 text-center h-[20vh] md:h-[50vh] flex items-center justify-center">
        No results to display. Run a query to see results.
      </div>
    );
  }

  if ( queryResults.length === 0) {
    return (
      <div className="text-[0.7rem] sm:text-[0.8rem] 2xl:text-sm p-5 text-center h-[20vh] md:h-[50vh] flex items-center justify-center">
        Returned 0 rows
      </div>
    );
  }

  const columns = Object.keys(queryResults[0]);

  return (
    <Card className={`!shadow-none  bg-transparent rounded-none border-0 py-2 2xl:py-3 ${expandedResults ? 'fixed inset-4 z-50 bg-card  ' : ''} gap-2`}>
    <div className="flex justify-between items-center px-2">
      <span className="text-[0.7rem] sm:text-xs text-muted-foreground">
        {queryResults?.length ? `Showing ${queryResults.length} results` : ''}
      </span>
      <Button
          variant="ghost"  
          onClick={() => setExpandedResults(!expandedResults)} 
          className={`h-7 w-7 cursor-pointer  !rounded-none !bg-background border-0 z-10 `}>
          {expandedResults ? <Minimize2 strokeWidth={2} className="!w-3 !h-3" /> : <Maximize2 strokeWidth={2} className="!w-3 !h-3"  />}
        </Button>
      </div>

    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {queryResults.map((row, rowIndex) => (
            <TableRow key={rowIndex} >
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
    </Card>

  );
}