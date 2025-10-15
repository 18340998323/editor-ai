import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import type { EditorState } from "../EditorTool";
import type { Editor } from "@tiptap/react";
import { useEffect, useState } from "react";

const FontSize = ({
  editorState,
  editor,
}: {
  editorState: EditorState;
  editor?: Editor;
}) => {

  const fontSizeMenu = [
    {
      label: '12px',
      value: '12px',
    },
    {
      label: '14px',
      value: '14px',
    },
    {
      label: '15px',
      value: '15px',
    },
    {
      label: '16px',
      value: '16px',
    },
    {
      label: '19px',
      value: '19px',
    },
    {
      label: '22px',
      value: '22px',
    },
    {
      label: '24px',
      value: '24px',
    },
    {
      label: '29px',
      value: '29px',
    },
    {
      label: '32px',
      value: '32px',
    },
    {
      label: '40px',
      value: '40px',
    },
    {
      label: '48px',
      value: '48px',
    },
  ]

  const [ currentFontSize, setCurrentFontSize ] = useState('12px');

  useEffect(() => {
    if (editor) {
      setCurrentFontSize(fontSizeMenu.find(item => editor.isActive('textStyle', { fontSize: item.value }))?.value || '12px');
    }
  }, [ editorState ]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="p-2 h-6">
          {currentFontSize}
          <img
            src="https://gw.alipayobjects.com/zos/bmw-prod/d5fce5b0-cd60-43b0-a351-9463486be4d2.svg"
            alt=""
            style={{ height: "16px" }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent style={{ minWidth: "100px" }} align="start">
        <DropdownMenuRadioGroup
          value={currentFontSize}
          onValueChange={(value) => {
            if (editor) {
              editor.chain().focus().setFontSize(value).run();
              setCurrentFontSize(value)
            }
          }}
        >
          {fontSizeMenu.map((item) => (
            <DropdownMenuRadioItem key={item.value} value={item.value}>
              <span>{item.label}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FontSize;
