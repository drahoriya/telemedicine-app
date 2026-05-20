"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import FadeInOnScroll from "./FadeInOnScroll";

const faqs = [
  {
    question: "How do I register on the platform?",
    answer: "Simply click Register, choose your role (Patient or Doctor), enter your email and password, and verify your email. You can start booking consultations right away.",
  },
  {
    question: "Is the platform free to use?",
    answer: "Registration is free. Consultations are priced per doctor at their hourly rate, which is displayed on each doctor profile.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes. We use industry-standard encryption and comply with healthcare data protection regulations. Your personal and medical information is kept strictly confidential.",
  },
  {
    question: "Can doctors write prescriptions through virtual consultations?",
    answer: "Doctors can provide medical advice and recommendations during virtual consultations. For formal prescriptions, please follow up with your healthcare provider.",
  },
];

function FAQSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInOnScroll direction="up" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">Everything you need to know about our platform.</p>
        </FadeInOnScroll>

        <FadeInOnScroll direction="up" delay={0.2}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border rounded-lg mb-2 px-4 hover:border-primary-300 transition-colors"
              >
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeInOnScroll>
      </div>
    </section>
  );
}

export default FAQSection;
