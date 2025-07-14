import { tableData, TableName } from '@/data/schema';
import { useRef, useEffect } from 'react';
import { useSqlStore } from '@/store/sqlStore';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { useTheme } from 'next-themes';

export function SqlEditorMonaco() {
  const { rawQuery, setRawQuery } = useSqlStore();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const { theme } = useTheme();


  // Update editor theme when theme changes
  useEffect(() => {
    if (editorRef.current) {
      const monacoTheme = theme === 'dark' ? 'vs-dark' : 'vs';
      editorRef.current.updateOptions({
        theme: monacoTheme
      });
    }
  }, [theme]);

  const getAllSuggestions = () => {
    const tables = Object.keys(tableData) as TableName[];
    const columns = tables.flatMap(table => {
      const firstRow = tableData[table][0];
      return firstRow ? Object.keys(firstRow).map(col => `${table}.${col}`) : [];
    });
    return [...tables, ...columns];
  };

  // Track if setup has been done
  const setupDone = useRef(false);

  const setupMonaco = (monaco: typeof import('monaco-editor')) => {
    // Only setup once
    if (setupDone.current) {
      return;
    }
    setupDone.current = true;

    // Configure SQL language
    monaco.languages.register({ id: 'sql' });
    
    // Set up SQL syntax highlighting
    monaco.languages.setMonarchTokensProvider('sql', {
      keywords: [
        'SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'DROP', 'TABLE',
        'ALTER', 'ADD', 'COLUMN', 'INDEX', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES',
        'UNIQUE', 'NOT', 'NULL', 'DEFAULT', 'AUTO_INCREMENT', 'AS', 'DISTINCT',
        'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT', 'OFFSET', 'JOIN', 'LEFT', 'RIGHT',
        'INNER', 'OUTER', 'ON', 'UNION', 'ALL', 'EXISTS', 'IN', 'BETWEEN', 'LIKE',
        'IS', 'AND', 'OR', 'XOR', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'IF',
        'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'DISTINCT', 'TOP', 'BOTTOM',
        'ASC', 'DESC', 'ASCENDING', 'DESCENDING', 'TRUE', 'FALSE', 'UNKNOWN'
      ],
      
      operators: [
        '=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=',
        '<>', '**', '||', '&&', '--', '++', '**=', '+=', '-=', '*=',
        '/=', '%=', '&=', '|=', '^=', '<<=', '>>=', '>>>='
      ],

      symbols: /[=><!~?:&|+\-*\/\^%]+/,

      tokenizer: {
        root: [
          { include: '@comments' },
          { include: '@whitespace' },
          { include: '@pseudoColumns' },
          { include: '@numbers' },
          { include: '@strings' },
          { include: '@complexIdentifiers' },
          { include: '@scopes' },
          [/[;,.]/, 'delimiter'],
          [/[()]/, '@brackets'],
          [/[\w@]+/, {
            cases: {
              '@keywords': 'keyword',
              '@operators': 'operator',
              '@default': 'identifier'
            }
          }],
          [/[<>=!%&+\-*/|~^]/, 'operator']
        ],
        whitespace: [
          [/\s+/, 'white']
        ],
        comments: [
          [/--+.*/, 'comment'],
          [/\/\*/, { token: 'comment.quote', next: '@comment' }]
        ],
        comment: [
          [/[^*/]+/, 'comment'],
          [/\*\//, { token: 'comment.quote', next: '@pop' }],
          [/./, 'comment']
        ],
        pseudoColumns: [
          [/[$][A-Za-z_][\w]*/, 'predefined']
        ],
        numbers: [
          [/0[xX][0-9a-fA-F]*/, 'number'],
          [/[$][+-]*\d*(\.\d*)?/, 'number'],
          [/((\d+(\.\d*)?)|(\.\d+))([eE][\-+]?\d+)?/, 'number']
        ],
        strings: [
          [/N'/, { token: 'string', next: '@string' }],
          [/'/, { token: 'string', next: '@string' }],
          [/"/, { token: 'string.double', next: '@stringDouble' }]
        ],
        string: [
          [/[^']+/, 'string'],
          [/''/, 'string'],
          [/'/, { token: 'string', next: '@pop' }]
        ],
        stringDouble: [
          [/[^"]+/, 'string.double'],
          [/""/, 'string.double'],
          [/"/, { token: 'string.double', next: '@pop' }]
        ],
        complexIdentifiers: [
          [/\[/, { token: 'identifier.quote', next: '@bracketedIdentifier' }],
          [/`/, { token: 'identifier.quote', next: '@quotedIdentifier' }]
        ],
        bracketedIdentifier: [
          [/[^\]]+/, 'identifier'],
          [/]]/, 'identifier'],
          [/]/, { token: 'identifier.quote', next: '@pop' }]
        ],
        quotedIdentifier: [
          [/[^`]+/, 'identifier'],
          [/``/, 'identifier'],
          [/`/, { token: 'identifier.quote', next: '@pop' }]
        ],
        scopes: [
          [/BEGIN\s+(DISTRIBUTED\s+)?TRAN(SACTION)?\b/i, 'keyword'],
          [/BEGIN\s+TRY\b/i, 'keyword'],
          [/BEGIN\s+CATCH\b/i, 'keyword'],
          [/END\s+(DISTRIBUTED\s+)?TRAN(SACTION)?\b/i, 'keyword'],
          [/END\s+TRY\b/i, 'keyword'],
          [/END\s+CATCH\b/i, 'keyword'],
          [/CAST\b/i, 'keyword'],
          [/CONVERT\b/i, 'keyword'],
          [/EXEC\b/i, 'keyword'],
          [/EXECUTE\b/i, 'keyword'],
          [/GO\b/i, 'keyword'],
          [/PRINT\b/i, 'keyword'],
          [/RAISERROR\b/i, 'keyword'],
          [/SET\b/i, 'keyword'],
          [/USE\b/i, 'keyword']
        ]
      }
    });

    // Set up autocomplete
    const allSuggestions = getAllSuggestions();
    const completionItems = allSuggestions.map(suggestion => ({
      label: suggestion,
      kind: monaco.languages.CompletionItemKind.Field,
      insertText: suggestion,
      detail: suggestion.includes('.') ? 'Column' : 'Table'
    }));

    // Add SQL keywords to autocomplete
    const sqlKeywords = [
      'SELECT', 'FROM', 'WHERE', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'DROP', 'TABLE',
      'ALTER', 'ADD', 'COLUMN', 'INDEX', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES',
      'UNIQUE', 'NOT', 'NULL', 'DEFAULT', 'AUTO_INCREMENT', 'AS', 'DISTINCT',
      'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT', 'OFFSET', 'JOIN', 'LEFT', 'RIGHT',
      'INNER', 'OUTER', 'ON', 'UNION', 'ALL', 'EXISTS', 'IN', 'BETWEEN', 'LIKE',
      'IS', 'AND', 'OR', 'XOR', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'IF',
      'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'DISTINCT', 'TOP', 'BOTTOM',
      'ASC', 'DESC', 'ASCENDING', 'DESCENDING', 'TRUE', 'FALSE', 'UNKNOWN'
    ];

    sqlKeywords.forEach(keyword => {
      completionItems.push({
        label: keyword,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: keyword,
        detail: 'SQL Keyword'
      });
    });

    // Register completion provider
    monaco.languages.registerCompletionItemProvider('sql', {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        const suggestionsWithRange = completionItems.map(item => ({
          ...item,
          range
        }));

        return {
          suggestions: suggestionsWithRange
        };
      }
    });
  };

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor, monaco: typeof import('monaco-editor')) => {
    editorRef.current = editor;
    setupMonaco(monaco);

    // Set editor options
    const monacoTheme = theme === 'dark' ? 'vs-dark' : 'vs';
    editor.updateOptions({
      fontSize: 14,
      fontFamily: 'Consolas, "Courier New", monospace',
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      wordWrap: 'on',
      lineNumbers: 'on',
      folding: true,
      lineDecorationsWidth: 3,
      lineNumbersMinChars: 2,
      renderLineHighlight: 'all',
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: 'line',
      theme: monacoTheme
    });

    // Handle value changes
    editor.onDidChangeModelContent(() => {
      const value = editor.getValue();
      setRawQuery(value);
    });
  };

  return (
    <div className="w-full h-full">
      <Editor
        height="100%"
        defaultLanguage="sql"
        value={rawQuery}
        onMount={handleEditorDidMount}
        options={{
          fontSize: 14,
          fontFamily: 'Consolas, "Courier New", monospace',
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: 'on',
          lineNumbers: 'on',
          folding: true,
          lineDecorationsWidth: 3,
          lineNumbersMinChars: 2,
          renderLineHighlight: 'all',
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false,
          cursorStyle: 'line',
          theme: theme === 'dark' ? 'vs-dark' : 'vs'
        }}
      />
    </div>
  );
} 