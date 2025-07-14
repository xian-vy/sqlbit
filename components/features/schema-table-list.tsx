import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { tableData } from '@/data/schema';
import { ChevronDown, ChevronUp, KeySquare, Link, Table2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

const SchemaTableList = () => {
    const [visibleTables, setVisibleTables] = useState<Set<string>>(() => new Set(Object.keys(tableData)));
    return Object.entries(tableData).map(([tableName, data]) => {
        type RowType = typeof data[0];
        const columns = data.length > 0 ? Object.keys(data[0]) : [];
        const isExpanded = visibleTables.has(tableName);
        
        return (
          <Card key={tableName} className={`pt-2 xl:pt-3 pb-0 relative justify-center h-full  !shadow-none  ${tableName === 'regions' ? 'border-b' : 'border-b-0'}  rounded-none bg-transparent }`}>
            <CardHeader className="flex flex-row items-center justify-start px-4">
              <CardTitle className='flex items-center gap-2'>
                  <Table2 strokeWidth={1.5} className="w-4 h-4"/>
                  <span className="text-[#FF8C00] text-xs lg:text-sm font-medium mb-0.5">{tableName}</span>
              </CardTitle>
            </CardHeader>
            <Button 
                    onClick={(e) => setVisibleTables(prev => {
                        e.stopPropagation();
                      const newSet = new Set(prev);
                      if (isExpanded) {
                        newSet.delete(tableName);
                      } else {
                        newSet.add(tableName);
                      }
                      return newSet;
                    })}
                    variant="ghost"   
                    className="absolute top-2 right-2 h-7 w-7 cursor-pointer border-0"
                  >
                    {isExpanded ? <ChevronUp strokeWidth={1.5} className="!w-3.5 !h-3.5 sm:!w-4 sm:!h-4 !text-foreground/60" /> : <ChevronDown strokeWidth={1.5} className="!text-foreground/60 !w-3.5 !h-3.5 sm:!w-4 sm:!h-4" />}
              </Button>
            
            <ScrollArea className={`h-full`}>
              <ScrollArea className="w-full h-auto">
                <div className="text-xs">
                  <Table>
                    {(isExpanded ) && (
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
                    )}
                    {(isExpanded) && (
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

export default SchemaTableList