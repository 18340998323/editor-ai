import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Quote } from "lucide-react";
import type { FC } from "react";
import type { ToolBarCompProps } from ".";
import { Toggle } from "@/components/ui/toggle";

const TextQuote: FC<ToolBarCompProps> = ({ editorState, editor }) => {
  return (
    <Tooltip>
      <Toggle pressed={editorState.isBlockquote} asChild>
        <TooltipTrigger asChild>
          <Button variant="ghost" className="p-0 h-6 w-6" onClick={() => editor.chain().focus().toggleBlockquote().run()}>
            <Quote style={{ width: "16px", height: "16px" }} />
          </Button>
        </TooltipTrigger>
      </Toggle>
      <TooltipContent align="center" side="bottom">
        引用
      </TooltipContent>
    </Tooltip>
  );
};

export default TextQuote;
