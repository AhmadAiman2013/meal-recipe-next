"use client";

import type React from "react";

import { useState } from "react";
import { useSubmitFeedback } from "@/hooks/use-feedback";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/star-rating";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface FeedbackFormProps {
  recipeId: string;
  recipeName: string;
}

export function FeedbackForm({ recipeId, recipeName }: FeedbackFormProps) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const { mutate, isPending, isSuccess, reset } = useSubmitFeedback();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Please enter your name to submit feedback.');
      return;
    }

    if (!comment.trim()) {
      toast.error('Please enter a comment to submit feedback.');
      return;
    }

    mutate(
      {
        recipeId,
        name: name.trim(),
        rating,
        comment: comment.trim(),
      },
      {
        onSuccess: () => {
          toast.message('Feedback submitted', {
            description: "Thank you for sharing your thoughts!",
          });
        },
        onError: () => {
          toast.error('There was a problem submitting your feedback. Please try again.');
        },
      }
    );
  };

  // Reset form after successful submission
  const handleReset = () => {
    setName("");
    setRating(5);
    setComment("");
    reset();
  };

  if (isSuccess) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Thank you for your feedback!</CardTitle>
          <CardDescription>
            Your comment has been submitted successfully.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button onClick={handleReset}>Add Another Comment</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave a Comment</CardTitle>
        <CardDescription>
          Share your thoughts about {recipeName}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <StarRating
              rating={rating}
              onRatingChange={setRating}
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment">Your Comment</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this recipe..."
              rows={4}
              disabled={isPending}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="mt-2" type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Comment"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
