import { Button } from "@/components/ui/button";
import { tableData } from "@/data/schema";
import { useSqlStore } from "@/store/sqlStore";
import { SqlQueryResult } from "@/types/sql";
import alasql from "alasql/dist/alasql.min";
import { useEffect } from "react";
import { handleSqlError } from "@/utils/sql-error-handler";

const RunQuery = () => {
    const { setQueryResults, setQueryError, rawQuery, setRawQuery, addToHistory } = useSqlStore();

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
          addToHistory(rawQuery);  
        } catch (error) {
          setQueryError(
            error instanceof Error 
              ? handleSqlError(error)
              : "An unexpected error occurred"
          );
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
    <Button
        variant="outline"
        size="sm"
        onClick={handleRunQuery}
        className="flex flex-col items-center gap-0 text-[0.7rem] sm:text-xs !rounded-none border-r-0 border-b-0 !bg-background  !font-normal"
    >
            Run Query
        <span className="text-[0.55rem] text-muted-foreground hidden sm:block ">Alt + X</span>
  </Button>
  )
}

export default RunQuery