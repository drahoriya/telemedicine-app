"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function ProfileInfo({ goToNext, onCancel, form, stepSchema }) {
  const handleNext = async () => {
    form.clearErrors();
    const values = form.getValues();
    const result = stepSchema.safeParse(values);
    if (!result.success) {
      result.error.issues.forEach((issue) => {
        form.setError(issue.path[0], { message: issue.message });
      });
      return;
    }
    goToNext();
  };

  const fields = [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "phone", label: "Phone Number", type: "tel" },
    { name: "age", label: "Age (18-100)", type: "number" },
    { name: "address", label: "Address", type: "text", colSpan: 2 },
    { name: "city", label: "City", type: "text" },
    { name: "zip", label: "PIN Code", type: "text" },
    { name: "weight", label: "Weight (kg) - Optional", type: "text" },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        {fields.map(({ name, label, type, colSpan }) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem className={colSpan === 2 ? "col-span-2" : ""}>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <Input
                    type={type}
                    {...field}
                    className="focus-visible:ring-primary-500"
                    onChange={
                      name === "age"
                        ? (e) => field.onChange(Number(e.target.value))
                        : field.onChange
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>

      <div className="flex gap-3 justify-end mt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" onClick={handleNext}>
          Continue
        </Button>
      </div>
    </div>
  );
}

export default ProfileInfo;