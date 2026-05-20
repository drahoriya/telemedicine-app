"use client";

import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { useConsultationStatus } from "@/hooks";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Video, Bell, Calendar } from "lucide-react";

export default function ConsultationAlert() {
  const user = useSelector((state) => state.userReducer.user);
  const router = useRouter();
  const pathname = usePathname();

  const {
    activeConsultation,
    upcomingSoonConsultation,
    isLoading,
    dismissConsultation,
  } = useConsultationStatus(user);

  if (isLoading) return null;

  if (activeConsultation) {
    const consultationPath = `/${activeConsultation._id}`;
    if (pathname === consultationPath) return null;

    return (
      <Alert className="rounded-none border-primary-500 bg-primary-50">
        <Video className="h-4 w-4 text-primary-500" />
        <AlertDescription className="flex items-center justify-between">
          <span>Your consultation is now active!</span>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="bg-primary-500 hover:bg-primary-600 text-white"
              onClick={() => router.push(consultationPath)}
            >
              Join now
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => dismissConsultation(activeConsultation._id)}
            >
              Maybe later
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  if (upcomingSoonConsultation) {
    return (
      <Alert className="rounded-none border-yellow-400 bg-yellow-50">
        <Bell className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Upcoming consultation in less than 15 minutes
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const route =
                  user?.role === "doctor"
                    ? "/doctor/consultations"
                    : "/patient/consultations";
                router.push(route);
              }}
            >
              View details
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() =>
                dismissConsultation(upcomingSoonConsultation._id)
              }
            >
              Dismiss
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}
