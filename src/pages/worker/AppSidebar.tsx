import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Tree from "@/components/ui/Tree";
import {
  Settings,
  BookOpenText,
  Search,
  HeartPlus,
  SquareArrowOutUpRight,
  Plus,
  ChevronDown,
  ArrowDownWideNarrow,
  Trash2,
  Ellipsis,
  Copy,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { setActiveArticle, setArticles } from "@/store/articleSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { Skeleton } from "@/components/ui/skeleton";
import { treeDataToFlatData } from "@/utils";
import { useNavigate, useParams } from "react-router-dom";
import { cloneDeep } from "lodash-es";

interface MenuProps {
  path: string;
  name: string;
  icon: ReactNode;
}

const menus: MenuProps[] = [
  {
    path: "/work",
    name: "我的首页",
    icon: <BookOpenText />,
  },
  {
    path: "/work",
    name: "搜索",
    icon: <Search />,
  },
  {
    path: "/work",
    name: "收藏夹",
    icon: <HeartPlus />,
  },
  {
    path: "/publish",
    name: "我发布的文章",
    icon: <SquareArrowOutUpRight />,
  },
];

const Action = (
  data: any,
  createArticle: (parentId: string | null) => void
) => {
  return (
    <div className="action flex items-center gap-1.5 group">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="p-0 h-5 w-5 hover:bg-black/4 rounded-4xl opacity-0 group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Ellipsis />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-20 p-1">
          <div className="flex flex-col gap-2">
            <Button
              variant="ghost"
              className="p-0 text-sm w-full justify-start pl-2.5 rounded-4xl h-8"
            >
              <HeartPlus />
              收藏
            </Button>
            <Button
              variant="ghost"
              className="p-0 text-sm w-full justify-start pl-2.5 rounded-4xl h-8"
            >
              <Copy />
              复制
            </Button>
            <Button
              variant="ghost"
              className="p-0 text-sm w-full justify-start pl-2.5 rounded-4xl text-red-500 hover:text-red-500 h-8"
            >
              <Trash2 />
              删除
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      <Button
        variant="ghost"
        className="p-0 h-5 w-5 rounded-4xl hover:bg-black/4 opacity-0 group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          createArticle(data.id);
        }}
      >
        <Plus />
      </Button>
    </div>
  );
};

const AppSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { articles, activeArticle } = useSelector(
    (state: RootState) => state.article
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const getArticle = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const res = await fetch("/api/articles");
      const articleData = await res.json();
      if (articleData.code === 200) {
        const articles = treeDataToFlatData(articleData.data.articles);
        dispatch(setArticles(articles));
        if (id) {
          const activeArticle = articles.find((item) => item.id === Number(id));
          if (activeArticle) {
            dispatch(setActiveArticle(activeArticle));
          }
        } else {
          navigate(`/worker/${articles[0].id}`);
          dispatch(setActiveArticle(articles[0]));
        }
      }
    } catch (error) {
      console.error("获取文章列表失败", error);
    } finally {
      setLoading(false);
    }
  };
  const { id } = useParams();
  useEffect(() => {
    getArticle();
  }, []);
  const navigate = useNavigate();
  const onNodeClick = (data: any) => {
    dispatch(setActiveArticle(data));
    navigate(`/worker/${data.id}`);
  };

  const createArticle = async (parentId: string | null = null) => {
    const requestBody = {
      title: "",
      id: Date.now(),
      parentId,
      content: "",
      like: 0,
      collection: 0,
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      emoji: "🦁",
    };
    const res = await fetch("/api/articles", {
      method: "post",
      body: JSON.stringify(requestBody),
    });
    const data = await res.json();
    if (data.code === 200) {
      const newArticles = cloneDeep(articles)
      if (!parentId) {
        dispatch(setArticles([...newArticles, requestBody]));
      } else {
        let index = newArticles.findIndex((item) => item.id === Number(parentId));
        if (index !== -1) {
          newArticles[index].children = newArticles[index].children || []
          newArticles[index].children?.push(requestBody as any)
          newArticles[index].childrenVisible = true
          newArticles.splice(index + 1, 0, { ...requestBody, level: newArticles[index].level + 1, parentId: Number(parentId) });
          console.log(newArticles[index].children);
          
          dispatch(setArticles([...newArticles]));
        }
      }
      navigate(`/worker/${requestBody.id}`);
      dispatch(setActiveArticle(requestBody));
    }
  };

  return (
    <div className="h-full bg-muted px-3 py-1 dark:bg-[#27272a]">
      <div className="profile-info flex justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="p-0">
            <Avatar className="w-[28px] h-[28px]">
              <AvatarImage src="https://avatars.githubusercontent.com/u/88611687?v=4" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div className="profile-name text-sm text-gray-500 cursor-pointer hover:text-[#000] dark:text-gray-300">
              Liliilili
            </div>
          </Button>
        </div>
        <Tooltip>
          <TooltipTrigger>
            <Settings
              size={18}
              className="cursor-pointer text-gray-500 hover:text-accent-foreground dark:hover:bg-accent/50"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>用户/设置</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="menu-list">
        {menus.map((item, index) => {
          return (
            <div className="menu-item" key={index}>
              <Button
                variant="ghost"
                className="p-0 text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
              >
                {item.icon}
                {item.name}
              </Button>
            </div>
          );
        })}
      </div>
      <Separator className="my-2" />
      <section>
        <Collapsible
          defaultOpen={!isCollapsed}
          onOpenChange={(value) => setIsCollapsed(!value)}
        >
          <div className="text-sm text-gray-500 cursor-pointer py-1 rounded-sm flex items-center justify-between">
            <CollapsibleTrigger asChild>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  className="p-0 h-5 w-5 hover:bg-black/4 rounded-4xl dark:hover:bg-white/10"
                >
                  <ChevronDown
                    style={{ width: "16px" }}
                    className={`duration-300 ${
                      isCollapsed ? "-rotate-90" : ""
                    }`}
                  />
                </Button>
                <span className="text-gray-500 font-bold">我的文档</span>
              </div>
            </CollapsibleTrigger>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="p-0 h-5 w-5">
                  <ArrowDownWideNarrow
                    style={{ width: "16px", height: "16px" }}
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-20 p-1 flex flex-col">
                <Button variant="ghost" className="p-0">
                  默认排序
                </Button>
                <Button variant="ghost" className="p-0">
                  创建时间
                </Button>
                <Button variant="ghost" className="p-0">
                  更新时间
                </Button>
                <Button variant="ghost" className="p-0">
                  点赞数量
                </Button>
                <Button variant="ghost" className="p-0">
                  收藏数量
                </Button>
              </PopoverContent>
            </Popover>
          </div>
          <CollapsibleContent>
            {loading ? (
              <div className="loading flex flex-col gap-2">
                <Skeleton className="h-4 w-full bg-gray-200 dark:bg-[#333]" />
                <Skeleton className="h-4 w-full bg-gray-200 dark:bg-[#333]" />
                <Skeleton className="h-4 w-full bg-gray-200 dark:bg-[#333]" />
                <Skeleton className="h-4 w-full bg-gray-200 dark:bg-[#333]" />
              </div>
            ) : (
              <Tree
                treeData={articles}
                onNodeClick={(data) => onNodeClick(data)}
                value={activeArticle.id}
                actionSlot={(data) => Action(data, createArticle)}
              ></Tree>
            )}
          </CollapsibleContent>
        </Collapsible>
      </section>
      <Button
        variant="ghost"
        className="p-0 text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
        onClick={(e) => {
          e.stopPropagation();
          createArticle();
        }}
      >
        <Plus /> 新建文档
      </Button>
    </div>
  );
};

export default AppSidebar;
