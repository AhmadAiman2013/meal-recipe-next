"use client"

import { useFeedbackForRecipe } from "@/hooks/use-feedback"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StarRating } from "./star-rating"
import { Loader2, MessageSquare } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface FeedbackListProps {
  recipeId: string
}

export function FeedbackList({ recipeId }: FeedbackListProps) {
  const { data: feedback = [], isLoading } = useFeedbackForRecipe(recipeId)

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (feedback.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No comments yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">Be the first to share your thoughts on this recipe!</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Comments ({feedback.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {feedback.map((item) => (
            <div key={item.id} className="border-b pb-4 last:border-0">
              <div className="flex items-center justify-between">
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                </div>
              </div>
              <div className="mt-1">
                <StarRating rating={item.rating} readOnly size="sm" />
              </div>
              <p className="mt-2 text-sm">{item.comment}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
