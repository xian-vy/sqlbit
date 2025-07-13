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
        className="flex flex-col items-center w-[85px] sm:w-[90px] xl:w-[100px]  gap-0 text-[0.65rem] sm:text-[0.7rem] lg:text-xs !rounded-none border-r-0 border-b-0 !bg-background !font-normal text-[#FF8C00]" 
    >
        <span className="text-[#FF8C00] font-medium">Clear All</span>
        <span className="text-[0.55rem] text-[#aaa] hidden sm:block  ">ESC</span>
    </Button>
  )
}

export default ClearQuery