import { exampleQueries } from "@/data/example-queries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  onQuerySelect: (query: string) => void;
}

export function ExampleQuerySelector({ onQuerySelect }: Props) {
  const handleExampleSelect = (value: string) => {
    try {
      const [category, queryName] = value.split('||') as [keyof typeof exampleQueries, string];
      const categoryQueries = exampleQueries[category];
      
      if (!categoryQueries) {
        console.warn(`Category "${category}" not found in example queries`);
        return;
      }

      const selectedQuery = categoryQueries[queryName];
      if (!selectedQuery) {
        console.warn(`Query "${queryName}" not found in category "${category}"`);
        return;
      }

      onQuerySelect(selectedQuery);
    } catch (error) {
      console.error('Error selecting example query:', error);
    }
  };

  const categories = Object.entries(exampleQueries);
  const midPoint = Math.ceil(categories.length / 2);
  const leftColumn = categories.slice(0, midPoint);
  const rightColumn = categories.slice(midPoint);

  return (
    <div className="self-end">
      <Select onValueChange={handleExampleSelect}>
        <SelectTrigger size="sm" className="w-[200px] shadow-none text-xs">
          <SelectValue placeholder="Load example query" />
        </SelectTrigger>
        <SelectContent>
          <div className="grid grid-cols-2 gap-2">
            <div>
              {leftColumn.map(([category, queries]) => (
                <div key={category}>
                  <SelectItem value={category} disabled className="text-xs font-bold text-muted-foreground">
                    {category}
                  </SelectItem>
                  {Object.entries(queries).map(([queryName]) => (
                    <SelectItem
                      key={`${category}||${queryName}`}
                      value={`${category}||${queryName}`}
                      className="text-xs pl-4"
                    >
                      {queryName}
                    </SelectItem>
                  ))}
                </div>
              ))}
            </div>
            <div>
              {rightColumn.map(([category, queries]) => (
                <div key={category}>
                  <SelectItem value={category} disabled className="text-xs font-bold text-muted-foreground">
                    {category}
                  </SelectItem>
                  {Object.entries(queries).map(([queryName]) => (
                    <SelectItem
                      key={`${category}||${queryName}`}
                      value={`${category}||${queryName}`}
                      className="text-xs pl-4"
                    >
                      {queryName}
                    </SelectItem>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </SelectContent>
      </Select>
    </div>
  );
}