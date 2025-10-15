import { useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
import Assistant from "./assistant/Assistant";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import type { RootState } from "@/store";
import { lazy, Suspense } from "react";
import EditorContainer from "./editor/EditorContainer";

// const EditorContainer = lazy(() => import("./editor/EditorContainer"));


const ArticleContainer = () => {
  const state = useSelector((state: RootState) => state.editor);

  return (
    <div className="h-full">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={80} minSize={75} maxSize={85}>
         
          <EditorContainer />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          defaultSize={20}
          minSize={15}
          maxSize={25}
          className={`${state.assistantVisible ? "block" : "hidden"}`}
        >
          <div className="h-full w-full">
            <Assistant></Assistant>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ArticleContainer;
