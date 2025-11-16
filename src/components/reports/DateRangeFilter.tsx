import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format, startOfMonth, endOfMonth, startOfYear, endOfYear, subMonths } from "date-fns";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

export const DateRangeFilter = () => {
  const [date, setDate] = useState<DateRange | undefined>(() => {
    const now = new Date();
    return {
      from: startOfMonth(now),
      to: endOfMonth(now),
    };
  });

  // Preset functions
  const setThisMonth = () => {
    const now = new Date();
    setDate({
      from: startOfMonth(now),
      to: endOfMonth(now),
    });
  };

  const setLastMonth = () => {
    const lastMonth = subMonths(new Date(), 1);
    setDate({
      from: startOfMonth(lastMonth),
      to: endOfMonth(lastMonth),
    });
  };

  const setThisYear = () => {
    const now = new Date();
    setDate({
      from: startOfYear(now),
      to: endOfYear(now),
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full sm:w-auto justify-start text-left font-normal text-xs sm:text-sm",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
          <span className="truncate">
            {date?.from ? (
              date.to ? (
                <>
                  <span className="hidden sm:inline">{format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}</span>
                  <span className="sm:hidden">{format(date.from, "MMM dd")} - {format(date.to, "MMM dd")}</span>
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex flex-col">
          {/* Quick Presets */}
          <div className="flex gap-2 p-3 border-b border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={setThisMonth}
              className="flex-1 text-xs"
            >
              This Month
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={setLastMonth}
              className="flex-1 text-xs"
            >
              Last Month
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={setThisYear}
              className="flex-1 text-xs"
            >
              This Year
            </Button>
          </div>
          {/* Calendar */}
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
            className={cn("p-3 pointer-events-auto")}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
