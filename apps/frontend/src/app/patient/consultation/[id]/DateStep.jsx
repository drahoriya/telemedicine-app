"use client";

import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

function getDateString(date) {
  if (!date) return "";
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getTimeString(date) {
  if (!date) return "";
  const d = new Date(date);
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function DateStep({ goToNext, goToPrevious, form, stepSchema }) {
  const handleNext = async () => {
    const values = form.getValues();
    const result = stepSchema.safeParse({ date: values.date });
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        form.setError(issue.path[0], { message: issue.message });
      });
      return;
    }
    goToNext();
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-md">
      <FormField
        control={form.control}
        name="date"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select Date</FormLabel>
            <FormControl>
              <Input
                type="date"
                value={getDateString(field.value)}
                onChange={(e) => {
                  const existing = field.value || new Date();
                  const [year, month, day] = e.target.value.split("-").map(Number);
                  const updated = new Date(existing);
                  updated.setFullYear(year, month - 1, day);
                  field.onChange(updated);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="date"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select Time</FormLabel>
            <FormControl>
              <Input
                type="time"
                value={getTimeString(field.value)}
                onChange={(e) => {
                  const existing = field.value || new Date();
                  const [hours, minutes] = e.target.value.split(":").map(Number);
                  const updated = new Date(existing);
                  updated.setHours(hours, minutes, 0, 0);
                  field.onChange(updated);
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex gap-3 mt-4">
        <Button type="button" variant="outline" onClick={goToPrevious}>
          Previous
        </Button>
        <Button type="button" onClick={handleNext}>
          Continue
        </Button>
      </div>
    </div>
  );
}

export default DateStep;