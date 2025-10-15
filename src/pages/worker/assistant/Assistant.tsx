import { assistantVisibleToggled } from '@/store/editorSlice'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from "@/store";
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';


const Assistant = () => {
  const dispatch = useDispatch()


  return (
    <div className='flex flex-col'>
      <div className="flex justify-between border-b-[1px] border-b-[#eee] h-[40px] items-center px-2">
        <span className='text-gray-800 font-bold dark:text-gray-300'>AI写作/聊天</span>
        <Button variant='ghost' className='p-0 w-5 h-5' onClick={() => dispatch(assistantVisibleToggled(false))}>
          <X />
        </Button>
      </div>
    </div>
  )
}

export default Assistant