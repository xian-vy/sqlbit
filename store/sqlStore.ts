import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SqlQueryResult } from '@/types/sql';


interface SqlState {
  rawQuery: string;
  queryResults: SqlQueryResult[] | null;
  queryError: string | null;
  queryHistory: string[];  
  setRawQuery: (query: string) => void;
  setQueryResults: (results: SqlQueryResult[] | null) => void;
  setQueryError: (error: string | null) => void;
  resetState: () => void;
  addToHistory: (query: string) => void;  
  removeFromHistory: (index: number) => void; 
}

const initialState = {
  rawQuery: '',
  queryResults: null,
  queryError: null,
  queryHistory: [], 
};

export const useSqlStore = create<SqlState>()(
  persist(
    (set) => ({
      ...initialState,
      
      setRawQuery: (rawQuery) => set({ rawQuery }),
      setQueryResults: (queryResults) => set({ queryResults }),
      setQueryError: (queryError) => set({ queryError }),
      
      addToHistory: (query) => set((state) => {
        // Don't add if the query already exists in history
        if (state.queryHistory.includes(query)) {
          return { queryHistory: state.queryHistory };
        }
        return {
          queryHistory: [query, ...state.queryHistory].slice(0, 15)
        };
      }),
      removeFromHistory: (index) => set((state) => ({
        queryHistory: state.queryHistory.filter((_, i) => i !== index)
      })),

      resetState: () => set(initialState),
    }),
    {
      name: 'sql-playground-storage',
    }
  )
);