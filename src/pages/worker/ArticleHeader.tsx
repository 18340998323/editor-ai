import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Toggle } from "@/components/ui/toggle";
import { Bot, HeartPlus, Share, SquareArrowOutUpRight } from "lucide-react";
import { assistantVisibleToggled } from '@/store/editorSlice'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from "@/store";


const EditorHeader = () => {
  const dispatch = useDispatch()
  const editorState = useSelector((state: RootState) => state.editor)
  const articleState = useSelector((state: RootState) => state.article)

  return (
    <div className=" flex justify-between w-full items-center h-full">
      <div className="flex items-center gap-2">
        <h1 className="logo flex items-center gap-2">
          <span className="font-bold text-xl"> Editor </span>
          <span className="text-background bg-foreground font-bold text-xl px-1 py-[1px]">
            AI
          </span>
        </h1>
        <Avatar className="w-[28px] h-[28px]">
          <AvatarImage src="https://avatars.githubusercontent.com/u/88611687?v=4" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div className="online-status">
          <div className="w-[8px] h-[8px] bg-green-500 rounded-full"></div>
        </div>
        <div className="text-number">
          <span className="text-sm text-gray-500 dark:text-gray-300">共{articleState.wordsCount}字</span>
        </div>
      </div>
      <div className="action flex items-center">
        <div className="btn-group flex gap-2 items-center">
          <Toggle
            aria-label="Toggle italic"
            className="cursor-pointer h-[38px] gap-1"
            onPressedChange={() => dispatch(assistantVisibleToggled(!editorState.assistantVisible))}
            pressed={editorState.assistantVisible}
          >
            <Bot />
            AI写作
          </Toggle>
          <Toggle
            aria-label="Toggle italic"
            className="cursor-pointer h-[38px] gap-1"
            onPressedChange={(pressed) => console.log(pressed)}
          >
            <HeartPlus />
            收藏
          </Toggle>
          <Toggle
            aria-label="Toggle italic"
            className="cursor-pointer h-[38px] gap-1"
            onPressedChange={(pressed) => console.log(pressed)}
          >
            <Share />
            分享
          </Toggle>
          <Toggle
            aria-label="Toggle italic"
            className="cursor-pointer h-[38px] gap-1"
            onPressedChange={(pressed) => console.log(pressed)}
          >
            <SquareArrowOutUpRight />
            发布
          </Toggle>
        </div>
        <ModeToggle />
      </div>
    </div>
  );
};

export default EditorHeader;
