"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchRandomMeals, fetchMealById, fetchCategories, fetchMealsByCategory } from "@/lib/api"

// Query keys
export const queryKeys = {
  randomMeals: ["randomMeals"],
  meal: (id: string) => ["meal", id],
  categories: ["categories"],
  mealsByCategory: (category: string) => ["mealsByCategory", category],
  favorites: ["favorites"],
}

// Hooks for fetching data
export function useRandomMeals() {
  return useQuery({
    queryKey: queryKeys.randomMeals,
    queryFn: fetchRandomMeals,
  })
}

export function useMealDetails(id: string) {
  return useQuery({
    queryKey: queryKeys.meal(id),
    queryFn: () => fetchMealById(id),
    enabled: !!id,
  })
}

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: fetchCategories,
  })
}

export function useMealsByCategory(category: string) {
  return useQuery({
    queryKey: queryKeys.mealsByCategory(category),
    queryFn: () => fetchMealsByCategory(category),
    enabled: !!category,
  })
}

export function useFavorites() {
  return useQuery({
    queryKey: queryKeys.favorites,
    queryFn: () => {
      if (typeof window === "undefined") return []
      const favorites = localStorage.getItem("favorites")
      return favorites ? JSON.parse(favorites) : []
    },
  })
}

export function useSearchMeals(query: string) {
  return useQuery({
    queryKey: ["searchMeals", query],
    queryFn: async () => {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        const data = await res.json()
        return data.meals || []
      } catch (error) {
        console.error("Error fetching search meals:", error)
        throw new Error("Failed to fetch search meals")
      }
    },
    enabled: !!query,
  })
}
