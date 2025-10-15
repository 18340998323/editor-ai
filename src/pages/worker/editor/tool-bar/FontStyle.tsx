import {
  Bold,
  CodeXml,
  Italic,
  RemoveFormatting,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { EditorState } from "../EditorTool";
import type { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

const FontStyle = ({
  editor,
  editorState,
}: {
  editor: Editor;
  editorState?: EditorState;
}) => {
  const [extendStatus, setExtendStatus] = useState("");

  useEffect(() => {
    if (editor.isActive("superscript")) {
      setExtendStatus("superscript");
    } else if (editor.isActive("subscript")) {
      setExtendStatus("subScript");
    } else if (editor.isActive("codeBlock")) {
      setExtendStatus("codeBlock");
    }
  }, [editorState]);

  const onSetMarks = (value: string) => {
    if (value === extendStatus) {
      setExtendStatus("");
      value = "";
    } else {
      setExtendStatus(value);
    }
    switch (value) {
      case "subscript":
        if (editor.isActive("superscript") || editor.isActive("code")) {
          editor.chain().focus().unsetSuperscript().run();
          editor.chain().focus().unsetCode().run();
        }
        editor.chain().focus().toggleSubscript().run();
        break;
      case "superscript":
        if (editor.isActive("subscript") || editor.isActive("code")) {
          console.log(11111);
          editor.chain().focus().unsetSubscript().run();
          editor.chain().focus().unsetCode().run();
        }
        editor.chain().focus().toggleSuperscript().run();
        break;
      case "code":
        if (editor.isActive("subscript") || editor.isActive("superscript")) {
          editor.chain().focus().unsetSubscript().run();
          editor.chain().focus().unsetSuperscript().run();
        }
        editor.chain().focus().toggleCode().run();
        break;
      default:
        editor.chain().focus().unsetSubscript().run();
        editor.chain().focus().unsetSuperscript().run();
        editor.chain().focus().unsetCode().run();
        break;
    }
  };
  return (
    <div className="flex gap-1">
      <Tooltip>
        <Toggle
          asChild
          disabled={!editorState?.canBold}
          pressed={editorState?.isBold}
          onPressedChange={() => {
            editor.chain().focus().toggleBold().run();
          }}
        >
          <TooltipTrigger asChild>
            <Button variant="ghost" className="p-0 h-6 min-w-7">
              <Bold style={{ width: "16px", height: "16px" }} />
              {editorState?.isBold}
            </Button>
          </TooltipTrigger>
        </Toggle>
        <TooltipContent align="center" side="bottom">
          加粗
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <Toggle
          asChild
          disabled={!editorState?.canItalic}
          pressed={editorState?.isItalic}
          onPressedChange={() => {
            editor.chain().focus().toggleItalic().run();
          }}
        >
          <TooltipTrigger asChild>
            <Button variant="ghost" className="p-0 h-6 min-w-7">
              <Italic style={{ width: "16px", height: "16px" }} />
            </Button>
          </TooltipTrigger>
        </Toggle>
        <TooltipContent align="center" side="bottom">
          斜体
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <Toggle
          asChild
          disabled={!editorState?.canStrike}
          pressed={editorState?.isStrike}
          onPressedChange={() => {
            editor.chain().focus().toggleStrike().run();
          }}
        >
          <TooltipTrigger asChild>
            <Button variant="ghost" className="p-0 h-6 min-w-7">
              <Strikethrough style={{ width: "16px", height: "16px" }} />
            </Button>
          </TooltipTrigger>
        </Toggle>
        <TooltipContent align="center" side="bottom">
          删除线
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <Toggle
          asChild
          disabled={!editorState?.canUnderline}
          pressed={editorState?.isUnderline}
          onPressedChange={() => {
            editor.chain().focus().toggleUnderline().run();
          }}
        >
          <TooltipTrigger asChild>
            <Button variant="ghost" className="p-0 h-6 min-w-7">
              <Underline style={{ width: "16px", height: "16px" }} />
            </Button>
          </TooltipTrigger>
        </Toggle>
        <TooltipContent align="center" side="bottom">
          下划线
        </TooltipContent>
      </Tooltip>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="p-2 h-6">
            <RemoveFormatting style={{ width: "16px", height: "16px" }} />
            <img
              src="https://gw.alipayobjects.com/zos/bmw-prod/d5fce5b0-cd60-43b0-a351-9463486be4d2.svg"
              alt=""
              style={{ height: "16px" }}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent style={{ minWidth: "100px" }} align="start">
          <DropdownMenuRadioGroup
            value={extendStatus}
            onValueChange={(value) => onSetMarks(value)}
          >
            <DropdownMenuRadioItem value="superscript">
              <Superscript style={{ width: "16px", height: "16px" }} />
              <span>上标</span>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="subscript">
              <Subscript style={{ width: "16px", height: "16px" }} />
              <span>下标</span>
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="code">
              <CodeXml style={{ width: "16px", height: "16px" }} />
              <span>行内代码</span>
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FontStyle;
