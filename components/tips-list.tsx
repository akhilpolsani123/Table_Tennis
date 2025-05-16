"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Sparkles, Calendar, Trophy } from "lucide-react";
import { ITip } from "@/app/models/Tip";
import { TELEGRAM_LINK } from "@/lib/constants";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function TipsList() {
  const [tips, setTips] = useState<ITip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTips = async () => {
      try {
        setLoading(true);
        console.log('Fetching tips...');
        
        // Remove the status filter to get all tips
        const response = await fetch('/api/tips');
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          throw new Error('Failed to fetch tips');
        }
        
        const data = await response.json();
        console.log('Fetched tips:', data);
        
        setTips(data);
      } catch (error) {
        console.error('Error fetching tips:', error);
        setError('Failed to load tips');
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  const handleUnlockClick = () => {
    window.open(TELEGRAM_LINK, '_blank');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="text-lg">Loading tips...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!tips.length) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="text-lg text-gray-500">No tips available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {tips.map((tip) => (
        <motion.div
          key={tip._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card 
            className={cn(
              "relative overflow-hidden",
              "backdrop-blur-md transition-all duration-300",
              "hover:shadow-xl",
              tip.status === 'pro' 
                ? [
                  'bg-gradient-to-br from-[#1a0f03] via-[#1f1106] to-[#170d02]',
                  'border-[#ff4d15]/20',
                  'hover:shadow-[#ff4d15]/5',
                  'before:absolute before:inset-0',
                  'before:bg-gradient-to-r before:from-transparent',
                  'before:via-[#ff4d15]/10 before:to-transparent',
                  'before:animate-shine',
                ]
                : [
                  'bg-gradient-to-br from-slate-900/90 via-slate-900 to-slate-950',
                  'border border-indigo-200/10',
                  'hover:shadow-indigo-500/5',
                  'hover:border-indigo-200/20',
                ]
            )}
          >
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <Badge 
                  variant={tip.status === 'pro' ? "destructive" : "secondary"}
                  className={cn(
                    "px-3 py-1 flex items-center gap-1",
                    tip.status === 'pro' 
                      ? "bg-gradient-to-r from-[#ff4d15] to-[#ff6b15] text-white" 
                      : "bg-gradient-to-r from-indigo-400/80 to-indigo-600/80 text-white"
                  )}
                >
                  {tip.status === 'pro' ? (
                    <>
                      <Trophy className="h-3.5 w-3.5" />
                      PRO TIP
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5" />
                      FREE TIP
                    </>
                  )}
                </Badge>
                <div className="flex items-center gap-1 text-white/60 text-sm">
                  <Calendar className="h-3.5 w-3.5" />
                  {tip.date}
                </div>
              </div>
              <CardTitle className="text-xl font-bold text-white mb-3">
                {tip.player1} vs {tip.player2}
              </CardTitle>
              <Badge 
                variant="outline"
                className={cn(
                  "bg-white/5 border-white/10 hover:bg-white/10",
                  tip.status === 'pro' 
                    ? "text-[#ff4d15]" 
                    : "text-indigo-300"
                )}
              >
                {tip.league}
              </Badge>
            </CardHeader>
            
            <CardContent className="relative z-10">
              {tip.status === 'pro' ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-[#ff4d15]/10 to-transparent border border-[#ff4d15]/20">
                    <div className="flex items-center gap-2 text-[#ff4d15] font-medium mb-2">
                      <Lock className="h-4 w-4" />
                      Premium Prediction
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed">
                      Get access to our expert analysis and premium predictions for maximum value.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-indigo-500/5 via-indigo-500/[0.02] to-transparent p-4 rounded-lg border border-indigo-200/10">
                  <p className="text-white/90 font-medium leading-relaxed">{tip.tip}</p>
                </div>
              )}
            </CardContent>

            {tip.status === 'pro' && (
              <CardFooter className="relative z-10 pt-4">
                <Button 
                  onClick={handleUnlockClick}
                  className={cn(
                    "w-full font-medium",
                    "bg-gradient-to-r from-[#ff4d15] to-[#ff6b15]",
                    "hover:opacity-90",
                    "text-white shadow-lg shadow-[#ff4d15]/20",
                    "transition-all duration-300",
                    "flex items-center gap-2"
                  )}
                >
                  <Lock className="h-4 w-4" />
                  Unlock Premium Tips for $20
                </Button>
              </CardFooter>
            )}
          </Card>
        </motion.div>
      ))}
    </div>
  );
} 