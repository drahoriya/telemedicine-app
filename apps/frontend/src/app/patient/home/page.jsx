"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Hospital, HandHeart, BriefcaseMedical } from "lucide-react";

export default function PatientHomePage() {
  const router = useRouter();

  return (
    <div className="bg-white min-h-screen">
      <div className="flex items-center justify-between px-12 py-10 gap-8">
        <div className="flex flex-col gap-6 max-w-lg">
          <h1 className="text-4xl font-bold leading-tight">
            Our doctors and therapists are here, 24/7
          </h1>
          <p className="text-gray-500">
            Connect with qualified medical professionals from the comfort of
            your home. Get expert advice, diagnosis, and treatment plans online.
          </p>
          <Button
            className="w-fit"
            onClick={() => router.push("/patient/doctors")}
          >
            Book a consultation!
          </Button>
        </div>
        <div className="w-[400px] h-[300px] relative rounded-xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800"
            alt="Doctor consultation"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex gap-6 px-12 pb-10">
        <Card className="flex-1">
          <CardContent className="flex flex-col gap-4 p-6">
            <Hospital className="h-8 w-8 text-primary-500" />
            <h3 className="font-semibold text-lg">Find a doctor</h3>
            <p className="text-gray-500 text-sm">
              Browse through the best specialists and find the right doctor for
              your needs.
            </p>
            <Button
              variant="link"
              className="p-0 w-fit text-primary-500"
              onClick={() => router.push("/patient/doctors")}
            >
              Find now
            </Button>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardContent className="flex flex-col gap-4 p-6">
            <HandHeart className="h-8 w-8 text-primary-500" />
            <h3 className="font-semibold text-lg">Book a consultation</h3>
            <p className="text-gray-500 text-sm">
              Schedule a virtual appointment with a specialist quickly and easily.
            </p>
            <Button
              variant="link"
              className="p-0 w-fit text-primary-500"
              onClick={() => router.push("/patient/doctors")}
            >
              Book now
            </Button>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardContent className="flex flex-col gap-4 p-6">
            <BriefcaseMedical className="h-8 w-8 text-primary-500" />
            <h3 className="font-semibold text-lg">See my Consultations</h3>
            <p className="text-gray-500 text-sm">
              View your upcoming and past consultation history in one place.
            </p>
            <Button
              variant="link"
              className="p-0 w-fit text-primary-500"
              onClick={() => router.push("/patient/consultations")}
            >
              View now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
