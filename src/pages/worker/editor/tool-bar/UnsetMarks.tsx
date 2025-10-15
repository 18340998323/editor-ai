import type { FC } from "react"
import type { ToolBarCompProps } from "."
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { BrushCleaning } from "lucide-react";

const UnsetMarks: FC<ToolBarCompProps> = ({ editorState, editor }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          className="p-0 h-6 w-6"
          disabled={!editorState.canUndo}
          onClick={() => editor.chain().unsetAllMarks().run()}
        >
          <BrushCleaning  style={{ width: "16px", height: "16px" }} />
        </Button>
      </TooltipTrigger>
      <TooltipContent align="center" side="bottom">
        清楚格式
      </TooltipContent>
    </Tooltip>
  )
}

export default UnsetMarks