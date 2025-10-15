import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface FlatDataProps {
  id: number;
  parentId: number | null;
  children?: FlatDataProps[];
  level: number,
  [key: string]: any; // 支持其他任意属性
}

export const treeDataToFlatData = <T extends Array<{ id: number; parentId: number | null; level: number;[key: string]: any }>>(data: T): FlatDataProps[] => {
  const flatData: FlatDataProps[] = [];
  function traverse(node: FlatDataProps, level: number) {
    flatData.push({
      ...node,
      level,
      visible: true,
      childrenVisible: true,
    });
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => traverse(child, level + 1));
    }
  }
  data.forEach(item => traverse(item, 0));
  return flatData;
}