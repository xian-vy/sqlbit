import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { tableData } from '@/data/schema';
import { ChevronDown, ChevronUp, KeySquare, Link } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

const TableList = () => {
    const [expandedTable] = useState<string | null>(null);
    const [visibleTables, setVisibleTables] = useState<Set<string>>(() => new Set(Object.keys(tableData)));
    return Object.entries(tableData).map(([tableName, data]) => {
        type RowType = typeof data[0];
        const columns = data.length > 0 ? Object.keys(data[0]) : [];
        const isExpanded = expandedTable === tableName;
        const isVisible = visibleTables.has(tableName);
        
        return (
          <Card key={tableName} className={`py-2 relative  gap-2 !shadow-none   rounded-none bg-transparent border-0 border-b   ${isExpanded ? 'fixed inset-4 z-50 bg-card' : ' '}`}>
            <CardHeader className="flex flex-row items-center justify-start px-4">
              <CardTitle className='text-[0.7rem] sm:text-xs lg:text-[0.8rem] text-[#FF8C00]'>{tableName}</CardTitle>
            </CardHeader>
            <Button 
                    onClick={(e) => setVisibleTables(prev => {
                        e.stopPropagation();
                      const newSet = new Set(prev);
                      if (isVisible) {
                        newSet.delete(tableName);
                      } else {
                        newSet.add(tableName);
                      }
                      return newSet;
                    })}
                    variant="ghost"   
                    className="absolute top-0 right-0 h-7 w-7 cursor-pointer !rounded-none !bg-background border-0"
                  >
                    {isVisible ? <ChevronUp strokeWidth={1.5} className="!w-3.5 !h-3.5" /> : <ChevronDown strokeWidth={1.5} className="!w-3.5 !h-3.5" />}
              </Button>
            
            <ScrollArea className={`h-full`}>
              <ScrollArea className="w-full h-auto">
                <div className="text-xs">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {columns.map((column) => {
                          const isPrimaryKey = column.toLowerCase().includes('id') && column.length === 2;
                          const isForeignKey = column.toLowerCase().includes('id') && column.length > 2;
                          return (
                            <TableHead key={column} >
                             
                              <p className='flex items-center justify-center gap-1.5'>
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
                          <TableRow key={index}>
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