import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { type EditorState } from "@/pages/worker/editor/EditorTool";
import { useEffect, useState } from "react";
import type { Editor } from "@tiptap/react";

const TextAndTitle = ({
  editorState,
  editor,
}: {
  editorState?: EditorState;
  editor?: Editor;
}) => {
  const [currentHeading, setCurrentHeading] = useState(0);
  const headingList = [
    {
      id: "text",
      name: "正文",
      hotKeys: "⌥ ⌘ 0",
      fontSize: "16px",
      level: 0,
    },
    {
      id: "h1",
      name: "标题1",
      hotKeys: "⌥ ⌘ 1",
      fontSize: "28px",
      level: 1,
    },
    {
      id: "h2",
      name: "标题2",
      hotKeys: "⌥ ⌘ 2",
      fontSize: "24px",
      level: 2,
    },
    {
      id: "h3",
      name: "标题3",
      hotKeys: "⌥ ⌘ 3",
      fontSize: "20px",
      level: 3,
    },
    {
      id: "h4",
      name: "标题4",
      hotKeys: "⌥ ⌘ 4",
      fontSize: "16px",
      level: 4,
    },
    {
      id: "h5",
      name: "标题5",
      hotKeys: "⌥ ⌘ 5",
      fontSize: "14px",
      level: 5,
    },
    {
      id: "h6",
      name: "标题6",
      fontSize: "14px",
      hotKeys: "⌥ ⌘ 6",
      level: 6,
    },
  ];

  useEffect(() => {
    if (editorState) {
      if (editorState.isHeading1) {
        setCurrentHeading(1);
      } else if (editorState.isHeading2) {
        setCurrentHeading(2);
      } else if (editorState.isHeading3) {
        setCurrentHeading(3);
      } else if (editorState.isHeading4) {
        setCurrentHeading(4);
      } else if (editorState.isHeading5) {
        setCurrentHeading(5);
      } else if (editorState.isHeading6) {
        setCurrentHeading(6);
      } else if (editorState.isParagraph) {
        setCurrentHeading(0);
      }
    }
  }, [editorState]);

  return (
    <DropdownMenu>
      <Tooltip>
        <DropdownMenuTrigger asChild>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="p-2 h-6">
              {headingList.find((item) => item.level === currentHeading)?.name}
              <img
                src="https://gw.alipayobjects.com/zos/bmw-prod/d5fce5b0-cd60-43b0-a351-9463486be4d2.svg"
                alt=""
                style={{ height: "16px" }}
              />
            </Button>
          </TooltipTrigger>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="start">
          <DropdownMenuRadioGroup
            value={currentHeading.toString()}
            onValueChange={(value) => {
              if (Number(value)) {
                setCurrentHeading(Number(value));
                editor
                  ?.chain()
                  .focus()
                  .setHeading({ level: Number(value) as 1 | 2 | 3 | 4 | 5 | 6 })
                  .run();
              } else {
                editor?.chain().focus().setParagraph().run();
              }
            }}
          >
            {headingList.map((item) => (
              <DropdownMenuRadioItem
                key={item.id}
                value={item.level.toString()}
              >
                <div className="flex justify-between items-center flex-1">
                  <span className={`text-[${item.fontSize}] font-bold`}>
                    {item.name}
                  </span>
                  <span className="text-[13px] text-gray-400">
                    {item.hotKeys}
                  </span>
                </div>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
        <TooltipContent side="bottom">
          <p>正文和标题</p>
        </TooltipContent>
      </Tooltip>
    </DropdownMenu>
  );
};

export default TextAndTitle;
