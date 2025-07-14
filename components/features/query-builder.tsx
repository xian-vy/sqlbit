import { Card } from "../ui/card";
import ClearQuery from "./actions/clear-query";
import RunQuery from "./actions/run-query";
import { ExampleQuerySelector } from "./actions/example-selector";
import HistorySelector from "./actions/history-selector";
import { SqlEditorMonaco } from "./sql-editor-monaco";


export function QueryBuilder() {


  return (
    <Card className={`!shadow-none  rounded-none bg-transparent gap-0 py-0 h-full relative border-0 border-b`}>
      <SqlEditorMonaco/>
      <div className="absolute bottom-0 flex justify-between items-center w-full  z-10">
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