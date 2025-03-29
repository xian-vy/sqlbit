import React, { useState } from 'react'
import { Card,  CardHeader, CardTitle } from "@/components/ui/card";
import { ExpandButton } from "@/components/ui/expand-button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { tableData } from '@/data/tables';
import { ChevronDown, ChevronUp, KeySquare, Link } from 'lucide-react';
import { Button } from '../ui/button';

const TableList = () => {
    const [expandedTable, setExpandedTable] = useState<string | null>(null);
    const [visibleTables, setVisibleTables] = useState<Set<string>>(() => new Set(Object.keys(tableData)));
    return Object.entries(tableData).map(([tableName, data]) => {
        type RowType = typeof data[0];
        const columns = data.length > 0 ? Object.keys(data[0]) : [];
        const isExpanded = expandedTable === tableName;
        const isVisible = visibleTables.has(tableName);
        
        return (
          <Card key={tableName} className={`py-2  gap-2 !shadow-none   rounded-none bg-transparent relative ${isExpanded ? 'fixed inset-4 z-50 bg-card' : ' border-0 border-b'}`}>
            <CardHeader className="flex flex-row items-center justify-between px-4">
              <CardTitle className='text-sm'>{tableName}</CardTitle>
              <div className="flex items-center gap-2">
                    {!isExpanded && 
                        <Button 
                            onClick={() => setVisibleTables(prev => {
                              const newSet = new Set(prev);
                              if (isVisible) {
                                newSet.delete(tableName);
                              } else {
                                newSet.add(tableName);
                              }
                              return newSet;
                            })}
                            variant="ghost"   
                            className="h-7 w-7 cursor-pointer bg-muted "
                          >
                            {isVisible ? <ChevronUp strokeWidth={1.5} className="!w-3.5 !h-3.5" /> : <ChevronDown strokeWidth={1.5} className="!w-3.5 !h-3.5" />}
                          </Button>
                      }
                      <ExpandButton 
                        isExpanded={isExpanded} 
                        onClick={() => setExpandedTable(isExpanded ? null : tableName)} 
                      />
              </div>
            </CardHeader>
            
            <ScrollArea className={`${isExpanded ? 'h-[80vh]' : isVisible ? 'h-auto' : 'h-12'}`}>
              <ScrollArea className="w-full">
                <div className="text-xs">
                  <Table>
                    <TableHeader>
                      <TableRow  className={`${isVisible ? "" :"!border-b-0"}`}>
                        {columns.map((column) => {
                          const isPrimaryKey = column.toLowerCase().includes('id') && column.length === 2;
                          const isForeignKey = column.toLowerCase().includes('id') && column.length > 2;
                          return (
                            <TableHead key={column} >
                             
                              <p className='flex items-center gap-1.5'>
                              {isPrimaryKey && <KeySquare strokeWidth={1} className="!text-black dark:!text-white w-3.5 h-3.5" />}
                              {isForeignKey && <Link strokeWidth={1} className="!text-black dark:!text-white w-3.5 h-3.5" />}
                              {column}

                              </p>
                            </TableHead>
                          );
                        })}
                      </TableRow>
                    </TableHeader>
                    {(isVisible || isExpanded) && (
                      <TableBody>
                        {data.map((row, index) => (
                          <TableRow key={index} className='border-0'>
                            {columns.map((column) => (
                              <TableCell key={column}>
                                {row[column as keyof RowType] === null ? 'NULL' : String(row[column as keyof RowType])}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    )}
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