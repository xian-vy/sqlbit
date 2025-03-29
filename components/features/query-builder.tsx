import { useSqlStore } from "@/store/sqlStore";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { SqlEditor } from "./sql-editor";
import { ExampleQuerySelector } from "./example-query-selector";

interface Props {
  handleClearQuery: () => void;
  handleRunQuery: () => void;
}

export function QueryBuilder({ handleClearQuery, handleRunQuery }: Props) {
  const { rawQuery, setRawQuery } = useSqlStore();

  return (
    <Card className="p-4 !shadow-none gap-3">
      <ExampleQuerySelector onQuerySelect={setRawQuery} />
      <SqlEditor
        value={rawQuery ?? ''} 
        onChange={setRawQuery}
        className="w-full h-48 text-xs sm:!text-sm  p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
      />
      <div className="flex gap-2 justify-between items-center w-full mt-4">
        <Button
          variant="outline"
          onClick={handleClearQuery}
          className="flex flex-col items-center gap-0 text-xs"
        >
          Clear All
          <span className="text-[0.55rem] text-muted-foreground">Esc</span>
        </Button>
        <Button
          variant="outline"
          onClick={handleRunQuery}
          className="flex flex-col items-center gap-0 text-xs"
        >
          Run Query
          <span className="text-[0.55rem] text-muted-foreground">Alt + X</span>
        </Button>
      </div>
    </Card>
  );
}