import { Link, useLocation } from "react-router-dom"
import { cn } from "@/utils"
import { ModeToggle } from "./mode-toggle"

const navigation = [
  { name: "首页", href: "/" },
  { name: "关于", href: "/about" },
  { name: "联系", href: "/contact" },
]

export default function Navigation() {
  const location = useLocation()

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold">
              Editor AI
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  <Link
                    to={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
                      location.pathname.startsWith(item.href) && item.href !== "/"
                        ? "text-foreground"
                        : location.pathname === item.href
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
