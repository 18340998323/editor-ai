import AppSidebar from "@/pages/worker/AppSidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ArticleContainer from "./ArticleContainer";
import ArticleHeader from "./ArticleHeader";
import ArticleFooter from "./ArticleFooter";

export default function Home() {
  return (
    <section className="home-container w-dvw h-dvh">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <AppSidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80} minSize={70} maxSize={85}>
          <div className="h-full w-full flex flex-col">
            <div className="border-b-1 border-gray-200 h-[45px] dark:border-gray-700 px-2">
              <ArticleHeader />
            </div>
            <ArticleContainer />
            <div className="border-t-1 border-gray-200 h-[35px] dark:border-gray-700 px-2">
              <ArticleFooter />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </section>
  );
}
