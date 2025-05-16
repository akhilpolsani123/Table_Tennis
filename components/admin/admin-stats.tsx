"use client";

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, TrendingUp } from "lucide-react"

export function AdminStats() {
  const [activeMatches, setActiveMatches] = useState(0)
  const [freeTips, setFreeTips] = useState(0)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/tips');
        if (!response.ok) {
          throw new Error('Failed to fetch tips');
        }
        const tips = await response.json();
        setActiveMatches(tips.length);
        setFreeTips(tips.filter((tip) => tip.status === "free").length);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Matches</CardTitle>
          <Trophy className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{activeMatches}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Free Tips</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{freeTips}</div>
        </CardContent>
      </Card>
    </div>
  )
}

