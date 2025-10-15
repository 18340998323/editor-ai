import { ThemeProvider } from "@/components/theme-provider";
import Router from "./router";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/sonner"


function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Suspense fallback={<div>加载中...</div>}></Suspense>
      <Router />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
