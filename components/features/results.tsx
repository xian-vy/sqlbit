import { useSqlStore } from "@/store/sqlStore";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Maximize2, Minimize2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "../ui/card";
import { useState } from "react";
import { Button } from "../ui/button";

export function ResultsTable() {
  const { queryResults, queryError } = useSqlStore();
  const [expandedResults, setExpandedResults] = useState(false);

  if (queryError) {
    return (
      <Alert variant="destructive" className="p-5 border-0 flex justify-center">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{queryError}</AlertDescription>
      </Alert>
    );
  }

  if (!queryResults || queryResults.length === 0) {
    return (
      <div className="text-xs sm:text-sm  p-5 text-center text-gray-500">
        No results to display. Run a query to see results.
      </div>
    );
  }

  const columns = Object.keys(queryResults[0]);

  return (
    <Card className={`p-4 !shadow-none  bg-transparent ${expandedResults ? 'fixed inset-4 z-50 bg-card border rounded-none' : 'border-none'} gap-2`}>
    <div className="flex justify-between items-center ">
      <span className="text-xs text-muted-foreground">
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
          <TableRow className="!border-0">
            {columns.map((column) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {queryResults.map((row, rowIndex) => (
            <TableRow key={rowIndex} className="!border-0">
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