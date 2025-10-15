import { Button } from "@/components/ui/button";
import {
  CirclePlus,
  SquareSigma,
  Table as TableIcon,
  ChevronRight,
} from "lucide-react";
import { Popover } from "@douyinfe/semi-ui";
import {
  IconImage,
  IconTable,
  IconHighlight,
  IconCodeHighlight,
} from "@douyinfe/semi-icons-lab";
import Table from "./Table";
import type { FC, ReactNode } from "react";
import type { ToolBarCompProps } from ".";

const PluginsList: FC<ToolBarCompProps> = ({ editorState, editor }) => {
  return (
    <div className="p-2 w-[200px]">
      <div className="label mb-1 text-gray-500 dark:text-gray-100 text-[13px]">
        基础
      </div>
      <div className="flex gap-1 flex-col">
        <Button
          className="w-full justify-start py-1 px-1 h-6 items-center rounded-[4px]"
          variant="ghost"
        >
          <div className="icon mr-1.5 flex items-center">
            <IconImage />
          </div>
          <div className="name">图片</div>
        </Button>
        <Popover
          content={<Table editorState={editorState} editor={editor} />}
          position="rightTop"
        >
          <div>
            <Button 
              className="w-full justify-start py-1 px-1 h-6 rounded-[4px] relative"
              variant="ghost"
            >
              <div className="icon mr-1.5 flex items-center">
                <TableIcon />
              </div>
              <div className="name">表格</div>
              <div className="more absolute right-[0px] top-1/2 -translate-y-1/2">
                <ChevronRight />
              </div>
            </Button>
          </div>
        </Popover>
        <Button
          className="w-full justify-start py-1 px-1 h-6 rounded-[4px]"
          variant="ghost"
        >
          <div className="icon mr-1.5 flex items-center">
            <SquareSigma />
          </div>
          <div className="name">公式</div>
        </Button>
        <Button
          className="w-full justify-start py-1 px-1 h-6 rounded-[4px]"
          variant="ghost"
        >
          <div className="icon mr-1.5 flex items-center">
            <IconHighlight />
          </div>
          <div className="name">高亮块</div>
        </Button>
        <Button
          className="w-full justify-start py-1 px-1 h-6 rounded-[4px]"
          variant="ghost"
        >
          <div className="icon mr-1.5 flex items-center">
            <IconCodeHighlight />
          </div>
          <div className="name">代码块</div>
        </Button>
      </div>
      <div className="label mb-1 text-gray-500 dark:text-gray-100 text-[13px] mt-1">
        数据表
      </div>
      <div className="flex gap-1 flex-col">
        <Button
          className="w-full justify-start py-1 px-1 h-6 rounded-[4px]"
          variant="ghost"
        >
          <div className="icon mr-1.5 flex items-center">
            <IconTable />
          </div>
          <div className="name">数据表格</div>
        </Button>
      </div>
    </div>
  );
};

const Plugins: FC<ToolBarCompProps> = (props) => {
  return (
    <div>
      <Popover content={PluginsList(props) as ReactNode} position="bottomLeft">
        <Button variant="ghost" className="p-0 h-6 w-6">
          <CirclePlus
            style={{ width: "16px", height: "16px", color: "#62b86e" }}
          />
        </Button>
      </Popover>
    </div>
  );
};

export default Plugins;
