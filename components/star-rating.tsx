"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  onRatingChange?: (rating: number) => void
  max?: number
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  readOnly?: boolean
}

export function StarRating({
  rating,
  onRatingChange,
  max = 5,
  size = "md",
  disabled = false,
  readOnly = false,
}: StarRatingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  const handleClick = (newRating: number) => {
    if (disabled || readOnly) return
    onRatingChange?.(newRating)
  }

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1
        const isFilled = starValue <= rating

        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(starValue)}
            className={cn(
              "focus:outline-none",
              !readOnly && !disabled && "hover:scale-110 transition-transform",
              disabled && "opacity-50 cursor-not-allowed",
              readOnly && "cursor-default",
            )}
            disabled={disabled || readOnly}
            aria-label={`Rate ${starValue} out of ${max} stars`}
          >
            <Star
              className={cn(
                sizeClasses[size],
                isFilled ? "text-yellow-400 fill-yellow-400" : "text-gray-300",
                !readOnly && !disabled && !isFilled && "hover:text-yellow-200",
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
