"use client";

import { motion } from "framer-motion";
import { Stethoscope, Microscope, Activity, Heart, Brain, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import PublicNavbar from "@/components/navbar/PublicNavbar";
import Footer from "@/components/home/Footer";
import ScrollToTop from "@/components/home/ScrollToTop";
import FadeInOnScroll from "@/components/home/FadeInOnScroll";

const services = [
  { icon: Stethoscope, title: "Primary Care", description: "Comprehensive primary healthcare services delivered virtually with personalized attention.", color: "text-blue-500" },
  { icon: Microscope, title: "Diagnostics", description: "Advanced diagnostic capabilities and test result analysis to help you understand your health.", color: "text-green-500" },
  { icon: Activity, title: "Advanced Diagnostics", description: "Cutting-edge diagnostic tools and continuous health monitoring for proactive care.", color: "text-purple-500" },
  { icon: Heart, title: "Cardiology", description: "Remote cardiac monitoring and ECG consultations with qualified cardiologists.", color: "text-red-500" },
  { icon: Brain, title: "Mental Health", description: "Professional mental health support through secure video consultations.", color: "text-indigo-500" },
  { icon: Shield, title: "Preventive Care", description: "Screenings, vaccinations, and health education to keep you at your best.", color: "text-teal-500" },
];

export default function ServicesPage() {
  return (
    <div>
      <PublicNavbar />
      <div className="pt-20">
        <div className="bg-gradient-to-br from-primary-500 to-primary-700 py-20 px-8 text-white text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold mb-4">Our Services</motion.h1>
          <p className="text-primary-100 max-w-2xl mx-auto">Comprehensive healthcare services available from the comfort of your home.</p>
        </div>
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <FadeInOnScroll key={i} direction="up" delay={i * 0.1}>
                  <motion.div whileHover={{ y: -8 }} className="h-full">
                    <Card className="h-full hover:shadow-xl transition-all">
                      <CardHeader>
                        <Icon className={`h-8 w-8 ${svc.color}`} />
                        <CardTitle className="text-xl mt-2">{svc.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">{svc.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </motion.div>
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
