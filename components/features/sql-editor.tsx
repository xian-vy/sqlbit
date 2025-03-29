import { tableData, TableName } from '@/data/schema';
import { useRef, useState } from 'react';
import { Textarea } from '../ui/textarea';
import { useSqlStore } from '@/store/sqlStore';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function SqlEditor() {
  const { rawQuery, setRawQuery } = useSqlStore();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const getAllSuggestions = () => {
    const tables = Object.keys(tableData) as TableName[];
    const columns = tables.flatMap(table => {
      const firstRow = tableData[table][0];
      return firstRow ? Object.keys(firstRow).map(col => `${table}.${col}`) : [];
    });
    return [...tables, ...columns];
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setRawQuery(newValue);
    setSelectedIndex(0);

    const cursorPos = e.target.selectionStart;
    const textBeforeCursor = newValue.slice(0, cursorPos);
    const words = textBeforeCursor.split(/\s+/);
    const currentWord = words[words.length - 1].toLowerCase();

    if (currentWord.length > 0) {
      const allSuggestions = getAllSuggestions();
      let filtered : string[] = [];
      
      if (currentWord.includes('.')) {
        const [tableName, columnPrefix = ''] = currentWord.split('.');
        const table = tableName as TableName;
        
        if (tableData[table]) {
          const columns = Object.keys(tableData[table][0] || {});
          filtered = columns
            .filter(col => col.toLowerCase().startsWith(columnPrefix))
            .map(col => `${tableName}.${col}`);
        } else {
          filtered = [];
        }
      } else {
        filtered = allSuggestions.filter(s => 
          s.toLowerCase().startsWith(currentWord)
        );
      }

      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);

      // Get cursor position
      const textarea = textareaRef.current;
      if (textarea) {
        const { selectionStart } = textarea;
        const textBeforeCursor = textarea.value.substring(0, selectionStart);
        const lines = textBeforeCursor.split('\n');
        const currentLineNumber = lines.length - 1;
        const currentLineText = lines[currentLineNumber];
        
        // Create a temporary span to measure text width
        const span = document.createElement('span');
        span.style.font = window.getComputedStyle(textarea).font;
        span.style.visibility = 'hidden';
        span.style.position = 'absolute';
        span.textContent = currentLineText;
        document.body.appendChild(span);
        
        const rect = textarea.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(textarea);
        const lineHeight = parseInt(computedStyle.lineHeight);
        const paddingTop = parseInt(computedStyle.paddingTop);
        const paddingLeft = parseInt(computedStyle.paddingLeft);
        
        setCursorPosition({
          x: rect.left + paddingLeft + span.offsetWidth -lineHeight,
          y: rect.top + (currentLineNumber * lineHeight) + paddingTop - lineHeight
        });
        
        document.body.removeChild(span);
      }
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const cursorPos = textareaRef.current?.selectionStart || 0;
    const textBeforeCursor = rawQuery.slice(0, cursorPos);
    const textAfterCursor = rawQuery.slice(cursorPos);
    const words = textBeforeCursor.split(/\s+/);
    const lastWord = words[words.length - 1];
    const newText = textBeforeCursor.slice(0, -lastWord.length) + suggestion + textAfterCursor;
    setRawQuery(newText);
    setShowSuggestions(false);

    // Calculate new cursor position 
    const newCursorPos = cursorPos - lastWord.length + suggestion.length;
        
    textareaRef.current?.focus();
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.selectionStart = newCursorPos;
        textareaRef.current.selectionEnd = newCursorPos;
      }
    }, 0);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (showSuggestions) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % suggestions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
      } else if (e.key === 'Enter' && suggestions.length > 0) {
        e.preventDefault();
        handleSuggestionClick(suggestions[selectedIndex]);
      } else if (e.key === 'Escape') {
        setShowSuggestions(false);
      }
    }
  };

  return (
    <div className="relative !h-full">
      <Textarea
        ref={textareaRef}
        value={rawQuery}
        spellCheck={false}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        className="w-full !h-full text-xs lg:!text-[0.8rem] 2xl:!text-sm resize-none p-2 border-0 !bg-background rounded-none shadow-none focus:!outline-none focus:!ring-0 !leading-relaxed"
        placeholder="Enter your SQL query here..."
      />
      <Popover open={showSuggestions} onOpenChange={setShowSuggestions}>
        <PopoverTrigger asChild>
          <div
            style={{
              position: 'absolute',
              top: `${cursorPosition.y}px`,
              left: `${cursorPosition.x}px`,
              width: '1px',
              height: '1px',
            }}
          />
        </PopoverTrigger>
        <PopoverContent 
          className="w-48 p-0  !rounded-none !shadow-none" 
          align="start"
          sideOffset={5}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="max-h-56 2xl:max-h-[300px] 3xl:max-h-[350px] overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`px-4 py-2 hover:bg-accent cursor-pointer text-[0.7rem] sm:text-xs 2xl:text-[0.8rem] ${
                  index === selectedIndex ? 'bg-accent' : ''
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}