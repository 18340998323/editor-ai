import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Minus } from "lucide-react";
import type { FC } from "react";
import type { ToolBarCompProps } from ".";

const TextSeparate:FC<ToolBarCompProps> = ({ editorState, editor }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" className="p-0 h-6 w-6" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus style={{ width: "16px", height: "16px" }} />
        </Button>
      </TooltipTrigger>
      <TooltipContent align="center" side="bottom">
        分割线
      </TooltipContent>
    </Tooltip>
  );
};

export default TextSeparate;
