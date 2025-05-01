"use client"

import Link from "next/link"
import { ChevronLeft, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useCategories } from "@/hooks/use-recipes"

export default function CategoriesPage() {
  const { data: categories = [], isLoading, error } = useCategories()

  return (
    <main className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
      </Button>

      <h1 className="text-3xl font-bold tracking-tight mb-6">Recipe Categories</h1>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : error ? (
        <div className="rounded-lg bg-destructive/10 p-6 text-center text-destructive">
          <p>Failed to load categories. Please try again later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category: any) => (
            <Card key={category.idCategory}>
              <div className="aspect-square w-full overflow-hidden">
                <img
                  src={category.strCategoryThumb || "/placeholder.svg"}
                  alt={category.strCategory}
                  className="h-full w-full object-cover transition-all hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>{category.strCategory}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3">{category.strCategoryDescription}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/category/${category.strCategory}`}>View Recipes</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}
