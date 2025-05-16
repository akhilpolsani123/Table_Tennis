"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

export function MatchesManagement() {
  const [matches] = useState([
    {
      id: 1,
      player1: "Ma Long",
      player2: "Fan Zhendong",
      tournament: "WTT Champions",
      round: "Semi-Final",
      status: "pro",
      date: "2024-10-25",
    },
    {
      id: 2,
      player1: "Sun Yingsha",
      player2: "Chen Meng",
      tournament: "ITTF World Tour",
      round: "Quarter-Final",
      status: "free",
      date: "2024-10-25",
    },
    {
      id: 3,
      player1: "Tomokazu Harimoto",
      player2: "Lin Yun-Ju",
      tournament: "WTT Champions",
      round: "Quarter-Final",
      status: "pro",
      date: "2024-10-25",
    },
  ])

  return (
    <div className="rounded-md border mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Players</TableHead>
            <TableHead>Tournament</TableHead>
            <TableHead>Round</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches.map((match) => (
            <TableRow key={match.id}>
              <TableCell className="font-medium">
                {match.player1} vs {match.player2}
              </TableCell>
              <TableCell>{match.tournament}</TableCell>
              <TableCell>{match.round}</TableCell>
              <TableCell>{match.date}</TableCell>
              <TableCell>
                <Badge
                  variant={match.status === 'pro' ? "destructive" : "secondary"}
                  className={match.status === 'pro' ? "bg-[#ff4d15]" : "bg-green-500"}
                >
                  {match.status.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={match.status === 'pro'}
                    onCheckedChange={() => {}}
                  />
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

