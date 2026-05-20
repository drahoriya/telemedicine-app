"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { logout } from "@/reducers/userReducer";
import { getPatientConsultations } from "@/services/consultationService";
import { findJoinableConsultation } from "@/utils/consultationJoinable";
import { useToast } from "@/hooks";
import HeaderButton from "./HeaderButton";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { LogOut, Bot } from "lucide-react";

export default function PatientHeader() {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();

  const { data: consultations } = useQuery({
    queryKey: ["patient", "consultationsHeader", user?._id],
    queryFn: async () => {
      const res = await getPatientConsultations(user?._id);
      return res.data || [];
    },
    enabled: !!user?._id,
    refetchInterval: 30000,
  });

  const joinableConsultation = findJoinableConsultation(consultations || []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      router.push("/auth/login");
    } catch (err) {
      toast("Logout failed", "error");
    }
  };

  return (
    <header className="border-b bg-white px-6 py-3">
      <div className="flex items-center justify-between">
        <Logo className="w-[140px]" />
        <nav className="flex items-center gap-2">
          <HeaderButton pathname="/patient/home">Home</HeaderButton>
          <HeaderButton pathname="/patient/consultations">Consultations</HeaderButton>
          <HeaderButton pathname="/patient/doctors">Doctors</HeaderButton>
          <Button
            variant="outline"
            size="sm"
            className="text-primary-500 border-primary-500"
            onClick={() => router.push("/patient/AI")}
          >
            <Bot className="h-4 w-4 mr-1" />
            AI Consultation
          </Button>
          {joinableConsultation && (
            <Button
              size="sm"
              className="bg-primary-500 text-white hover:bg-primary-600"
              onClick={() =>
                router.push(`/${joinableConsultation._id}`)
              }
            >
              Join
            </Button>
          )}
        </nav>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
