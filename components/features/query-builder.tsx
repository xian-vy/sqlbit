import { Card } from "../ui/card";
import ClearQuery from "./actions/clear-query";
import RunQuery from "./actions/run-query";
import { ExampleQuerySelector } from "./actions/example-selector";
import HistorySelector from "./actions/history-selector";
import { SqlEditor } from "./sql-editor";


export function QueryBuilder() {


  return (
    <Card className="!shadow-none border-0 rounded-none bg-transparent gap-0 py-0 h-full relative">
      <SqlEditor/>
      <div className="flex justify-between items-center w-full">
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