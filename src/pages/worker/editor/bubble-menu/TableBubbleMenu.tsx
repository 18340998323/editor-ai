import { BubbleMenu } from "@tiptap/react/menus";
import type { FC } from "react";
import type { BubbleMenuProps } from ".";
import { findParentNode, posToDOMRect } from "@tiptap/core";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const TableBubbleMenu: FC<BubbleMenuProps> = ({ editor }) => {
  const onAction = (type: string) => {
    switch (type) {
      case "colBefore":
        editor.chain().focus().addColumnBefore().run();
        break;
      case "colAfter":
        editor.chain().focus().addColumnAfter().run();
        break;
      case "rowBefore":
        editor.chain().focus().addRowBefore().run();
        break;
      case "rowAfter":
        editor.chain().focus().addRowAfter().run();
        break;
      case "delCol":
        editor.chain().focus().deleteColumn().run();
        break;
      case "delRow":
        editor.chain().focus().deleteRow().run();
        break;
      case "mergeCell":
        editor.chain().focus().mergeCells().run();
        break;
      case "splitCell":
        editor.chain().focus().splitCell().run();
        break;
      case "headerCell":
        editor.chain().focus().toggleHeaderCell().run();
        break;
      default:
        editor.chain().focus().deleteTable().run();
        break;
    }
  };

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={() => editor.isActive("table")}
      options={{ placement: "top-start", offset: 2 }}
      getReferencedVirtualElement={() => {
        const parentNode = findParentNode((node) => node.type.name === "table")(
          editor.state.selection
        );
        if (parentNode) {
          const domRect = posToDOMRect(
            editor.view,
            parentNode.start,
            parentNode.start + parentNode.node.nodeSize
          );
          return {
            getBoundingClientRect: () => domRect,
            getClientRects: () => [domRect],
          };
        }
        return null;
      }}
    >
      <div className="command flex gap-1 p-1 py-1.5 rounded border h-40px items-center bg-[#fff] dark:bg-[#333]">
        <Button
          variant="ghost"
          className="p-0 h-5 px-2"
          onClick={() => onAction("rowBefore")}
        >
          行前插入
        </Button>
        <Button
          variant="ghost"
          className="p-0 h-5 px-2"
          onClick={() => onAction("rowAfter")}
        >
          行后插入
        </Button>
        <Button
          variant="destructive"
          className="p-0 h-5 px-2"
          onClick={() => onAction("delRow")}
        >
          删除行
        </Button>
        <Separator orientation="vertical" style={{ height: "20px" }} />
        <Button
          variant="ghost"
          className="p-0 h-5 px-2"
          onClick={() => onAction("colBefore")}
        >
          列前插入
        </Button>
        <Button
          variant="ghost"
          className="p-0 h-5 px-2"
          onClick={() => onAction("colAfter")}
        >
          列后插入
        </Button>
        <Button
          variant="destructive"
          className="p-0 h-5 px-2"
          onClick={() => onAction("delCol")}
        >
          删除列
        </Button>
        <Separator orientation="vertical" style={{ height: "20px" }} />
        <Button
          variant="ghost"
          className="p-0 h-5 px-2"
          onClick={() => onAction("mergeCell")}
        >
          合并单元格
        </Button>
        <Button
          variant="ghost"
          className="p-0 h-5 px-2"
          onClick={() => onAction("splitCell")}
        >
          拆分单元格
        </Button>
        <Separator orientation="vertical" style={{ height: "20px" }} />
        <Button
          variant="ghost"
          className="p-0 h-5 px-2"
          onClick={() => onAction("headerCell")}
        >
          设置/取消表头
        </Button>
        <Button
          variant="destructive"
          className="p-0 h-5 px-2"
          onClick={() => onAction("delTable")}
        >
          删除表格
        </Button>
      </div>
    </BubbleMenu>
  );
};

export default TableBubbleMenu;
