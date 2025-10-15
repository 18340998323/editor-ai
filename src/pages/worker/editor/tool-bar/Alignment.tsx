import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { TextAlignCenter, TextAlignEnd, TextAlignStart } from "lucide-react";
import { useEffect, useState, type FC } from "react";
import type { ToolBarCompProps } from ".";
import { Toggle } from "@/components/ui/toggle";

const Alignment: FC<ToolBarCompProps> = ({ editorState, editor }) => {
  const [alginTypes, setAlginTypes] = useState([
    {
      name: "左对齐",
      value: "left",
      icon: <TextAlignStart style={{ width: "16px" }} />,
      active: true,
    },
    {
      name: "居中对齐",
      icon: <TextAlignCenter style={{ width: "16px" }} />,
      value: "center",
    },
    {
      name: "右对齐",
      icon: <TextAlignEnd style={{ width: "16px" }} />,
      value: "right",
    },
  ]);

  useEffect(() => {
    setAlginTypes((prev) => prev.map((item) => ({ ...item, active: false })));
    const dirObj = {
      left: editorState.isAlginLeft,
      center: editorState.isAlginCenter,
      right: editorState.isAlginRight,
    };
    const dir = editorState.isAlginLeft
      ? "left"
      : editorState.isAlginCenter
      ? "right"
      : editorState.isAlginRight
      ? "right"
      : null;
    setAlginTypes((prev) => {
      return prev.map((item) => {
        if (item.value === dir) {
          item.active = dirObj[dir];
        }
        return item;
      });
    });
  }, [editorState]);
  const onChangeTextAlgin = (dir: string) => {
    editor.chain().focus().setTextAlign(dir).run();
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="p-2 h-6">
          <TextAlignStart style={{ width: "16px" }} />
          <img
            src="https://gw.alipayobjects.com/zos/bmw-prod/d5fce5b0-cd60-43b0-a351-9463486be4d2.svg"
            alt=""
            style={{ height: "16px" }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="px-2 py-1 flex"
        align="start"
        style={{ width: "fit-content", gap: "4px" }}
      >
        {alginTypes.map((item) => (
          <Tooltip key={item.name}>
            <TooltipTrigger asChild>
              <Toggle asChild pressed={item.active}>
                <Button
                  variant="ghost"
                  className="px-2 py-1 h-6"
                  onClick={() => onChangeTextAlgin(item.value)}
                >
                  {item.icon}
                </Button>
              </Toggle>
            </TooltipTrigger>
            <TooltipContent side="bottom">{item.name}</TooltipContent>
          </Tooltip>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default Alignment;
