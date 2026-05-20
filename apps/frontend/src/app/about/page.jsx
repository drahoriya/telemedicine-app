"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, Heart, Globe, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PublicNavbar from "@/components/navbar/PublicNavbar";
import Footer from "@/components/home/Footer";
import ScrollToTop from "@/components/home/ScrollToTop";
import FadeInOnScroll from "@/components/home/FadeInOnScroll";

const values = [
  { icon: Heart, title: "Patient-Centered Care", description: "Every decision is made with our patients' well-being at the forefront." },
  { icon: Award, title: "Excellence", description: "We hold ourselves to the highest standards of medical care and service." },
  { icon: Globe, title: "Accessibility", description: "Quality healthcare should be available to everyone, regardless of location." },
  { icon: Shield, title: "Trust & Security", description: "Your health data is protected with enterprise-grade security." },
];

export default function AboutPage() {
  const router = useRouter();
  return (
    <div>
      <PublicNavbar />
      <div className="pt-20">
        <div className="bg-gradient-to-br from-primary-500 to-primary-700 py-20 px-8 text-white text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold mb-4">About Us</motion.h1>
          <p className="text-primary-100 max-w-2xl mx-auto">Revolutionizing healthcare by making quality medical services accessible, convenient, and affordable.</p>
        </div>
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <FadeInOnScroll direction="left">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                We believe everyone deserves access to quality healthcare. Our platform connects patients with qualified medical professionals through secure video consultations, breaking down geographical barriers and making healthcare truly accessible.
              </p>
            </FadeInOnScroll>
            <FadeInOnScroll direction="right">
              <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
              <ul className="space-y-2 text-gray-600">
                {["24/7 access to healthcare professionals", "HIPAA-compliant secure platform", "Multiple medical specialties available", "Transparent pricing, no hidden fees", "User-friendly interface"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2"><span className="w-2 h-2 bg-primary-500 rounded-full" />{item}</li>
                ))}
              </ul>
            </FadeInOnScroll>
          </div>
          <FadeInOnScroll direction="up">
            <h2 className="text-3xl font-bold text-center mb-8">Our Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <FadeInOnScroll key={i} direction="up" delay={i * 0.1}>
                    <Card className="text-center hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <Icon className="h-8 w-8 text-primary-500 mx-auto mb-3" />
                        <h3 className="font-semibold mb-2">{v.title}</h3>
                        <p className="text-gray-500 text-sm">{v.description}</p>
                      </CardContent>
                    </Card>
                  </FadeInOnScroll>
                );
              })}
            </div>
          </FadeInOnScroll>
        </div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
