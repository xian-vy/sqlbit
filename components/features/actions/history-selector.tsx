import { useSqlStore } from "@/store/sqlStore";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/select";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const HistorySelector = () => {
const { setRawQuery, queryHistory, rawQuery, removeFromHistory } = useSqlStore();
const [currentSelection, setCurrentSelection] = useState<string>("");

const handleHistorySelect = (value: string) => {
    try {
      if (value.startsWith('history||')) {
        const index = parseInt(value.split('||')[1]);
        setRawQuery(queryHistory[index]);
        return;
      }
    } catch  (e) {
      console.error("Error selecting history:", e);
    }
}

useEffect(() => {
    if (rawQuery.trim() === '') {
     setCurrentSelection('');
    }
   }, [rawQuery])
  return (
    <Select value={currentSelection} onValueChange={handleHistorySelect}>
    <SelectTrigger size="sm" className="w-[85px] sm:w-[90px] xl:w-[100px] shadow-none text-[0.65rem] sm:text-[0.7rem] md:text-xs  !rounded-none border-l-0 border-b-0 !bg-background text-[#FF8C00]">
      <SelectValue placeholder="History" />
    </SelectTrigger>
    <SelectContent className="shadow-none rounded-none ">
      <div className="grid grid-cols-2 gap-2">
        {queryHistory.length > 0 && (
          <div className="col-span-2 mb-2">
            <SelectItem value="history"  className="text-[0.65rem] sm:text-[0.7rem] md:text-xs font-medium pointer-events-none">
              Recent Queries (15 max)
            </SelectItem>
            {queryHistory.map((query, index) => (
              <div key={`history-${index}`} className="flex items-center group relative ">
                <Tooltip>
                  <TooltipTrigger asChild className="cursor-pointer">
                        <SelectItem
                          value={`history||${index}`}
                          className="text-[0.65rem] sm:text-[0.7rem] md:text-xs  pl-4 flex-1 hover:underline underline-offset-4"
                        >
                            {index + 1} {".) "} {query.length > 30 ? query.substring(0, 30) + '...' : query}
                        </SelectItem>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[260px] border bg-slate-950">
                    <p className="text-white">{query}</p>
                  </TooltipContent>
                </Tooltip>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeFromHistory(index);
                  }}
                  className="absolute right-2 opacity-0 group-hover:opacity-100 p-1 hover:text-destructive transition-opacity hover:scale-150 cursor-pointer"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </SelectContent>
  </Select>
  )
}

export default HistorySelector