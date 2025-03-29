import { useSqlStore } from "@/store/sqlStore";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { SqlEditor } from "./sql-editor";
import { useEffect } from "react";
import alasql from "alasql/dist/alasql.min";
import { tableData } from "@/data/tables";
import { SqlQueryResult } from "@/types/sql";
import { ExampleQuerySelector } from "./example-query-selector";


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
    <Card className="!shadow-none border-0 rounded-none bg-transparent gap-0 py-0 h-full relative">
      <SqlEditor/>
      <div className="absolute bottom-0 left-0 flex  justify-start items-center w-full">
          <ExampleQuerySelector  />

            <Button
              variant="outline"
              size="sm"
              onClick={handleClearQuery}
              className="flex flex-col items-center gap-0 text-[0.7rem] sm:text-xs !rounded-none border-x-0 border-b-0 !bg-background !font-normal" 
            >
              Clear All
              <span className="text-[0.55rem] text-muted-foreground hidden sm:block ">Esc</span>
            </Button>
            <Button
              variant="outline"
                size="sm"
              onClick={handleRunQuery}
              className="flex flex-col items-center gap-0 text-[0.7rem] sm:text-xs !rounded-none  border-b-0 !bg-background  !font-normal"
            >
              Run Query
              <span className="text-[0.55rem] text-muted-foreground hidden sm:block ">Alt + X</span>
            </Button>
      </div>
    </Card>
  );
}