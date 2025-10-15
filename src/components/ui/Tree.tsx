import { Button } from "./button";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { cloneDeep } from "lodash-es";

interface TreeDataProps {
  title: string;
  id: string | number;
  children?: TreeDataProps[];
  [key: string]: any;
}
interface TreeProps {
  value: number;
  onNodeClick: (item: TreeDataProps) => void;
  treeData: TreeDataProps[];
  expandAll?: boolean;
  actionSlot: (data: TreeDataProps) => React.ReactNode;
}

const Tree: React.FC<TreeProps> = ({
  onNodeClick,
  value,
  treeData,
  expandAll = true,
  actionSlot,
}) => {
  // let slotDic: { [key: string]: React.ReactNode } = {};
  // if (Array.isArray(children)) {
  //   children.forEach((child) => {
  //     let slotName = child.props.slot;
  //     if (slotName) {
  //       slotDic[slotName] = child;
  //     }
  //   });
  // }
  
  const [showData, setShowData] = useState<TreeDataProps[]>([]);

  useEffect(() => {
    const copyData = cloneDeep(treeData);
    if (expandAll) {
      copyData.forEach((item) => {
        item.visible = true;
      });
    }
    setShowData(copyData);
  }, [value, treeData]);

  // 切换节点展开/折叠状态
  const onToggleExpand = (data: TreeDataProps) => {
    const copyData = cloneDeep(showData);
    const nodeMap = new Map<string | number, TreeDataProps>();
    copyData.forEach((item) => {
      nodeMap.set(item.id, item);
    });
    // 获取当前节点并切换其展开状态
    const targetNode = nodeMap.get(data.id);
    if (targetNode) {
      // 确保childrenVisible属性有默认值
      targetNode.childrenVisible = !targetNode.childrenVisible;
      // 递归更新子节点可见性
      function updateChildVisibility(
        nodeId: string | number,
        isVisible: boolean
      ) {
        copyData.forEach((item) => {
          if (item.parentId === nodeId) {
            item.visible = isVisible;
            item.childrenVisible = isVisible;
            // 递归更新子节点的子节点
            updateChildVisibility(item.id, isVisible);
          }
        });
      }
      // 更新当前节点下所有子节点的可见性
      updateChildVisibility(data.id, targetNode.childrenVisible);
    }
    // 更新状态
    setShowData(copyData);
  };

  return (
    <>
      {showData.map(
        (item) =>
          item.visible && (
            <div
              className={`tree-item-parent cursor-pointer ${
                value === item.id ? "bg-black/5 dark:hover:bg-white/10 dark:bg-white/10" : ""
              } hover:bg-black/5 dark:hover:bg-white/5 rounded-sm`}
              style={{ paddingLeft: `${item.level * 16}px` }}
              key={item.id}
              onClick={() => onNodeClick(item)}
            >
              <div
                className={`mb-[2px] text-sm text-gray-500 px-2 py-1 rounded-sm flex items-center justify-between gap-1 group ${
                  value === item.id
                    ? "text-gray-900 dark:text-gray-300"
                    : "dark:text-gray-400 dark:hover:text-gray-100 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-1 flex-1">
                  {Array.isArray(item?.children) &&
                    item.children.length > 0 && (
                      <Button
                        variant="ghost"
                        className="p-0 h-5 w-5 hover:bg-black/4 rounded-4xl"
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleExpand(item);
                        }}
                      >
                        <ChevronDown
                          className={`duration-300 ${
                            item.childrenVisible ? "" : "-rotate-90"
                          }`}
                          style={{ width: "16px" }}
                        />
                      </Button>
                    )}
                  <div
                    className={`label text-gray-500 ${
                      value === item.id
                        ? "text-gray-900 dark:text-gray-300"
                        : "dark:text-gray-400 dark:hover:text-gray-100 hover:text-gray-900"
                    }`}
                    style={{
                      paddingLeft: `${item.children?.length ? 0 : 12}px`,
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <span className="flex items-center">{item.emoji}</span> {item.title? item.title: '<无标题>'}
                    </div>
                  </div>
                </div>
                {actionSlot(item)}
              </div>
            </div>
          )
      )}
    </>
  );
};
export default Tree;
