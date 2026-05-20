"use client";

import { motion } from "framer-motion";
import { UserPlus, Search, Calendar, Video } from "lucide-react";
import PublicNavbar from "@/components/navbar/PublicNavbar";
import Footer from "@/components/home/Footer";
import ScrollToTop from "@/components/home/ScrollToTop";
import FadeInOnScroll from "@/components/home/FadeInOnScroll";

const steps = [
  { icon: UserPlus, title: "Create Account", description: "Register as a patient or doctor in just a few minutes." },
  { icon: Search, title: "Find a Doctor", description: "Browse our network of qualified specialists by specialty or hospital." },
  { icon: Calendar, title: "Book Appointment", description: "Select your preferred date and time and confirm your consultation." },
  { icon: Video, title: "Start Consultation", description: "Connect via secure video call with your doctor at the scheduled time." },
];

export default function HowItWorksPage() {
  return (
    <div>
      <PublicNavbar />
      <div className="pt-20">
        <div className="bg-gradient-to-br from-primary-500 to-primary-700 py-20 px-8 text-white text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold mb-4">How It Works</motion.h1>
          <p className="text-primary-100 max-w-2xl mx-auto">Getting started is easy. Follow these simple steps to access quality healthcare online.</p>
        </div>
        <div className="max-w-5xl mx-auto px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <FadeInOnScroll key={i} direction="up" delay={i * 0.15}>
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary-500" />
                    </div>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-500 text-white font-bold text-sm">
                      {i + 1}
                    </div>
                    <h3 className="font-semibold text-lg">{step.title}</h3>
                    <p className="text-gray-500 text-sm">{step.description}</p>
                  </div>
                </FadeInOnScroll>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
