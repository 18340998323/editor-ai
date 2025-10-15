import { Moon, Sun, MonitorCog } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme, type Theme } from "@/components/theme-provider";
import { useEffect } from "react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const onSetAppTheme = (theme: Theme) => {
    localStorage.setItem('app-theme', theme)
    setTheme(theme)
  }

  useEffect(() => {
    const appTheme = localStorage.getItem('app-theme') as Theme
    if (appTheme) {
      onSetAppTheme(appTheme)
    }
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8">
          { theme === 'light' && <Sun className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" /> }
          { theme === 'dark' && <Moon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" /> }
          { theme === 'system' && <MonitorCog className="scale-100 rotate-0 transition-all dark:scale-100 dark:rotate-0" /> }
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onSetAppTheme("light")}>
          明亮
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSetAppTheme("dark")}>
          黑暗
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSetAppTheme("system")}>
          跟随系统
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
