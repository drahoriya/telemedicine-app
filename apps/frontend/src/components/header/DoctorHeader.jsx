"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { logout } from "@/reducers/userReducer";
import { getDoctorConsultations } from "@/services/consultationService";
import { findJoinableConsultation } from "@/utils/consultationJoinable";
import { useToast } from "@/hooks";
import HeaderButton from "./HeaderButton";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import { LogOut } from "lucide-react";

export default function DoctorHeader() {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();

  const { data: consultations } = useQuery({
    queryKey: ["doctor", "consultationsHeader", user?._id],
    queryFn: async () => {
      const res = await getDoctorConsultations(user?._id);
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
          <HeaderButton pathname="/doctor/home">Home</HeaderButton>
          <HeaderButton pathname="/doctor/consultations">Consultations</HeaderButton>
          <HeaderButton pathname="/doctor/patients">Patients</HeaderButton>
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
        <div className="flex items-center gap-3">
          <Avatar
            className="h-8 w-8 cursor-pointer"
            onClick={() => router.push("/doctor/profile")}
          >
            <AvatarImage src={user?.photo || "/assets/avatar-doctor.jpg"} />
            <AvatarFallback>DR</AvatarFallback>
          </Avatar>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
