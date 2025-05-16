"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
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
import { AddTipForm } from "./add-tip-form"
import { Pencil, Trash2, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"

export function TipsManagement() {
  const [tips, setTips] = useState([])
  const [isAddTipOpen, setIsAddTipOpen] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchTips()
  }, [])

  const fetchTips = async () => {
    try {
      const response = await fetch('/api/tips')
      if (!response.ok) {
        throw new Error('Failed to fetch tips')
      }
      const data = await response.json()
      setTips(data)
    } catch (error) {
      console.error('Error fetching tips:', error)
      toast({
        title: "Error",
        description: "Failed to fetch tips",
        variant: "destructive",
      })
    }
  }

  const handleStatusChange = async (id: string) => {
    try {
      const tipToUpdate = tips.find(tip => tip._id === id);
      const newStatus = tipToUpdate.status === 'pro' ? 'free' : 'pro';
      
      const response = await fetch(`/api/tips/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update tip status');
      }

      await fetchTips();
      toast({
        title: "Success",
        description: "Tip status updated successfully",
      });
    } catch (error) {
      console.error('Error updating tip status:', error);
      toast({
        title: "Error",
        description: "Failed to update tip status",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (id: number) => {
    // Implement edit functionality
    console.log(`Editing tip with id: ${id}`);
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/tips/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete tip');
      }

      await fetchTips();
      toast({
        title: "Success",
        description: "Tip deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting tip:', error);
      toast({
        title: "Error",
        description: "Failed to delete tip",
        variant: "destructive",
      });
    }
  };

  const addTip = (newTip: any) => {
    const updatedTips = [...tips, { ...newTip, id: Date.now(), tournament: newTip.league }]
    setTips(updatedTips)
    localStorage.setItem('tips', JSON.stringify(updatedTips))
    setIsAddTipOpen(false)
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">Tips Management</CardTitle>
        <Dialog open={isAddTipOpen} onOpenChange={setIsAddTipOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600">
              <Plus className="mr-2 h-4 w-4" /> Add New Tip
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Tip</DialogTitle>
            </DialogHeader>
            <AddTipForm onAddTip={addTip} />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Match</TableHead>
                <TableHead>League</TableHead>
                <TableHead>Tip</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tips.map((tip) => (
                <TableRow key={tip.id}>
                  <TableCell className="font-medium">{tip.player1} vs {tip.player2}</TableCell>
                  <TableCell>{tip.tournament}</TableCell>
                  <TableCell>{tip.status === 'pro' ? 'Paid' : tip.tip}</TableCell>
                  <TableCell>{tip.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={tip.status === 'pro' ? "destructive" : "secondary"}
                      className={tip.status === 'pro' ? "bg-[#ff4d15] hover:bg-[#ff4d15]/80" : "bg-green-500 hover:bg-green-600"}
                    >
                      {tip.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Switch
                        checked={tip.status === 'pro'}
                        onCheckedChange={() => handleStatusChange(tip._id)}
                      />
                      <Button variant="outline" size="icon" onClick={() => handleEdit(tip.id)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => handleDelete(tip._id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

