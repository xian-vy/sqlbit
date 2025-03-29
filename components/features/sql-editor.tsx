import { tableData, TableName } from '@/data/tables';
import { useRef, useState } from 'react';
import { Textarea } from '../ui/textarea';

interface Props {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SqlEditor({ value, onChange, className }: Props) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 });
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
    onChange(newValue);

    const cursorPos = e.target.selectionStart;
    const textBeforeCursor = newValue.slice(0, cursorPos);
    const words = textBeforeCursor.split(/\s+/);
    const currentWord = words[words.length - 1].toLowerCase();

    if (currentWord.length > 0) {
      const allSuggestions = getAllSuggestions();
      const filtered = allSuggestions.filter(s => 
        s.toLowerCase().startsWith(currentWord)
      );
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);

      // Calculate position for suggestions
      const textArea = textareaRef.current;
      if (textArea) {
        const dummy = document.createElement('div');
        dummy.style.position = 'absolute';
        dummy.style.visibility = 'hidden';
        dummy.style.whiteSpace = 'pre-wrap';
        dummy.style.font = window.getComputedStyle(textArea).font;
        dummy.textContent = textBeforeCursor;
        document.body.appendChild(dummy);
        const rect = textArea.getBoundingClientRect();
        const pos = {
          top: rect.top + dummy.offsetHeight + window.scrollY,
          left: rect.left + dummy.offsetWidth + window.scrollX
        };
        document.body.removeChild(dummy);
        setCursorPosition(pos);
      }
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    const cursorPos = textareaRef.current?.selectionStart || 0;
    const textBeforeCursor = value.slice(0, cursorPos);
    const textAfterCursor = value.slice(cursorPos);
    const words = textBeforeCursor.split(/\s+/);
    const lastWord = words[words.length - 1];
    const newText = textBeforeCursor.slice(0, -lastWord.length) + suggestion + textAfterCursor;
    onChange(newText);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={handleInput}
        className={className}
        placeholder="Enter your SQL query here..."
      />
      {showSuggestions && (
        <div
          className="absolute z-10 bg-background border rounded-md shadow-lg max-h-48 overflow-y-auto"
          style={{ top: `${cursorPosition.top}px`, left: `${cursorPosition.left}px` }}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-accent cursor-pointer"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}