"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useToast, useUserCheck } from "@/hooks";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// FUNCTIONS
import { updateDoctor, uploadProfilePicture } from "@/services/doctorService";
import { getCurrentUser } from "@/services/authService";
import { setUser } from "@/reducers/userReducer";

// COMPONENTS
import ImageUpload from "@/components/ImageUpload";
import TextFormControl from "./TextFormControl";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NumberInput } from "@/components/ui/number-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X } from "lucide-react";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

const doctorProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(50),
  lastName: z.string().min(1, "Last name is required").max(50),
  age: z.number().min(18, "You must be at least 18 years old").max(100),
  phone: z.string().min(1, "Phone number is required").regex(/^[0-9]*$/, "Phone number is not valid"),
  address: z.string().min(1, "Address is required").max(50),
  city: z.string().min(1, "City is required").max(50),
  zip: z.string().min(1, "Postal code is required").regex(/^[0-9]+$/, "Postal code must be a number").min(6, "PIN must be 6 digits").max(6, "PIN must be 6 digits"),
  description: z.string().min(1, "Description is required").max(500),
  hospital: z.enum([
    "Hospital Mongi Slim", "Hospital Charles Nicolle", "Hospital La Rabta",
    "Hospital Razi", "Hospital Sahloul", "Hospital Farhat Hached",
    "Hospital Fattouma Bourguiba", "Hospital Hedi Chaker", "Hospital Habib Bourguiba",
  ], { errorMap: () => ({ message: "Selected hospital is not valid" }) }),
  specialty: z.enum([
    "Generalist", "Cardiologist", "Dermatologist", "Endocrinologist",
    "Gastroenterologist", "Neurologist", "Pediatrician", "Psychiatrist",
  ], { errorMap: () => ({ message: "Selected specialty is not valid" }) }),
  degrees: z.array(z.string()).max(10).optional().default([]),
  certifications: z.array(z.string()).max(10).optional().default([]),
  price: z.number().min(0, "Price cannot be negative").max(1000),
  experience: z.string().optional(),
  schedule: z.array(z.string()).min(1, "Choose at least one day"),
});

