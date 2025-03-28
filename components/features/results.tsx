import { useSqlStore } from "@/store/sqlStore";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "../ui/card";
import { ExpandButton } from "../ui/expand-button";
import { useState } from "react";

export function ResultsTable() {
  const { queryResults, queryError } = useSqlStore();
  const [expandedResults, setExpandedResults] = useState(false);

  if (queryError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{queryError}</AlertDescription>
      </Alert>
    );
  }

  if (!queryResults || queryResults.length === 0) {
    return (
      <div className="text-sm border rounded-lg p-4 text-center text-gray-500">
        No results to display. Run a query to see results.
      </div>
    );
  }

  const columns = Object.keys(queryResults[0]);

  return (
    <Card className={`p-4 !shadow-none ${expandedResults ? 'fixed inset-4 z-50 bg-card' : ''}`}>
    <div className="flex justify-between items-center ">
      <span className="text-xs text-muted-foreground">
        {queryResults?.length ? `Showing ${queryResults.length} results` : ''}
      </span>
       <ExpandButton 
                isExpanded={expandedResults} 
                onClick={() => setExpandedResults(!expandedResults)} 
        />
      </div>

    <div className="border rounded-lg overflow-auto">
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
            <TableRow key={rowIndex}>
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