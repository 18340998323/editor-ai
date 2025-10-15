import { List, ListOrdered, ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { FC } from "react";
import type { ToolBarCompProps } from ".";

const ParagraphList: FC<ToolBarCompProps> = ({ editorState, editor }) => {
  return (
    <div className="flex gap-1">
      <Tooltip>
        <Toggle
          asChild
          pressed={editorState.isBulletList}
          onPressedChange={() => {
            editor.chain().focus().toggleBulletList().run();
          }}
        >
          <TooltipTrigger asChild>
            <Button variant="ghost" className="p-0 h-6 min-w-7">
              <List style={{ width: "16px", height: "16px" }} />
            </Button>
          </TooltipTrigger>
        </Toggle>
        <TooltipContent align="center" side="bottom">
          无序列表
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <Toggle
          asChild
          pressed={editorState.isOrderedList}
          onPressedChange={() => {
            editor.chain().focus().toggleOrderedList().run();
          }}
        >
          <TooltipTrigger asChild>
            <Button variant="ghost" className="p-0 h-6 min-w-7">
              <ListOrdered style={{ width: "16px", height: "16px" }} />
            </Button>
          </TooltipTrigger>
        </Toggle>
        <TooltipContent align="center" side="bottom">
          有序列表
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <Toggle
          asChild
          pressed={editorState.isTaskList}
          onPressedChange={() => {
            editor.chain().focus().toggleTaskList().run();
          }}
        >
          <TooltipTrigger asChild>
            <Button variant="ghost" className="p-0 h-6 min-w-7">
              <ListTodo style={{ width: "16px", height: "16px" }} />
            </Button>
          </TooltipTrigger>
        </Toggle>
        <TooltipContent align="center" side="bottom">
          任务列表
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default ParagraphList;
