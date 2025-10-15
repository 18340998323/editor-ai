import { type FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import type { ToolBarCompProps } from ".";

const Undo: FC<ToolBarCompProps> = ({ editorState, editor }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          className="p-0 h-6 w-6"
          disabled={!editorState.canUndo}
          onClick={() => editor.chain().undo().run()}
        >
          <Undo2 style={{ width: "16px", height: "16px" }} />
        </Button>
      </TooltipTrigger>
      <TooltipContent align="center" side="bottom">
        撤销
      </TooltipContent>
    </Tooltip>
  );
};

export default Undo;
