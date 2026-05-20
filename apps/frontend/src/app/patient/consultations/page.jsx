"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";

import { getPatientConsultations } from "@/services/consultationService";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, Phone, MapPin } from "lucide-react";

function ConsultationCard({ consultation }) {
  const doctor = consultation?.doctor;
  return (
    <Card>
      <CardContent className="p-4 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              src={doctor?.photo || "/assets/avatar-doctor.jpg"}
              alt="Doctor"
            />
            <AvatarFallback>DR</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold">
              Dr. {doctor?.firstName} {doctor?.lastName}
            </p>
            <p className="text-sm text-gray-500">{doctor?.specialty}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Phone className="h-4 w-4" />
          <span>{doctor?.phone || "—"}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin className="h-4 w-4" />
          <span>{doctor?.hospital || "—"}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span>
            {consultation?.date
              ? DateTime.fromJSDate(new Date(consultation.date)).toFormat(
                  "dd-MM-yyyy 'a' HH:mm",
                )
              : "—"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function AllConsultationsModal({ consultations, isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>All upcoming consultations</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 overflow-y-auto p-4">
          {consultations?.map((c, i) => (
            <ConsultationCard key={i} consultation={c} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function PatientConsultationsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.userReducer.user);

  const {
    data: consultations,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["patientConsultations", user?._id],
    queryFn: async () => {
      const res = await getPatientConsultations(user?._id);
      return (res.data || [])
        .filter((c) => c.status === "pending")
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    enabled: !!user?._id,
  });

  if (isPending) {
    return (
      <div className="flex justify-center mt-10">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center mt-10 text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <>
      <AllConsultationsModal
        consultations={consultations}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div className="flex justify-around py-6 px-12">
        <div className="w-[45%]">
          <div className="flex items-center justify-between py-5">
            <h2 className="text-lg font-semibold">Upcoming Consultations</h2>
            {consultations?.length > 2 && (
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setIsOpen(true)}
              >
                See all
              </Button>
            )}
          </div>
          {!consultations?.length ? (
            <p className="text-gray-500">You have no upcoming consultations.</p>
          ) : (
            <div className="space-y-4">
              {consultations.slice(0, 2).map((c, i) => (
                <ConsultationCard key={i} consultation={c} />
              ))}
            </div>
          )}
        </div>

        {consultations?.length > 0 && (
          <div className="w-[45%]">
            <div className="py-5">
              <h2 className="text-lg font-semibold">Your Profile</h2>
            </div>
            <Card>
              <CardContent className="p-4 flex flex-col gap-3">
                <p className="font-bold">
                  {user?.firstName} {user?.lastName}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span>{user?.address || "—"}</span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Age: {user?.age || "—"}</p>
                  <p>Weight: {user?.weight || "—"} kg</p>
                  <p>Phone: {user?.phone || "—"}</p>
                </div>
                {consultations[0]?.date && (
                  <div className="border-t pt-3 mt-1">
                    <p className="text-sm font-medium">Next appointment:</p>
                    <p className="text-sm text-primary-500">
                      {DateTime.fromJSDate(
                        new Date(consultations[0].date),
                      ).toFormat("dd-MM-yyyy 'a' HH:mm")}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </>
  );
}
