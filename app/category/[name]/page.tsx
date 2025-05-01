"use client"

import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import { ChevronLeft, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useMealsByCategory } from "@/hooks/use-recipes"

export default function CategoryPage() {
  const params = useParams()
  const name = params?.name as string
  const decodedCategory = decodeURIComponent(name)

  const { data: meals = [], isLoading, error } = useMealsByCategory(decodedCategory)

  if (isLoading) {
    return (
      <div className="container flex h-[calc(100vh-4rem)] flex-col items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-muted-foreground" />
        <h1 className="mt-6 text-2xl font-medium">Loading recipes...</h1>
      </div>
    )
  }

  if (error || !meals.length) {
    return notFound()
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/categories">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to categories
        </Link>
      </Button>

      <h1 className="text-3xl font-bold tracking-tight mb-6">{decodedCategory} Recipes</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {meals.map((meal: any) => (
          <Card key={meal.idMeal}>
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={meal.strMealThumb || "/placeholder.svg"}
                alt={meal.strMeal}
                className="h-full w-full object-cover transition-all hover:scale-105"
              />
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-1">{meal.strMeal}</CardTitle>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/recipe/${meal.idMeal}`}>View Recipe</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  )
}
