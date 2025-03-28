import React, { useState } from 'react'
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpandButton } from "@/components/ui/expand-button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { tableData } from '@/data/tables';

const TableList = () => {
    const [expandedTable, setExpandedTable] = useState<string | null>(null);

    return Object.entries(tableData).map(([tableName, data]) => {
        const columns = data.length > 0 ? Object.keys(data[0]) : [];
        const isExpanded = expandedTable === tableName;
        
        return (
          <Card key={tableName} className={`p-4  border-1 gap-2 !shadow-none ${isExpanded ? 'fixed inset-4 z-50 bg-card' : ''}`}>
            <CardHeader className="flex flex-row items-center justify-between px-2">
              <CardTitle>{tableName}</CardTitle>
              <ExpandButton 
                isExpanded={isExpanded} 
                onClick={() => setExpandedTable(isExpanded ? null : tableName)} 
              />
            </CardHeader>
            
            <ScrollArea className={isExpanded ? 'h-[80vh]' : 'h-48'}>
              <ScrollArea className="w-full" >
                <div className="text-xs">
                  <Table>
                    <TableHeader>
                    <TableRow>
                      {columns.map((column) => {
                        const isPrimaryKey = column.toLowerCase().includes('id') && column.length === 2;
                        const isForeignKey = column.toLowerCase().includes('id') && column.length > 2;
                        return (
                          <TableHead key={column} className="whitespace-nowrap">
                            {isPrimaryKey && '🔑 '}
                            {isForeignKey && '🔗 '}
                            {column}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((row, index) => (
                      <TableRow key={index}>
                        {columns.map((column) => (
                          <TableCell key={column}>
                            {row[column] === null ? 'NULL' : String(row[column])}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

            </ScrollArea>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </Card>
        );
      });
}

export default TableList