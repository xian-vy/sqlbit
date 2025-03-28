'use client'
import { QueryBuilder } from "@/components/features/query-builder";
import { ResultsTable } from "@/components/features/results";
import TableList from "@/components/features/table-list";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { tableData } from "@/data/tables";
import { useSqlStore } from "@/store/sqlStore";
import { SqlQueryResult } from "@/types/sql";
import alasql from "alasql/dist/alasql.min";
import { useEffect } from "react";

export default function Home() {
  const { setQueryResults, setQueryError, rawQuery, setRawQuery } = useSqlStore();

  const handleRunQuery = () => {
    if (!rawQuery.trim()) {
      setQueryError("Please enter a SQL query");
      return;
    }

    try {
      // Configure AlaSQL to be more strict
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
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      
   >
    <div  className="flex flex-col items-center" >
       <div className="flex justify-between px-10 items-center w-full border-b h-14">
            <h1 className="text-xl font-bold text-center ">SQL Playground</h1>
            <ModeToggle />
        </div>
       <main className="container max-w-screen-xl 3xl:max-w-screen-2xl mx-auto p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 3xl:gap-6">
                <div className="space-y-5 3xl:space-y-6 col-span-2 w-full">
                    <QueryBuilder handleClearQuery={handleClearQuery} handleRunQuery={handleRunQuery} />
                    <ResultsTable  />
                </div>
                <div className="space-y-4 col-span-1">
                    <TableList />
                </div>
            </div>
       </main>
    </div>
    </ThemeProvider>
  );
}
