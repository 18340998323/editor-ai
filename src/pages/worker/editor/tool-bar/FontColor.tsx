import { Button } from "@/components/ui/button";
import ColorPicker from "@/components/ui/ColorPicker";
import { useState } from "react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

import { Editor } from "@tiptap/react";
import type { EditorState } from "../EditorTool";
import FontColorIcon from "@/assets/icon/FontColorIcon";

const FontColor = ({ editor, editorState }: { editor?: Editor, editorState?: EditorState }) => {
  const [color] = useState("#262626");

  const onChangeColor = (color: string) => {
    editor?.chain().focus().setColor(color).run();
  };

  return (
    <div className="flex items-center">
      <Tooltip>
        <ColorPicker
          onChange={onChangeColor}
          defaultColor={editorState?.color ?? color}
          hasGradient={true}
        >
          <TooltipTrigger asChild>
            <div className="flex items-center">
              <Button
                variant="ghost"
                className="px-1 h-6"
                onClick={(e) => {
                  e.stopPropagation();
                  editor?.chain().focus().setColor(color).run();
                }}
              >
                <FontColorIcon color={editorState?.color ?? color} />
              </Button>
              <Button
                variant="ghost"
                className="px-0 h-6"
              >
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
          <p>字体颜色</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default FontColor;
