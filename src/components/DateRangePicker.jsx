"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
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

const DateRangePicker = ({ className }) => {
  const [date, setDate] = React.useState({
    from: new Date(2024, 0, 20),
    to: addDays(new Date(2024, 0, 20), 20),
  });
  //   const [date, setDate] =
  //   (React.useState < DateRange) |(undefined >
  //       {
  //         from: new Date(2024, 0, 20),
  //         to: addDays(new Date(2024, 0, 20), 20),
  //       });

  const presets = [
    {
      label: "Today",
      dates: {
        from: new Date(),
        to: new Date(),
      },
    },
    {
      label: "Yesterday",
      dates: {
        from: addDays(new Date(), -1),
        to: addDays(new Date(), -1),
      },
    },
    {
      label: "Last 7 days",
      dates: {
        from: addDays(new Date(), -6),
        to: new Date(),
      },
    },
    {
      label: "Last 30 days",
      dates: {
        from: addDays(new Date(), -29),
        to: new Date(),
      },
    },
    {
      label: "This month",
      dates: {
        from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        to: new Date(),
      },
    },
    {
      label: "Last month",
      dates: {
        from: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
        to: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
      },
    },
  ];

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0 flex' align='start'>
          <Select
            onValueChange={(value) =>
              setDate(presets.find((preset) => preset.label === value)?.dates)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select' />
            </SelectTrigger>
            <SelectContent position='popper'>
              {presets.map((preset) => (
                <SelectItem key={preset.label} value={preset.label}>
                  {preset.label}
                </SelectItem>
              ))}
              <SelectItem value='custom'>Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <div className='border-t border-border'>
            <Calendar
              initialFocus
              mode='range'
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />

            <div className='flex items-center justify-between p-4 border-t border-border'>
              <Button variant='ghost' onClick={() => setDate(undefined)}>
                Cancel
              </Button>
              <Button onClick={() => console.log(date)}>Apply</Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateRangePicker;
