import { Button } from "@/components/ui/button";
import { BubbleMenu } from "@tiptap/react/menus";
import type { FC } from "react";
import type { BubbleMenuProps } from ".";
import { Bot, MessageCircleMore } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ChatBubble: FC<BubbleMenuProps> = ({ editor }) => {
  const onCreateComment = () => {
    editor.chain().focus().setNode('paragraph', { 'comment-id': 1 })
  }
  return (
    <BubbleMenu
      editor={editor}
      options={{ placement: "top", offset: 8, flip: true }}
    >
      <div className="bg-white border-[1px] border-[#eee] p-1 rounded-md flex items-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => {}}
              variant="ghost"
              className="px-1 py-2 h-5"
            >
              <Bot style={{ width: "18px", color: 'rgb(56, 128, 227)' }} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>AI助手</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => onCreateComment()}
              variant="ghost"
              className="px-1 py-2 h-5"
            >
              <MessageCircleMore style={{ width: "18px" }} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>划词评论</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </BubbleMenu>
  );
};

export default ChatBubble;
