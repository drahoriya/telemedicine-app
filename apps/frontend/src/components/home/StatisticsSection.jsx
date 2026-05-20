"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import AnimatedCounter from "./AnimatedCounter";
import ChartAnimation from "./ChartAnimation";
import FadeInOnScroll from "./FadeInOnScroll";

const chartData = [40, 65, 45, 70, 55, 80, 60, 85, 70, 90];

function StatisticsSection() {
  const router = useRouter();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInOnScroll direction="up" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our platform delivers measurable healthcare improvements backed by real data.
          </p>
        </FadeInOnScroll>

        <div className="grid md:grid-cols-2 gap-6">
          <FadeInOnScroll direction="left">
            <SpotlightCard className="bg-gray-800/50 border-gray-700 p-6">
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold text-white">Patient Activity Trends</h3>
                <ChartAnimation data={chartData} width={400} height={120} className="w-full" />
                <div className="flex gap-6 mt-2">
                  <div>
                    <p className="text-gray-400 text-sm">Satisfaction Rate</p>
                    <p className="text-2xl font-bold text-white">
                      <AnimatedCounter value={99.9} decimals={1} suffix="%" />
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Readmission Reduction</p>
                    <p className="text-2xl font-bold text-white">
                      <AnimatedCounter value={35} suffix="%" />
                    </p>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </FadeInOnScroll>

          <FadeInOnScroll direction="right">
            <div className="flex flex-col gap-4">
              <SpotlightCard className="bg-gray-800/50 border-gray-700 p-6">
                <p className="text-gray-400 text-sm">99.9% patient satisfaction rate</p>
                <p className="text-3xl font-bold text-primary-400 mt-2">
                  <AnimatedCounter value={99.9} decimals={1} suffix="%" />
                </p>
              </SpotlightCard>
              <SpotlightCard className="bg-gray-800/50 border-gray-700 p-6">
                <p className="text-gray-400 text-sm">35% reduction in readmission rates</p>
                <p className="text-3xl font-bold text-primary-400 mt-2">
                  <AnimatedCounter value={35} suffix="% fewer readmissions" />
                </p>
              </SpotlightCard>
              <Button
                variant="outline"
                className="border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white"
                onClick={() => router.push("/research")}
              >
                View Research
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </FadeInOnScroll>
        </div>
      </div>
    </section>
  );
}

export default StatisticsSection;
