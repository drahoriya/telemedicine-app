"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Research", href: "/research" },
  { label: "About", href: "/about" },
];

export default function PublicNavbar({ transparent = false }) {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isTransparent = transparent && !scrolled;

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300",
        isTransparent
          ? "bg-transparent"
          : "bg-white/95 backdrop-blur-sm border-b shadow-sm",
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className={isTransparent ? "invert brightness-0" : ""}>
          <Logo className="w-[140px]" />
        </div>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <motion.button
              key={link.href}
              whileHover={{ y: -2 }}
              onClick={() => router.push(link.href)}
              className={cn(
                "text-sm font-medium transition-colors",
                isTransparent
                  ? "text-white hover:text-primary-200"
                  : pathname === link.href
                  ? "text-primary-500"
                  : "text-gray-700 hover:text-primary-500",
              )}
            >
              {link.label}
            </motion.button>
          ))}
        </div>

        <Button
          size="sm"
          className={
            isTransparent
              ? "border border-white text-white bg-transparent hover:bg-white hover:text-gray-900"
              : "bg-primary-500 text-white hover:bg-primary-600"
          }
          onClick={() => router.push("/auth/login")}
        >
          Sign In
        </Button>
      </div>
    </motion.nav>
  );
}
