import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="container flex h-[calc(100vh-4rem)] flex-col items-center justify-center">
      <Loader2 className="h-16 w-16 animate-spin text-muted-foreground" />
      <h1 className="mt-6 text-2xl font-medium">Loading recipes...</h1>
      <p className="mt-2 text-center text-muted-foreground">Please wait while we prepare something delicious.</p>
    </div>
  )
}
