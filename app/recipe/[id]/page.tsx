"use client"

import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import { Globe, Tag, ChevronLeft, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useMealDetails } from "@/hooks/use-recipes"
import { getIngredientsAndMeasures } from "@/lib/api"

export default function RecipePage() {
  const params = useParams()
  const id = params?.id as string

  const { data: meal, isLoading, error } = useMealDetails(id)

  if (isLoading) {
    return (
      <div className="container flex h-[calc(100vh-4rem)] flex-col items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-muted-foreground" />
        <h1 className="mt-6 text-2xl font-medium">Loading recipe...</h1>
      </div>
    )
  }

  if (error || !meal) {
    return notFound()
  }

  const ingredients = getIngredientsAndMeasures(meal)

  // Split instructions into steps
  const instructions = meal.strInstructions
    .split(/\r\n|\r|\n/)
    .filter((step: string) => step.trim() !== "")
    .map((step: string) => step.trim())

  return (
    <main className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to recipes
        </Link>
      </Button>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{meal.strMeal}</h1>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Globe className="h-3.5 w-3.5" />
                {meal.strArea}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Tag className="h-3.5 w-3.5" />
                {meal.strCategory}
              </Badge>
              {meal.strTags &&
                meal.strTags.split(",").map((tag: string) => (
                  <Badge key={tag} variant="outline">
                    {tag.trim()}
                  </Badge>
                ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg">
            <img
              src={meal.strMealThumb || "/placeholder.svg"}
              alt={meal.strMeal}
              className="h-full w-full object-cover"
            />
          </div>

          {meal.strYoutube && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Video Tutorial</h2>
              <Button asChild>
                <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
                  Watch on YouTube
                </a>
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
            <ul className="space-y-2">
              {ingredients.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.ingredient}</span>
                  <span className="text-muted-foreground">{item.measure}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <ol className="space-y-4 list-decimal list-inside">
              {instructions.map((step: string, index: number) => (
                <li key={index} className="pl-2">
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {meal.strSource && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Source</h2>
              <Button variant="outline" asChild>
                <a href={meal.strSource} target="_blank" rel="noopener noreferrer">
                  View Original Recipe
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>

      
    </main>
  )
}
