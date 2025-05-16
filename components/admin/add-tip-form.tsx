"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useToast } from "@/components/ui/use-toast"

interface AddTipFormProps {
  onAddTip: (newTip: any) => void;
}

const formSchema = z.object({
  player1: z.string().min(2, { message: "Player 1 name is required" }),
  player2: z.string().min(2, { message: "Player 2 name is required" }),
  league: z.string({
    required_error: "Please select a league",
  }),
  whoToWin: z.string({
    required_error: "Please select a winner",
  }),
  isPro: z.boolean().default(false),
})

export function AddTipForm({ onAddTip }: AddTipFormProps) {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isPro: false,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const winner = values.whoToWin === 'player1' ? values.player1 : values.player2;
      const newTip = {
        player1: values.player1,
        player2: values.player2,
        league: values.league,
        tip: `${winner} to win`,
        status: values.isPro ? 'pro' : 'free',
        date: new Date().toISOString().split('T')[0],
      };

      console.log('Submitting tip:', newTip);

      const response = await fetch('/api/tips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTip),
      });

      if (!response.ok) {
        throw new Error('Failed to create tip');
      }

      const createdTip = await response.json();
      console.log('Created tip:', createdTip);
      
      onAddTip(createdTip);
      form.reset();
      
      toast({
        title: "Success",
        description: "Tip has been created successfully",
      });
    } catch (error) {
      console.error('Error creating tip:', error);
      toast({
        title: "Error",
        description: "Failed to create tip. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="player1"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Player 1</FormLabel>
              <FormControl>
                <Input placeholder="Enter player 1 name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="player2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Player 2</FormLabel>
              <FormControl>
                <Input placeholder="Enter player 2 name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="league"
          render={({ field }) => (
            <FormItem>
              <FormLabel>League</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a league" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="tt-cup">TT Cup</SelectItem>
                  <SelectItem value="czech-liga-pro">Czech Liga Pro</SelectItem>
                  <SelectItem value="tt-elite-poland">TT Elite (Poland)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="whoToWin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Who to Win</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select winner" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="player1">{form.getValues().player1}</SelectItem>
                  <SelectItem value="player2">{form.getValues().player2}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isPro"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">PRO Tip</FormLabel>
                <FormDescription>
                  Mark this tip as premium content for PRO subscribers only
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Submit Tip</Button>
      </form>
    </Form>
  )
}

