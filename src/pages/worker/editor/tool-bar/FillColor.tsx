import { Button } from "@/components/ui/button";
import ColorPicker from "@/components/ui/ColorPicker";
import { Brush } from "lucide-react";
import { useState } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import type { Editor } from "@tiptap/react";
import type { EditorState } from "../EditorTool";

const FillColor = ({
  editor,
  editorState,
}: {
  editor?: Editor;
  editorState?: EditorState;
}) => {
  const [color] = useState("#262626");

  const onChangeColor = (color: string) => {
    editor?.chain().focus().setBackgroundColor(color).run();
  };

  return (
    <div className="flex items-center">
      <Tooltip>
        <ColorPicker
          onChange={onChangeColor}
          defaultColor={editorState?.backgroundColor ?? color}
        >
          <TooltipTrigger asChild>
            <div className="flex items-center">
              <Button
                variant="ghost"
                className="px-1 h-6"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Brush style={{ height: "16px" }} />
              </Button>
              <Button variant="ghost" className="px-0 h-6">
                <img
                  src="https://gw.alipayobjects.com/zos/bmw-prod/d5fce5b0-cd60-43b0-a351-9463486be4d2.svg"
                  alt=""
                  style={{ height: "16px" }}
                />
              </Button>
            </div>
          </TooltipTrigger>
        </ColorPicker>
        <TooltipContent side="bottom">
          <p>填充颜色</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default FillColor;
