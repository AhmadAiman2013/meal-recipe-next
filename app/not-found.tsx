import Link from "next/link"
import { ChefHat } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex h-[calc(100vh-4rem)] flex-col items-center justify-center">
      <ChefHat className="h-16 w-16 text-muted-foreground" />
      <h1 className="mt-6 text-3xl font-bold">Recipe Not Found</h1>
      <p className="mt-2 text-center text-muted-foreground">We couldn't find the recipe you were looking for.</p>
      <Button asChild className="mt-8">
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  )
}
