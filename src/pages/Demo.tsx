import {
  useState,
  useEffect,
  useRef,
  Children,
  isValidElement,
  cloneElement,
  type ReactNode,
} from "react";
import { Editor } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import { TableKit } from "@tiptap/extension-table";
// 导入表格相关扩展

const Product = ({ id }: { id?: number }) => {
  return <div>我是产品{id}</div>;
};

const ProductList = ({ children, id }: { children: ReactNode; id: number }) => {
  return (
    <>
      {Children.map(children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child, { id: id } as any);
        }
      })}
    </>
  );
};

const TableEditor = () => {
  const [editor, setEditor] = useState<Editor | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  // 初始化编辑器
  useEffect(() => {
    const newEditor = new Editor({
      element: editorRef.current!,
      content: `
        <p>这是一个带表格功能的编辑器：</p>
        <table>
          <tr>
            <th>表头 1</th>
            <th>表头 2</th>
          </tr>
          <tr>
            <td>单元格 1</td>
            <td>单元格 2</td>
          </tr>
        </table>
      `,
      extensions: [
        StarterKit.configure({
          // 禁用默认的段落间距（可选）
          paragraph: {
            HTMLAttributes: {
              class: "my-2",
            },
          },
        }),
        TableKit.configure({
          table: {
            HTMLAttributes: {
              class: "w-full border-collapse my-4",
            },
          },
          tableRow: {
            HTMLAttributes: {
              class: "border-b",
            },
          },
          tableHeader: {
            HTMLAttributes: {
              class: "p-2 border border-gray-200",
            },
          },
          tableCell: {
            HTMLAttributes: {
              class: "bg-gray-50 p-2 border border-gray-200 font-semibold",
            },
          },
        }),
      ],
      onUpdate: ({ editor }) => {
        console.log("编辑器内容更新:", editor.getHTML());
      },
    });

    setEditor(newEditor);

    return () => {
      newEditor.destroy();
    };
  }, []);

  // 表格操作函数
  const tableActions = {
    // 插入新表格（2行2列示例）
    insertTable: () => {
      editor
        ?.chain()
        .focus()
        .insertTable({ rows: 2, cols: 2, withHeaderRow: true })
        .run();
    },
    // 在当前行前添加行
    addRowBefore: () => {
      editor?.chain().focus().addRowBefore().run();
    },
    // 在当前行后添加行
    addRowAfter: () => {
      editor?.chain().focus().addRowAfter().run();
    },
    // 在当前列前添加列
    addColumnBefore: () => {
      editor?.chain().focus().addColumnBefore().run();
    },
    // 在当前列后添加列
    addColumnAfter: () => {
      editor?.chain().focus().addColumnAfter().run();
    },
    // 删除当前行
    deleteRow: () => {
      editor?.chain().focus().deleteRow().run();
    },
    // 删除当前列
    deleteColumn: () => {
      editor?.chain().focus().deleteColumn().run();
    },
    // 删除整个表格
    deleteTable: () => {
      editor?.chain().focus().deleteTable().run();
    },
  };

  const getClipboardContent = async () => {
    const md = window.markdownit({
      html: true, // 允许解析和输出 HTML
      linkify: true, // 自动识别链接
      typographer: true, // 启用一些排版优化
      breaks: true, // 允许换行符转换为 <br>
    });
    const clipboardItems = await navigator.clipboard.read();
    for (const clipboardItem of clipboardItems) {
      console.log(clipboardItem);

      for (const type of clipboardItem.types) {
        if (type.includes("text/html")) {
          // 获取HTML内容
          const blob = await clipboardItem.getType("text/html");
          const html = await blob.text();
          console.log(html);
        } else {
        }
      }
    }
    const text = await navigator.clipboard.readText();

    console.log(md.render(text));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* 表格操作按钮 */}
      <div className="flex gap-2 mb-4 p-2 bg-gray-50 rounded border">
        <button
          onClick={tableActions.insertTable}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          插入表格
        </button>
        <div className="flex gap-1">
          <button
            onClick={tableActions.addRowBefore}
            className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            行前
          </button>
          <button
            onClick={tableActions.addRowAfter}
            className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            行后
          </button>
          <button
            onClick={tableActions.deleteRow}
            className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            删除行
          </button>
        </div>
        <div className="flex gap-1">
          <button
            onClick={tableActions.addColumnBefore}
            className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            列前
          </button>
          <button
            onClick={tableActions.addColumnAfter}
            className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            列后
          </button>
          <button
            onClick={tableActions.deleteColumn}
            className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            删除列
          </button>
        </div>
        <button
          onClick={tableActions.deleteTable}
          className="px-2 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
        >
          删除表格
        </button>
      </div>

      {/* 编辑器容器 */}
      <div
        ref={editorRef}
        className="min-h-[300px] border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ProductList id={123}>
        <Product />
      </ProductList>
      <button onClick={getClipboardContent}>获取剪切内容</button>
    </div>
  );
};

export default TableEditor;
