"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getFeedbackForRecipe, submitFeedback, type FeedbackInput } from "@/lib/api"

// Query keys
export const feedbackKeys = {
  all: ["feedback"],
  byRecipe: (recipeId: string) => [...feedbackKeys.all, recipeId],
}

// Hook to get feedback for a recipe
export function useFeedbackForRecipe(recipeId: string) {
  return useQuery({
    queryKey: feedbackKeys.byRecipe(recipeId),
    queryFn: () => getFeedbackForRecipe(recipeId),
  })
}

// Hook to submit feedback
export function useSubmitFeedback() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (feedback: FeedbackInput) => submitFeedback(feedback),
    onSuccess: (newFeedback) => {
      // Invalidate the query for this recipe's feedback to trigger a refetch
      queryClient.invalidateQueries({ queryKey: feedbackKeys.byRecipe(newFeedback.recipeId) })
    },
  })
}
