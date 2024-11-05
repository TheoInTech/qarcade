"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface IDateTimePicker {
  className?: string;
  onDateTimeChange?: (timestamp: number | null) => void;
}

export const DateTimePicker = ({
  className,
  onDateTimeChange,
}: IDateTimePicker) => {
  const [date, setDate] = React.useState<Date>();
  const [hours, setHours] = React.useState("00");
  const [minutes, setMinutes] = React.useState("00");
  const [seconds, setSeconds] = React.useState("00");

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
  };

  const handleTimeChange = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setter(value.padStart(2, "0"));
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    const formattedDate = format(date, "PPP");
    return `${formattedDate} ${hours}:${minutes}:${seconds}`;
  };

  const getSelectedDateTime = () => {
    if (!date) return null;
    const newDate = new Date(date);
    newDate.setHours(parseInt(hours));
    newDate.setMinutes(parseInt(minutes));
    newDate.setSeconds(parseInt(seconds));
    newDate.setMilliseconds(0);
    return Math.floor(newDate.getTime() / 1000);
  };

  React.useEffect(() => {
    onDateTimeChange?.(getSelectedDateTime());
  }, [date, hours, minutes, seconds, onDateTimeChange]);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? formatDate(date) : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
          />
          <div className="flex items-center justify-between p-3 border-t">
            <Select
              value={hours}
              onValueChange={(value) => handleTimeChange(value, setHours)}
            >
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="HH" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 24 }, (_, i) => (
                  <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                    {i.toString().padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>:</span>
            <Select
              value={minutes}
              onValueChange={(value) => handleTimeChange(value, setMinutes)}
            >
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="MM" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 60 }, (_, i) => (
                  <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                    {i.toString().padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>:</span>
            <Select
              value={seconds}
              onValueChange={(value) => handleTimeChange(value, setSeconds)}
            >
              <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="SS" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 60 }, (_, i) => (
                  <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                    {i.toString().padStart(2, "0")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
