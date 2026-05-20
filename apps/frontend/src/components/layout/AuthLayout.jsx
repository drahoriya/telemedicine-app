"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Spinner from "@/components/Spinner";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HelpCircle } from "lucide-react";

const roleRedirects = {
  doctor: "/doctor/home",
  patient: "/patient/home",
};

export function AuthLayout({ children }) {
  const user = useSelector((state) => state.userReducer.user);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.token && user?.role) {
      const redirect = roleRedirects[user.role];
      if (redirect) {
        router.replace(redirect);
        return;
      }
    }
    setLoading(false);
  }, [user, router]);

  if (loading && user?.token) {
    return <Spinner />;
  }

  return (
    <div className="flex h-screen relative">
      {/* Left side - content */}
      <div className="w-1/2 flex items-center justify-center">
        {children}
      </div>

      {/* Right side - background image */}
      <div className="w-[70%] relative hidden md:block">
        <Image
          src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200"
          alt="Healthcare background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Demo credentials popover */}
      <div className="absolute top-4 right-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <HelpCircle className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <p className="text-sm font-medium mb-2">
              For testing purposes you can login with these credentials:
            </p>
            <div className="text-xs space-y-2">
              <div>
                <p className="font-medium">Doctor:</p>
                <p>freddie24@yahoo.com</p>
                <p>Password: (use your test password)</p>
              </div>
              <div>
                <p className="font-medium">Patient:</p>
                <p>christop_hagenes21@gmail.com</p>
                <p>Password: (use your test password)</p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
