import { useSqlStore } from "@/store/sqlStore";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { SqlEditor } from "./sql-editor";
import { useEffect } from "react";
import alasql from "alasql/dist/alasql.min";
import { tableData } from "@/data/tables";
import { SqlQueryResult } from "@/types/sql";


export function QueryBuilder() {
  const { setQueryResults, setQueryError, rawQuery, setRawQuery } = useSqlStore();

  
  const handleRunQuery = () => {
    if (!rawQuery.trim()) {
      setQueryError("Please enter a SQL query");
      return;
    }

    try {
      alasql.options.sqllogictest = true;
      alasql.options.cache = false;
      alasql.options.autocommit = true;

      Object.entries(tableData).forEach(([tableName, data]) => {
        alasql(`CREATE TABLE IF NOT EXISTS ${tableName}`);
        alasql(`TRUNCATE TABLE ${tableName}`);
        alasql(`INSERT INTO ${tableName} SELECT * FROM ?`, [data]);
      });

      console.log("Executing query:", rawQuery);
      const results = alasql(rawQuery) as SqlQueryResult[];
      
      setQueryResults(results);
      setQueryError(null);
    } catch (error) {
      setQueryError(error instanceof Error ? error.message : "An error occurred");
      setQueryResults(null);
    }
  };

  const handleClearQuery = () => {
    setRawQuery('');
    setQueryResults(null);
    setQueryError(null);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === 'x') {
        handleRunQuery();
      }
      if (e.key === 'Escape') {
        handleClearQuery();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [rawQuery]);

  return (
    <Card className="p-2 sm:p-4 !shadow-none border-0 border-b rounded-none bg-transparent gap-0">
      <SqlEditor/>
      <div className="flex gap-2 justify-between items-center w-full mt-2 xl:mt-3 2xl:mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={handleClearQuery}
          className="flex flex-col items-center gap-0 text-[0.65rem] sm:text-xs"
        >
          Clear All
          <span className="text-[0.55rem] text-muted-foreground hidden sm:block">Esc</span>
        </Button>
        <Button
          variant="outline"
            size="sm"
          onClick={handleRunQuery}
          className="flex flex-col items-center gap-0 text-[0.65rem] sm:text-xs"
        >
          Run Query
          <span className="text-[0.55rem] text-muted-foreground hidden sm:block">Alt + X</span>
        </Button>
      </div>
    </Card>
  );
}