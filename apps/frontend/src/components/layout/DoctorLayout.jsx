"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import Spinner from "@/components/Spinner";
import DoctorHeader from "@/components/header/DoctorHeader";
import ConsultationAlert from "./ConsultationAlert";

export function DoctorLayout({ children }) {
  const user = useSelector((state) => state.userReducer.user);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (!authUser) {
        router.push("/auth/login");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!loading && user && user.role !== "doctor") {
      router.push("/auth/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-screen-2xl mx-auto">
      <ConsultationAlert />
      <DoctorHeader />
      {children}
    </div>
  );
}
