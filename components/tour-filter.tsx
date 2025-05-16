"use client"

import { Button } from "@/components/ui/button"
import { Star } from 'lucide-react'

const tours = [
  { id: "popular", label: "Popular", icon: Star },
  { id: "wta", label: "WTA Tour" },
  { id: "atp-challenger", label: "ATP Challenger Tour" },
  { id: "atp", label: "ATP Tour" },
  { id: "itf", label: "ITF Tour" },
]

export function TourFilter() {
  return (
    <div className="flex gap-2 overflow-x-auto p-4 pb-2">
      {tours.map((tour) => (
        <Button
          key={tour.id}
          variant="secondary"
          className="whitespace-nowrap"
        >
          {tour.icon && <tour.icon className="w-4 h-4 mr-2" />}
          {tour.label}
        </Button>
      ))}
    </div>
  )
}

