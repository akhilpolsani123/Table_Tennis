import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useRouter } from 'next/navigation'

interface MatchCardProps {
  id: number
  tournament: string
  player1: string
  player2: string
  date: string
  time: string
  status: 'pro' | 'free'
  round: string
  onStatusChange: () => void
  isAdmin?: boolean
}

export function MatchCard({ id, tournament, player1, player2, date, time, status, round, onStatusChange, isAdmin = false }: MatchCardProps) {
  const router = useRouter()
  const [freeTip, setFreeTip] = useState<string | null>(null)

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-6">
          <Badge variant="secondary" className="bg-gray-100 text-gray-800">
            {tournament}
          </Badge>
          <div className="flex items-center gap-2">
            <Badge 
              variant={status === 'pro' ? "destructive" : "secondary"} 
              className={status === 'pro' ? "bg-[#ff4d15]" : "bg-green-500"}
            >
              {status === 'pro' ? 'PRO' : 'FREE'}
            </Badge>
            {isAdmin && (
              <Switch
                checked={status === 'pro'}
                onCheckedChange={onStatusChange}
              />
            )}
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-4">
          {player1} v {player2}
        </h3>
        <div className="text-gray-500 mb-4">
          {date}
          <br />
          {time}
        </div>
        {status === 'pro' ? (
          <Button
            onClick={() => {
              router.push(`/payment?matchId=${id}&price=9.99`);
            }}
            className="w-full bg-[#ff4d15] text-white hover:bg-[#ff4d15]/90"
          >
            Unlock Pro Tip ($9.99)
          </Button>
        ) : (
          <>
            {freeTip ? (
              <div className="mt-4 p-3 bg-green-100 rounded-md">
                <p className="text-green-800 font-medium">{freeTip}</p>
              </div>
            ) : (
              <Button
                onClick={() => {
                  const winner = Math.random() < 0.5 ? player1 : player2;
                  setFreeTip(`Free Tip: ${winner} to win`);
                }}
                className="w-full bg-green-500 text-white hover:bg-green-600"
              >
                View Free Tip
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

