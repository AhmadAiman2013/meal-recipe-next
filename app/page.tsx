"use client"

import Link from "next/link"
import { ArrowRight, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRandomMeals } from "@/hooks/use-recipes"

export default function Home() {
  const { data: meals = [], isLoading, error } = useRandomMeals()

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-16">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
            Delicious Recipes <br className="hidden sm:inline" />
            for Every Taste
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            Discover amazing recipes from around the world. Find your next favorite meal.
          </p>
        </div>
      </section>

      <section className="py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight">Featured Recipes</h2>
          <Button variant="outline" asChild>
            <Link href="/categories">
              Browse Categories <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="rounded-lg bg-destructive/10 p-6 text-center text-destructive">
            <p>Failed to load recipes. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {meals.map((meal) => (
              <Card key={meal.idMeal} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={meal.strMealThumb || "/placeholder.svg"}
                    alt={meal.strMeal}
                    className="h-full w-full object-cover transition-all hover:scale-105"
                  />
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="line-clamp-1">{meal.strMeal}</CardTitle>
                  <CardDescription>
                    {meal.strArea} • {meal.strCategory}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="p-4 pt-0">
                  <Button asChild className="w-full">
                    <Link href={`/recipe/${meal.idMeal}`}>View Recipe</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
