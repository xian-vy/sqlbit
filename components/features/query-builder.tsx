import { Card } from "../ui/card";
import ClearQuery from "./actions/clear-query";
import RunQuery from "./actions/run-query";
import { ExampleQuerySelector } from "./actions/example-selector";
import HistorySelector from "./actions/history-selector";
import { SqlEditorMonaco } from "./sql-editor-monaco";
import { SqlEditor } from "./sql-editor-raw";
import { useState, useEffect } from "react";


export function QueryBuilder() {
  const [isOnline, setIsOnline] = useState(typeof window === 'undefined' ? true : navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);


  return (
    <Card className={`!shadow-none  rounded-none bg-transparent gap-0 py-0 h-full relative border-0 border-b`}>
      {isOnline ? <SqlEditorMonaco/> : <SqlEditor />}
      <div className="absolute bottom-0 flex justify-between items-center w-full border-b  z-10">
          <div className="flex items-center">
              <ExampleQuerySelector  />
              <HistorySelector />
          </div>
          <div className="flex items-center">
              <ClearQuery />
              <RunQuery />   
          </div>
      </div>
    </Card>
  );
}