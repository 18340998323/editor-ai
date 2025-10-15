import { useState, type FC } from "react";
import type { ToolBarCompProps } from "./index";

const Table: FC<ToolBarCompProps> = ({ editorState, editor }) => {
  const tableCell = Array(10).fill(Array(10).fill(0));
  const [tableState, setTableState] = useState({
    row: 0,
    cols: 0,
  });

  const onTableMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    const { x, y } = event.currentTarget.getClientRects()[0];
    const rowIndex = Math.min(Math.ceil((clientY - y) / 15), 10);
    const colIndex = Math.min(Math.ceil((clientX - x) / 15), 10);
    setTableState((prev) => ({ ...prev, row: rowIndex, cols: colIndex }));
  };

  const onInsertTable = () => {
    setTableState({ row: 0, cols: 0 });
    editor
      .chain()
      .focus()
      .insertTable({
        rows: tableState.row,
        cols: tableState.cols,
        withHeaderRow: false,
      })
      .run();
  };
  return (
    <div className="p-3">
      <div
        className="flex border-[1px] border-[#D8DaD9] flex-wrap w-[152px] border-r-0 border-b-0"
        onMouseMove={onTableMouseMove}
        onMouseLeave={() => setTableState({ row: 0, cols: 0 })}
      >
        {tableCell.map((row: Array<number>, rowIndex) =>
          row.map((_, colIndex) => (
            <div
              className={`border-b-[#D8DaD9] border-b-[1px] border-r-[1px] border-r-[#D8DaD9] w-[15px] h-[15px]  box-border cursor-pointer ${
                rowIndex + 1 <= tableState.row &&
                colIndex + 1 <= tableState.cols
                  ? "bg-[#dceafa] dark:bg-[#5b5c5d]"
                  : ""
              }`}
              onClick={onInsertTable}
              key={rowIndex + "-" + colIndex}
            ></div>
          ))
        )}
      </div>
      <div className="count flex w-full mt-2 text-sm text-gray-500 dark:text-gray-300 items-center justify-center">
        {tableState.row} X {tableState.cols}
      </div>
    </div>
  );
};

export default Table;
