import type { FC } from "react"
import type { ToolBarCompProps } from ".";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon } from "lucide-react";

const Image:FC<ToolBarCompProps> = ({ editorState, editor }) => {
  const onInsertImage = () => {
    editor.chain().focus().insertUploadImage().run()
  }
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" className="p-0 h-6 w-6" onClick={onInsertImage}>
          <ImageIcon style={{ width: "16px", height: "16px" }} />
        </Button>
      </TooltipTrigger>
      <TooltipContent align="center" side="bottom">
        插入图片
      </TooltipContent>
    </Tooltip>
  )
}

export default Image