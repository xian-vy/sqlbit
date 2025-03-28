import { useSqlStore } from "@/store/sqlStore";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { SqlEditor } from "./sql-editor";
import { exampleQueries } from "@/data/example-queries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  handleClearQuery: () => void;
  handleRunQuery: () => void;
}

export function QueryBuilder({ handleClearQuery, handleRunQuery }: Props) {
  const { rawQuery, setRawQuery } = useSqlStore();

  const handleExampleSelect = (value: string) => {
    const selectedQuery = exampleQueries[value as keyof typeof exampleQueries];
    setRawQuery(selectedQuery);
  };

  return (
    <Card className="p-4 !shadow-none gap-3">
      <div className="self-end">
        <Select onValueChange={handleExampleSelect}>
          <SelectTrigger size="sm" className="w-[200px] shadow-none text-xs" >
            <SelectValue placeholder="Load example query" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(exampleQueries).map((queryName) => (
              <SelectItem key={queryName} value={queryName} className="text-xs">
                {queryName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <SqlEditor
        value={rawQuery ?? ''} // Ensure value is always a string
        onChange={setRawQuery}
        className="w-full h-48 text-xs sm:!text-sm resize-none p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
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