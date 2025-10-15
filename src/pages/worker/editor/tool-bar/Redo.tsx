import { type FC } from "react";
import type { EditorState } from "../EditorTool";
import type { Editor } from "@tiptap/core";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Redo2 } from "lucide-react";

interface RedoProps {
  editorState: EditorState,
  editor: Editor
}

const Redo: FC<RedoProps> = ({ editorState, editor }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          className="p-0 h-6 w-6"
          disabled={!editorState.canRedo}
          onClick={() => editor.chain().redo().run()}
        >
          <Redo2 style={{ width: "16px", height: "16px" }} />
        </Button>
      </TooltipTrigger>
      <TooltipContent align="center" side="bottom">
        撤销
      </TooltipContent>
    </Tooltip>
  );
};

export default Redo;
