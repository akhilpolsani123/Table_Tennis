"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Send } from 'lucide-react'

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const [price, setPrice] = useState('')
  const [matchId, setMatchId] = useState('')

  useEffect(() => {
    setPrice(searchParams.get('price') || '')
    setMatchId(searchParams.get('matchId') || '')
  }, [searchParams])

  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl">Get Paid Tips on Telegram</CardTitle>
          <CardDescription className="text-sm sm:text-base md:text-lg">Join our group for exclusive pro tips and secure payments</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 md:p-8">
          <a
            href="https://t.me/akhil123r"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button className="bg-[#0088cc] hover:bg-[#0088cc]/90 text-white w-full py-6 text-lg sm:text-xl md:text-2xl flex items-center justify-center gap-2">
              <Send size={24} className="hidden sm:inline" />
              Telegram
            </Button>
          </a>
        </CardContent>
      </Card>
    </div>
  )
}

