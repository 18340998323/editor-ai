import { Skeleton } from './skeleton'


const Loading = () => {
  return (
    <div className="loading flex flex-col gap-2">
      <Skeleton className="h-4 w-full bg-gray-200 dark:bg-[#333]" />
      <Skeleton className="h-4 w-full bg-gray-200 dark:bg-[#333]" />
      <Skeleton className="h-4 w-full bg-gray-200 dark:bg-[#333]" />
      <Skeleton className="h-4 w-full bg-gray-200 dark:bg-[#333]" />
    </div>
  );
}

export default Loading