const General = ({ setIsLoading }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const user = useSelector((state) => state.userReducer.user);
  const userCheck = useUserCheck();
  const [currentUser, setCurrentUser] = useState();
  const [imageSrc, setImageSrc] = useState();

  const form = useForm({
    resolver: zodResolver(doctorProfileSchema),
    defaultValues: {
      firstName: "", lastName: "", age: 0, phone: "", address: "", city: "",
      zip: "", description: "", hospital: undefined, specialty: undefined,
      degrees: [], certifications: [], price: 0, experience: "Less than a year", schedule: [],
    },
  });

  const { fields: degreeFields, append: appendDegree, remove: removeDegree } = useFieldArray({ control: form.control, name: "degrees" });
  const { fields: certificationFields, append: appendCertification, remove: removeCertification } = useFieldArray({ control: form.control, name: "certifications" });

  const profileImageHandler = (uri) => {
    setIsLoading(true);
    setImageSrc(uri);
    setIsLoading(false);
  };

  useEffect(() => {
    const getUser = async () => {
      userCheck(async (token) => {
        const res = await getCurrentUser(token);
        setCurrentUser(res.data);
      });
    };
    getUser();
  }, [user]);

  useEffect(() => {
    if (currentUser) {
      setImageSrc(currentUser.photo);
      form.reset({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        age: currentUser.age || 0,
        phone: currentUser.phone || "",
        address: currentUser.address || "",
        city: currentUser.city || "",
        zip: currentUser.zip || "",
        description: currentUser.description || "",
        hospital: currentUser.hospital,
        specialty: currentUser.specialty,
        degrees: currentUser.degrees || [],
        certifications: currentUser.certifications || [],
        price: currentUser.price || 0,
        experience: currentUser.experience || "Less than a year",
        schedule: currentUser.schedule || [],
      });
    }
  }, [currentUser]);

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      if (!user) {
        toast("User is not valid", "error");
        return;
      }
      let photoUrl = currentUser?.photo || "";
      // Only upload if it's a new local image (base64 or blob URL, not an existing http URL)
      const isNewLocalImage = imageSrc && !imageSrc.startsWith("http");
      if (isNewLocalImage) {
        const imageResponse = await uploadProfilePicture(user, imageSrc);
        photoUrl = imageResponse.data.url;
      }
      await updateDoctor(
        { id: user._id, token: user.token },
        { ...values, photo: photoUrl, isProfileCompleted: true },
      );
      dispatch(setUser({ ...user, isProfileCompleted: true }));
      toast("Profile saved successfully!", "success");
    } catch (err) {
      toast(err?.response?.data?.message || "Failed to save profile", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form className="flex flex-col gap-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <h2 className="text-lg leading-6 font-semibold">Personal Information</h2>
          <p className="my-2 text-sm text-gray-600">Fill out this form to complete your profile.</p>
        </div>

        <div className="shadow-md rounded-md overflow-hidden bg-white space-y-6 p-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Photo</Label>
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 bg-gray-100">
                <AvatarImage src={imageSrc} />
                <AvatarFallback><User className="h-9 w-9 mt-3 rounded-full text-gray-300" /></AvatarFallback>
              </Avatar>
              <label className="cursor-pointer">
                <ImageUpload onChange={profileImageHandler} />
                <Button type="button" variant="outline" size="sm" asChild>
                  <span>Change</span>
                </Button>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <TextFormControl label="Firstname" autoComplete="given-name" name="firstName" control={form.control} />
            <TextFormControl label="Lastname" autoComplete="family-name" name="lastName" control={form.control} />
          </div>

          <div className="grid grid-cols-6 gap-6">
            <FormField
              control={form.control}
              name="age"
              render={({ field, fieldState }) => (
                <FormItem className="col-span-3 space-y-2">
                  <FormLabel htmlFor="age" className="text-sm font-medium text-gray-700">Age</FormLabel>
                  <FormControl>
                    <NumberInput
                      value={field.value || ""}
                      min={18}
                      max={100}
                      onChange={(value) => field.onChange(+value)}
                      className={cn("text-sm", fieldState.error ? "border-red-300" : "focus-visible:ring-secondary-500")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field, fieldState }) => (
                <FormItem className="col-span-3 space-y-2">
                  <FormLabel className="text-sm font-medium text-gray-700">Phone number</FormLabel>
                  <FormControl>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-gray-50 text-sm text-gray-500">+91</span>
                      <Input type="tel" className="text-sm shadow-sm rounded-l-none rounded-r-md focus-visible:ring-secondary-500" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-3 gap-6">
            <TextFormControl label="Street address" autoComplete="street-address" name="address" control={form.control} />
            <TextFormControl label="City" autoComplete="home city" name="city" control={form.control} />
            <TextFormControl label="PIN Code" autoComplete="postal-code" name="zip" control={form.control} />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-medium text-gray-700">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Brief description of your profile."
                    rows={3}
                    className={cn("text-sm shadow-sm", fieldState.error ? "border-red-300" : "focus-visible:ring-secondary-500")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <hr className="my-5 border-gray-300" />

        <div>
          <h2 className="text-lg leading-6 font-semibold">Professional Information</h2>
          <p className="my-2 text-sm text-gray-600">Provide detailed information about your professional experience.</p>
        </div>

        <div className="shadow-md rounded-md overflow-hidden px-4 py-5 bg-white space-y-6">
          <div className="flex gap-6">
            <FormField
              control={form.control}
              name="hospital"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-1">
                  <FormLabel className="text-sm font-medium text-gray-700 mb-3">Hospital</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="text-sm shadow-sm rounded-md focus:ring-secondary-500">
                        <SelectValue placeholder="Select a hospital..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["Hospital Mongi Slim","Hospital Charles Nicolle","Hospital La Rabta","Hospital Razi","Hospital Sahloul","Hospital Farhat Hached","Hospital Fattouma Bourguiba","Hospital Hedi Chaker","Hospital Habib Bourguiba"].map(h => (
                        <SelectItem key={h} value={h}>{h}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specialty"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-1">
                  <FormLabel className="text-sm font-medium text-gray-700 mb-3">Speciality</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="text-sm shadow-sm rounded-md focus:ring-secondary-500">
                        <SelectValue placeholder="Select specialty..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["Generalist","Cardiologist","Dermatologist","Endocrinologist","Gastroenterologist","Neurologist","Pediatrician","Psychiatrist"].map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <fieldset>
                  <legend className="text-base text-gray-900 mb-3">
                    Experience
                    <p className="text-sm text-gray-500">Number of years of experience</p>
                  </legend>
                  <FormControl>
                    <RadioGroup value={field.value || "Less than a year"} onValueChange={field.onChange} className="space-y-4">
                      {["Less than a year", "1 - 5 years", "+5 years"].map((exp) => (
                        <div key={exp} className="flex items-center space-x-3">
                          <RadioGroupItem value={exp} id={exp} />
                          <Label htmlFor={exp} className="text-sm text-gray-700 cursor-pointer">{exp}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </fieldset>
              </FormItem>
            )}
          />
        </div>

        <hr className="my-5 border-gray-300" />

        <div>
          <h2 className="text-lg leading-6 font-semibold">Schedule & Pricing</h2>
        </div>

        <div className="shadow-md rounded-md overflow-hidden px-4 py-5 bg-white space-y-6">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="grid grid-cols-6 gap-6">
                <div className="col-span-3 space-y-2">
                  <FormLabel className="text-sm font-medium text-gray-700">Price in ₹ / hour</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="price"
                        placeholder="Enter amount"
                        type="number"
                        className="text-sm shadow-sm rounded-md pr-12 focus-visible:ring-secondary-500"
                        min={1}
                        max={1000}
                        {...field}
                        onChange={(e) => field.onChange(+e.target.value)}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 text-sm">₹</span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="schedule"
            render={({ field }) => (
              <FormItem>
                <fieldset>
                  <p className="mb-3 text-base text-gray-900">Schedule</p>
                  <FormControl>
                    <div className="flex flex-wrap gap-y-5 gap-x-20">
                      {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map((day, index) => (
                        <div key={index} className="flex items-start">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`schedule-${day}`}
                              checked={field.value?.includes(day)}
                              onCheckedChange={(checked) => {
                                const current = field.value || [];
                                if (checked) {
                                  field.onChange([...current, day]);
                                } else {
                                  field.onChange(current.filter((d) => d !== day));
                                }
                              }}
                            />
                            <Label htmlFor={`schedule-${day}`} className="text-sm font-medium cursor-pointer">{day}</Label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </fieldset>
              </FormItem>
            )}
          />
        </div>

        <div className="py-3 text-right">
          <Button type="submit" size="sm" className="hover:opacity-80">Save</Button>
        </div>
      </form>
    </Form>
  );
};

export default General;