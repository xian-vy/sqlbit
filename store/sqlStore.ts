import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TableName } from '../data/tables';
import { SqlQueryResult } from '@/types/sql';

export type JoinType = 'INNER JOIN' | 'LEFT JOIN' | 'RIGHT JOIN' | 'FULL JOIN';

export interface JoinCondition {
  leftTable: TableName;
  leftColumn: string;
  rightTable: TableName;
  rightColumn: string;
  joinType: JoinType;
}

export interface AggregationOption {
  function: 'COUNT' | 'SUM' | 'AVG' | 'MIN' | 'MAX';
  column: string;
  alias: string;
}

export interface GroupByOption {
  column: string;
}

interface SqlState {
  selectedTables: TableName[];
  joinConditions: JoinCondition[];
  aggregations: AggregationOption[];
  groupBy: GroupByOption[];
  whereClause: string;
  rawQuery: string;
  queryResults: SqlQueryResult[] | null;
  queryError: string | null;
  
  // Actions
  setSelectedTables: (tables: TableName[]) => void;
  addSelectedTable: (table: TableName) => void;
  removeSelectedTable: (table: TableName) => void;
  setJoinConditions: (conditions: JoinCondition[]) => void;
  addJoinCondition: (condition: JoinCondition) => void;
  removeJoinCondition: (index: number) => void;
  setAggregations: (aggregations: AggregationOption[]) => void;
  addAggregation: (aggregation: AggregationOption) => void;
  removeAggregation: (index: number) => void;
  setGroupBy: (groupBy: GroupByOption[]) => void;
  addGroupBy: (groupBy: GroupByOption) => void;
  removeGroupBy: (index: number) => void;
  setWhereClause: (whereClause: string) => void;
  setRawQuery: (query: string) => void;
  setQueryResults: (results: SqlQueryResult[] | null) => void;
  setQueryError: (error: string | null) => void;
  resetState: () => void;
}

const initialState = {
  selectedTables: [],
  joinConditions: [],
  aggregations: [],
  groupBy: [],
  whereClause: '',
  rawQuery: '',
  queryResults: null,
  queryError: null,
};

export const useSqlStore = create<SqlState>()(
  persist(
    (set) => ({
      ...initialState,
      
      setSelectedTables: (tables) => set({ selectedTables: tables }),
      addSelectedTable: (table) => set((state) => ({
        selectedTables: [...state.selectedTables, table]
      })),
      removeSelectedTable: (table) => set((state) => ({
        selectedTables: state.selectedTables.filter(t => t !== table)
      })),
      
      setJoinConditions: (conditions) => set({ joinConditions: conditions }),
      addJoinCondition: (condition) => set((state) => ({
        joinConditions: [...state.joinConditions, condition]
      })),
      removeJoinCondition: (index) => set((state) => ({
        joinConditions: state.joinConditions.filter((_, i) => i !== index)
      })),
      
      setAggregations: (aggregations) => set({ aggregations }),
      addAggregation: (aggregation) => set((state) => ({
        aggregations: [...state.aggregations, aggregation]
      })),
      removeAggregation: (index) => set((state) => ({
        aggregations: state.aggregations.filter((_, i) => i !== index)
      })),
      
      setGroupBy: (groupBy) => set({ groupBy }),
      addGroupBy: (groupBy) => set((state) => ({
        groupBy: [...state.groupBy, groupBy]
      })),
      removeGroupBy: (index) => set((state) => ({
        groupBy: state.groupBy.filter((_, i) => i !== index)
      })),
      
      setWhereClause: (whereClause) => set({ whereClause }),
      setRawQuery: (rawQuery) => set({ rawQuery }),
      setQueryResults: (queryResults) => set({ queryResults }),
      setQueryError: (queryError) => set({ queryError }),
      
      resetState: () => set(initialState),
    }),
    {
      name: 'sql-playground-storage',
    }
  )
);