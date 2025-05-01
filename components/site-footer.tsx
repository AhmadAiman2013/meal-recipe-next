import Link from "next/link"
import { ChefHat } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <div className="flex items-center gap-2">
          <ChefHat className="h-5 w-5" />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Recipe Explorer. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            Home
          </Link>
          <Link href="/categories" className="text-sm text-muted-foreground hover:text-foreground">
            Categories
          </Link>
        </div>
      </div>
    </footer>
  )
}
