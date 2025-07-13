import { exampleQueries } from "@/data/example-queries";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useSqlStore } from "@/store/sqlStore";
import { useEffect, useState } from "react";



export function ExampleQuerySelector() {
  const { rawQuery, setRawQuery } = useSqlStore();
  const [currentSelection, setCurrentSelection] = useState<string>("");

  const handleExampleSelect = (value: string) => {
    setCurrentSelection(value);

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

      setRawQuery(selectedQuery);
    } catch (error) {
      console.error('Error selecting example query:', error);
    }
  };

  useEffect(() => {
   if (rawQuery.trim() === '') {
    setCurrentSelection('');
   }
  }, [rawQuery])
  

  const categories = Object.entries(exampleQueries);
  const midPoint = Math.ceil(categories.length / 2);
  const leftColumn = categories.slice(0, midPoint);
  const rightColumn = categories.slice(midPoint);

  return (
    <div className="self-end">
      <Select value={currentSelection} onValueChange={handleExampleSelect}>
        <SelectTrigger size="sm" className="w-[95px] sm:w-[100px] shadow-none text-[0.65rem] sm:text-[0.7rem] md:text-xs !rounded-none border-l-0 border-b-0 !bg-background text-[#FF8C00]">
          <SelectValue placeholder="Examples" />
        </SelectTrigger>
        <SelectContent className="shadow-none rounded-none ">
          <div className="grid grid-cols-2 gap-2">
            <div>
              {leftColumn.map(([category, queries]) => (
                <div key={category}>
                  <SelectItem value={category} disabled className="text-[0.65rem] sm:text-[0.7rem] md:text-xs   font-bold text-muted-foreground">
                    {category}
                  </SelectItem>
                  {Object.entries(queries).map(([queryName]) => (
                    <SelectItem
                      key={`${category}||${queryName}`}
                      value={`${category}||${queryName}`}
                      className="text-[0.65rem] sm:text-[0.7rem] md:text-xs  pl-4"
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
                  <SelectItem value={category} disabled className="text-[0.65rem] sm:text-[0.7rem] md:text-xs  font-bold text-muted-foreground">
                    {category}
                  </SelectItem>
                  {Object.entries(queries).map(([queryName]) => (
                    <SelectItem
                      key={`${category}||${queryName}`}
                      value={`${category}||${queryName}`}
                      className="text-[0.65rem] sm:text-[0.7rem] md:text-xs  pl-4"
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