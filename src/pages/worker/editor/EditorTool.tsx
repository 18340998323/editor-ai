import { type ReactNode } from "react";
import { Separator } from "@/components/ui/separator";
import { useEditorState, type Editor } from "@tiptap/react";
import {
  TextAndTitle,
  FontSize,
  FontStyle,
  FontColor,
  FillColor,
  Alignment,
  ParagraphList,
  TextLink,
  TextQuote,
  TextSeparate,
  Undo,
  Redo,
  UnsetMarks,
  // Table,
  Image,
  Plugins,
} from "./tool-bar";

export interface EditorState {
  isBold: boolean;
  canBold: boolean;
  isItalic: boolean;
  canItalic: boolean;
  isStrike: boolean;
  isAlginLeft: boolean;
  isAlginCenter: boolean;
  isAlginRight: boolean;
  canStrike: boolean;
  isUnderline: boolean;
  canUnderline: boolean;
  isCode: boolean;
  canCode: boolean;
  canClearMarks: boolean;
  isParagraph: boolean;
  isHeading1: boolean;
  isHeading2: boolean;
  isHeading3: boolean;
  isHeading4: boolean;
  isHeading5: boolean;
  isHeading6: boolean;
  isBulletList: boolean;
  isOrderedList: boolean;
  isTaskList: boolean;
  isCodeBlock: boolean;
  isBlockquote: boolean;
  canUndo: boolean;
  canRedo: boolean;
  color: string;
  backgroundColor: string;
}

