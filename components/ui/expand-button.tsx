import { Maximize2, Minimize2 } from "lucide-react";
import { Button } from "./button";

interface ExpandButtonProps {
  isExpanded: boolean;
  onClick: () => void;
}

export function ExpandButton({ isExpanded, onClick }: ExpandButtonProps) {
  return (
    <Button variant="ghost"  onClick={onClick} className="h-7 w-7 cursor-pointer bg-muted">
      {isExpanded ? <Minimize2 strokeWidth={1.5} className="!w-3 !h-3" /> : <Maximize2 strokeWidth={1.5} className="!w-3 !h-3"  />}
    </Button>
  );
}