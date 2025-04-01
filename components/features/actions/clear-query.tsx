import { Button } from '@/components/ui/button';
import { useSqlStore } from '@/store/sqlStore';

const ClearQuery = () => {
    const { setQueryResults, setQueryError, setRawQuery } = useSqlStore()

    const handleClearQuery = () => {
        setRawQuery('');
        setQueryResults(null);
        setQueryError(null);
      };
      

  return (
    <Button
        variant="outline"
        size="sm"
        onClick={handleClearQuery}
        className="flex flex-col items-center gap-0 text-[0.7rem] sm:text-xs !rounded-none border-r-0 border-b-0 !bg-background !font-normal text-[#FF8C00]" 
    >
        Clear All
        <span className="text-[0.55rem] text-muted-foreground hidden sm:block  ">Esc</span>
    </Button>
  )
}

export default ClearQuery