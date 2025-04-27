import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  className?: string
  placeholder?: string
}

export function DatePicker({ date, setDate, className, placeholder = "Pick a date" }: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  
  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      setOpen(false)
    }
  }

  // Get current date to disable past dates
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full h-[44px] border border-[var(--borderGray)]/50 rounded-md p-2 outline-none text-[14px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          disabled={{ before: today }}
          initialFocus
          className="bg-white"
        />
      </PopoverContent>
    </Popover>
  )
} 