const EditorTool = ({ editor }: { editor: Editor }) => {
  const editorState = useEditorState({
    editor,
    selector: (ctx): EditorState => {
      return {
        isBold: ctx.editor.isActive("bold") ?? false,
        canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor.isActive("italic") ?? false,
        canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor.isActive("strike") ?? false,
        isAlginLeft: ctx.editor.isActive({ textAlign: "left" }) ?? false,
        isAlginCenter: ctx.editor.isActive({ textAlign: "center" }) ?? false,
        isAlginRight: ctx.editor.isActive({ textAlign: "right" }) ?? false,
        canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
        isUnderline: ctx.editor.isActive("underline") ?? false,
        canUnderline: ctx.editor.can().chain().toggleUnderline().run() ?? false,
        isCode: ctx.editor.isActive("code") ?? false,
        canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor.isActive("paragraph") ?? false,
        isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor.isActive("heading", { level: 4 }) ?? false,
        isHeading5: ctx.editor.isActive("heading", { level: 5 }) ?? false,
        isHeading6: ctx.editor.isActive("heading", { level: 6 }) ?? false,
        isBulletList: ctx.editor.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor.isActive("orderedList") ?? false,
        isTaskList: ctx.editor.isActive("taskList") ?? false,
        isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor.isActive("blockquote") ?? false,
        canUndo: ctx.editor.can().chain().undo().run() ?? false,
        canRedo: ctx.editor.can().chain().redo().run() ?? false,
        color: ctx.editor.getAttributes("textStyle").color,
        backgroundColor: ctx.editor.getAttributes("textStyle").backgroundColor,
      };
    },
  });

  const tools = [
    {
      id: "expand",
      name: "拓展",
      rendered: (editorState: EditorState, editor: Editor): ReactNode => {
        return <Plugins editorState={editorState} editor={editor} />;
      },
    },
    {
      id: "separator",
      name: "分割线",
      rendered: (): ReactNode => {
        return (
          <Separator
            orientation="vertical"
            className="py-1"
            style={{ height: "70%" }}
          />
        );
      },
    },
    {
      id: "undo",
      name: "撤销",
      rendered: (editorState: EditorState, editor: Editor): ReactNode => {
        return <Undo editorState={editorState} editor={editor} />;
      },
    },
    {
      id: "redo",
      name: "恢复",
      rendered: (editorState: EditorState, editor: Editor): ReactNode => {
        return <Redo editorState={editorState} editor={editor} />;
      },
    },
    {
      id: "clear-format",
      name: "清除格式",
      rendered: (editorState: EditorState, editor: Editor): ReactNode => {
        return <UnsetMarks editorState={editorState} editor={editor} />;
      },
    },
    {
      id: "separator",
      name: "分割线",
      rendered: (): ReactNode => {
        return (
          <Separator
            orientation="vertical"
            className="py-1"
            style={{ height: "70%" }}
          />
        );
      },
    },
    {
      id: "text-title",
      name: "标题和文本",
      rendered: (editorState: EditorState, editor: Editor): ReactNode => {
        return <TextAndTitle editorState={editorState} editor={editor} />;
      },
    },
    {
      id: "font-size",
      name: "字体大小",
      rendered: (editorState: EditorState, editor: Editor): ReactNode => {
        return <FontSize editorState={editorState} editor={editor} />;
      },
    },
    {
      id: "separator",
      name: "分割线",
      rendered: (): ReactNode => {
        return (
          <Separator
            orientation="vertical"
            className="py-1"
            style={{ height: "70%" }}
          />
        );
      },
    },
    {
      id: "font-style",
      name: "字体样式",
      rendered: (editorState: EditorState): ReactNode => {
        return <FontStyle editorState={editorState} editor={editor} />;
      },
    },
    {
      id: "separator",
      name: "分割线",
      rendered: (): ReactNode => {
        return (
          <Separator
            orientation="vertical"
            className="py-1"
            style={{ height: "70%" }}
          />
        );
      },
    },
    {
      id: "font-color",
      name: "字体颜色",
      rendered: (editorState: EditorState, editor: Editor): ReactNode => {
        return <FontColor editorState={editorState} editor={editor} />;
      },
    },
    {
      id: "fill-color",
      name: "填充颜色",
      rendered: (editorState: EditorState, editor: Editor): ReactNode => {
        return <FillColor editorState={editorState} editor={editor} />;
      },
    },
    {
      id: "separator",
      name: "分割线",
      rendered: (): ReactNode => {
        return (
          <Separator
            orientation="vertical"
            className="py-1"
            style={{ height: "70%" }}
          />
        );
      },
    },
    {
      id: "alignment",
      name: "对齐",
      rendered: (editorState: EditorState, editor: Editor): ReactNode => {
        return <Alignment editorState={editorState} editor={editor} />;
      },
    },
    {
      id: "list",
      name: "列表",
      rendered: (editorState: EditorState, editor: Editor): ReactNode => {
        return <ParagraphList editorState={editorState} editor={editor} />;
      },
    },
    {
      id: "separator",
      name: "分割线",
      rendered: (): ReactNode => {
        return (
          <Separator
            orientation="vertical"
            className="py-1"
            style={{ height: "70%" }}
          />
        );
      },
    },
    {
      id: "link",
      name: "链接",
      rendered: (editorState: EditorState, editor: Editor): ReactNode => {
        return <TextLink editorState={editorState} editor={editor} />;
      },
    },
    {
      id: "quote",
      name: "引用",
      rendered: (editorState: EditorState, editor: Editor): ReactNode => {
        return <TextQuote editorState={editorState} editor={editor} />;
      },
    },
    {
      id: "HR",
      name: "HR分割线",
      rendered: (editorState: EditorState, editor: Editor): ReactNode => {
        return <TextSeparate editorState={editorState} editor={editor} />;
      },
    },
    {
      id: "image",
      name: "图片",
      rendered: (editorState: EditorState, editor: Editor): ReactNode => {
        return <Image editorState={editorState} editor={editor} />;
      },
    },
  ];
  return (
    <div className="flex items-center gap-1 h-full px-2 py-1">
      {tools.map((item, index) => {
        return (
          <div key={index} className="h-full flex items-center">
            {item.rendered(editorState, editor)}
          </div>
        );
      })}
    </div>
  );
};

export default EditorTool;
