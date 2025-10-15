import type { BubbleMenuProps } from "@tiptap/react/menus";
import type { FC } from "react";
import DragHandle from "@tiptap/extension-drag-handle-react";
import { GripVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const DragMenu: FC<BubbleMenuProps> = ({ editor }) => {
  const onInsertParagraph = () => {
    editor
      ?.chain()
      .focus()
      .insertContent(
        {
          type: "paragraph",
        },
        {
          updateSelection: true,
          parseOptions: {
            preserveWhitespace: "full",
          },
        }
      )
      .focus()
      .run();
  };
  return (
    <DragHandle editor={editor!}>
      <div className="flex gap-1 pr-2">
        <Button
          variant="ghost"
          className="px-1 py-2 h-5"
          onClick={onInsertParagraph}
        >
          <Plus style={{ width: "15px" }} />
        </Button>
        <Button variant="ghost" className="px-1 py-2 h-5 cursor-grab">
          <GripVertical style={{ width: "15px" }} />
        </Button>
      </div>
    </DragHandle>
  );
};

export default DragMenu;
