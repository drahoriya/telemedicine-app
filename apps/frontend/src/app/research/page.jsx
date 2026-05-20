"use client";

import { motion } from "framer-motion";
import { Microscope, BarChart2, Users, FlaskConical } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PublicNavbar from "@/components/navbar/PublicNavbar";
import Footer from "@/components/home/Footer";
import ScrollToTop from "@/components/home/ScrollToTop";
import FadeInOnScroll from "@/components/home/FadeInOnScroll";
import AnimatedCounter from "@/components/home/AnimatedCounter";
import ChartAnimation from "@/components/home/ChartAnimation";

const chartData = [85, 70, 65, 50, 60, 45, 55, 40, 50, 35];
const areas = [
  { icon: Microscope, title: "Telemedicine Effectiveness", description: "Analyzing outcomes of virtual vs. in-person consultations across specialties." },
  { icon: BarChart2, title: "Health Data Analytics", description: "Leveraging aggregated data to identify trends and improve care quality." },
  { icon: Users, title: "Patient Engagement", description: "Studying how digital platforms improve patient adherence and outcomes." },
  { icon: FlaskConical, title: "Clinical Trials", description: "Supporting remote participation in clinical research studies." },
];

export default function ResearchPage() {
  return (
    <div>
      <PublicNavbar />
      <div className="pt-20">
        <div className="bg-gradient-to-br from-primary-500 to-primary-700 py-20 px-8 text-white text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold mb-4">Research & Innovation</motion.h1>
          <p className="text-primary-100 max-w-2xl mx-auto">Advancing healthcare through evidence-based research and cutting-edge technology.</p>
        </div>
        <div className="max-w-7xl mx-auto px-8 py-16">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { label: "Patient Satisfaction", value: 99.9, decimals: 1, suffix: "%" },
              { label: "Reduction in Readmissions", value: 35, suffix: "%" },
              { label: "Research Publications", value: 50, prefix: "50+" },
            ].map((stat, i) => (
              <FadeInOnScroll key={i} direction="up" delay={i * 0.1}>
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-500 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-primary-500 mt-2">
                      {stat.prefix || <AnimatedCounter value={stat.value} decimals={stat.decimals || 0} suffix={stat.suffix} />}
                    </p>
                  </CardContent>
                </Card>
              </FadeInOnScroll>
            ))}
          </div>

          <FadeInOnScroll direction="up" className="mb-12">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Patient Activity Trends</h3>
                <ChartAnimation data={chartData} width={600} height={120} className="w-full" />
              </CardContent>
            </Card>
          </FadeInOnScroll>

          <h2 className="text-2xl font-bold mb-6">Research Areas</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {areas.map((area, i) => {
              const Icon = area.icon;
              return (
                <FadeInOnScroll key={i} direction="up" delay={i * 0.1}>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 flex gap-4">
                      <Icon className="h-8 w-8 text-primary-500 shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">{area.title}</h3>
                        <p className="text-gray-500 text-sm">{area.description}</p>
                      </div>
                    </CardContent>
                  </Card>
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
