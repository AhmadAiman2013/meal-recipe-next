// This file contains functions to fetch data from the MealDB API.

export async function fetchRandomMeals() {
  try {
    // Fetch 8 random meals
    const meals = [];
    for (let i = 0; i < 8; i++) {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      const data = await res.json();
      if (data.meals && data.meals[0]) {
        meals.push(data.meals[0]);
      }
    }
    // Remove duplicates by ID
    return Array.from(
      new Map(meals.map((meal) => [meal.idMeal, meal])).values()
    );
  } catch (error) {
    console.error("Error fetching random meals:", error);
    throw new Error("Failed to fetch random meals");
  }
}

// Fetch meals by id
export async function fetchMealById(id: string) {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await res.json();
    return data.meals?.[0] || null;
  } catch (error) {
    console.error("Error fetching meal:", error);
    throw new Error("Failed to fetch meal details");
  }
}

// Fetch meals by categories
export async function fetchCategories() {
  try {
    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const data = await res.json();
    return data.categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
}

// Fetch meals by category
export async function fetchMealsByCategory(category: string) {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const data = await res.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meals by category:", error);
    throw new Error("Failed to fetch meals by category");
  }
}

// Helper function to extract ingredients and measures
export function getIngredientsAndMeasures(meal: any) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        ingredient,
        measure: measure || "",
      });
    }
  }

  return ingredients;
}

// Feedback API functions
export type Feedback = {
    id: string
    recipeId: string
    name: string
    rating: number
    comment: string
    createdAt: string
  }
  
  export type FeedbackInput = Omit<Feedback, "id" | "createdAt">
  
  // Simulated API function to get feedback for a recipe
  export function getFeedbackForRecipe(recipeId: string): Feedback[] {
    if (typeof window === "undefined") return []
  
    try {
      const feedbackData = localStorage.getItem("recipe-feedback")
      const allFeedback: Feedback[] = feedbackData ? JSON.parse(feedbackData) : []
      return allFeedback
        .filter((feedback) => feedback.recipeId === recipeId)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    } catch (error) {
      console.error("Error getting feedback:", error)
      return []
    }
  }
  
  // Simulated API function to submit feedback
  export function submitFeedback(feedback: FeedbackInput): Promise<Feedback> {
    return new Promise((resolve, reject) => {
      try {
        // Simulate network delay
        setTimeout(() => {
          const feedbackData = localStorage.getItem("recipe-feedback")
          const allFeedback: Feedback[] = feedbackData ? JSON.parse(feedbackData) : []
  
          const newFeedback: Feedback = {
            ...feedback,
            id: `feedback-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            createdAt: new Date().toISOString(),
          }
  
          const updatedFeedback = [...allFeedback, newFeedback]
          localStorage.setItem("recipe-feedback", JSON.stringify(updatedFeedback))
  
          resolve(newFeedback)
        }, 500) // 500ms delay to simulate network
      } catch (error) {
        reject(error)
      }
    })
  }
  
