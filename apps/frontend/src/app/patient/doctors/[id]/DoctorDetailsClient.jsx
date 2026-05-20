"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getDoctor } from "@/services/doctorService";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MapPin, Calendar, Award, GraduationCap, Clock, DollarSign } from "lucide-react";

export default function DoctorDetailsPage() {
  const router = useRouter();
  const realId = useMemo(() => {
    if (typeof window === "undefined") return null;
    const parts = window.location.pathname.replace(/\/$/, "").split("/");
    const last = parts[parts.length - 1];
    return last && last !== "placeholder" ? last : null;
  }, []);
  const params = { id: realId };

  const { data: doctor, isPending, isError, error } = useQuery({
    queryKey: ["doctor", params.id],
    queryFn: async () => {
      const res = await getDoctor(params.id);
      return res.data;
    },
  });

  if (isPending) return <div className="flex justify-center mt-10"><LoadingSpinner /></div>;
  if (isError) return <div className="flex justify-center mt-10 text-red-500">Error: {error.message}</div>;

  return (
    <div className="flex gap-8 py-10 px-12">
      <div className="w-[35%] flex flex-col gap-4">
        <img src={doctor?.photo || "/assets/avatar-doctor.jpg"} alt={`Dr. ${doctor?.firstName}`} className="w-full rounded-xl object-cover max-h-[400px]" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            <span className="text-primary-500">Dr.</span> {doctor?.firstName} {doctor?.lastName}
          </h2>
          <p className="text-gray-500 mt-1">{doctor?.specialty}</p>
          <p className="text-gray-600 mt-4">{doctor?.description}</p>
        </div>
        <Button className="w-full mt-2" onClick={() => router.push(`/patient/consultation/${params.id}`)}>
          Book a consultation
        </Button>
      </div>
      <div className="w-[65%] grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6 flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Contact & Credentials</h3>
            {doctor?.phone && <div className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-gray-500" /><span>{doctor.phone}</span></div>}
            {doctor?.certifications?.length > 0 && (
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-sm font-medium"><Award className="h-4 w-4 text-gray-500" /><span>Certifications</span></div>
                <ul className="ml-6 list-disc text-sm text-gray-600">{doctor.certifications.map((c, i) => <li key={i}>{c}</li>)}</ul>
              </div>
            )}
            {doctor?.degrees?.length > 0 && (
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-sm font-medium"><GraduationCap className="h-4 w-4 text-gray-500" /><span>Degrees</span></div>
                <ul className="ml-6 list-disc text-sm text-gray-600">{doctor.degrees.map((d, i) => <li key={i}>{d}</li>)}</ul>
              </div>
            )}
            {doctor?.experience && <div className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4 text-gray-500" /><span>Experience: {doctor.experience}</span></div>}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Practice Info</h3>
            {doctor?.hospital && <div className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-gray-500" /><span>{doctor.hospital}</span></div>}
            {doctor?.schedule?.length > 0 && (
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-sm font-medium"><Calendar className="h-4 w-4 text-gray-500" /><span>Available days</span></div>
                <div className="flex flex-wrap gap-2 ml-6">{doctor.schedule.map((day, i) => <span key={i} className="px-2 py-1 bg-primary-50 text-primary-500 text-xs rounded">{day}</span>)}</div>
              </div>
            )}
            {doctor?.price !== undefined && <div className="flex items-center gap-2 text-sm"><DollarSign className="h-4 w-4 text-gray-500" /><span className="font-semibold">₹{doctor.price} / hour</span></div>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
