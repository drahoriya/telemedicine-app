"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import FadeInOnScroll from "./FadeInOnScroll";

const testimonials = [
  {
    name: "Sarah M.",
    comment: "The platform made scheduling a consultation so easy. The doctor was attentive and professional.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
  },
  {
    name: "James K.",
    comment: "I got expert medical advice without leaving home. This service is a game-changer.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
  },
];

function TestimonialsSection() {
  const router = useRouter();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInOnScroll direction="up" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Care that puts you first
          </h2>
        </FadeInOnScroll>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <FadeInOnScroll direction="left">
            <div className="relative rounded-xl overflow-hidden h-64 md:h-auto">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800"
                alt="Happy patient"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white rounded-lg px-3 py-2 shadow">
                <p className="text-sm font-semibold text-primary-500">98% satisfaction rate</p>
              </div>
            </div>
          </FadeInOnScroll>

          <div className="flex flex-col gap-4">
            {testimonials.map((t, i) => (
              <FadeInOnScroll key={i} direction="right" delay={i * 0.1}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, j) => (
                        <motion.div
                          key={j}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + j * 0.05 }}
                        >
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{t.comment}</p>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={t.avatar} />
                        <AvatarFallback>{t.name[0]}</AvatarFallback>
                      </Avatar>
                      <p className="text-sm font-medium">{t.name}</p>
                    </div>
                  </CardContent>
                </Card>
              </FadeInOnScroll>
            ))}
          </div>
        </div>

        <div className="bg-primary-500 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-2">Ready to prioritize your health?</h3>
          <p className="text-primary-100 mb-6">Join thousands of patients who trust our platform.</p>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-primary-500"
            onClick={() => router.push("/auth/register")}
          >
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
