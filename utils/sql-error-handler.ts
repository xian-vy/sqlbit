type SqlErrorType = {
  code: string;
  message: string;
  pattern: RegExp;
};

const SQL_ERRORS: SqlErrorType[] = [
  {
    code: 'SYNTAX_ERROR',
    message: 'Syntax error in SQL statement',
    pattern: /Parse error|Syntax error/i
  },
  {
    code: 'MISSING_FROM',
    message: 'FROM clause is missing or invalid',
    pattern: /From clause not found/i
  },
  {
    code: 'INVALID_JOIN',
    message: 'Invalid JOIN syntax. Table or join condition is missing',
    pattern: /join.*?(?:invalid|missing|error)/i
  },
  {
    code: 'TABLE_NOT_FOUND',
    message: 'Referenced table does not exist',
    pattern: /Table.*?not found|Table.*?does not exist/i
  },
  {
    code: 'COLUMN_NOT_FOUND',
    message: 'One or more referenced columns do not exist',
    pattern: /Column.*?not found|Column.*?does not exist/i
  },
  {
    code: 'AMBIGUOUS_COLUMN',
    message: 'Column reference is ambiguous. Please specify the table name',
    pattern: /ambiguous.*?column|column.*?ambiguous/i
  },
  {
    code: 'GROUP_BY_ERROR',
    message: 'Invalid GROUP BY clause or non-aggregated columns in SELECT',
    pattern: /group by|not included in.*?aggregate/i
  },
  {
    code: 'ORDER_BY_ERROR',
    message: 'Invalid ORDER BY clause',
    pattern: /order by.*?invalid|invalid.*?order by/i
  },
  {
    code: 'DATA_TYPE_MISMATCH',
    message: 'Data type mismatch in operation or comparison',
    pattern: /type.*?mismatch|invalid.*?type|cannot.*?convert/i
  }
];

export function handleSqlError(error: Error): string {
  const errorMessage = error.message.toLowerCase();
  
  // Find the first matching error pattern
  const matchedError = SQL_ERRORS.find(err => 
    err.pattern.test(errorMessage)
  );

  if (matchedError) {
    return matchedError.message;
  }

  // Extract specific table or column names if present
  const tableMatch = errorMessage.match(/table ['"]?(\w+)['"]?/i);
  const columnMatch = errorMessage.match(/column ['"]?(\w+)['"]?/i);

  if (tableMatch) {
    return `Error with table '${tableMatch[1]}'. Please check if it exists and is properly referenced.`;
  }

  if (columnMatch) {
    return `Error with column '${columnMatch[1]}'. Please check if it exists and is properly referenced.`;
  }

  // Default error message
  return 'An error occurred while executing the SQL query. Please check your syntax and try again.';
}