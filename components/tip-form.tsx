"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"

interface TipFormProps {
  isAdmin: boolean
}

export function TipForm({ isAdmin }: TipFormProps) {
  const [open, setOpen] = useState(false)
  const form = useForm()

  const onSubmit = (data: any) => {
    console.log(data)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {isAdmin && (
        <DialogTrigger asChild>
          <Button className="bg-[#ff4d15] hover:bg-[#ff4d15]/90">
            Add Tip
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Tip</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="match"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Match</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a match" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="match1">Ma Long v Fan Zhendong</SelectItem>
                      <SelectItem value="match2">Sun Yingsha v Chen Meng</SelectItem>
                      <SelectItem value="match3">Tomokazu Harimoto v Lin Yun-Ju</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Tip</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your analysis and prediction..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-[#ff4d15] hover:bg-[#ff4d15]/90">
              Submit Tip
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

