"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";
import { Github, Linkedin, Facebook, Instagram } from "lucide-react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Footer() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // TODO: implement newsletter service
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="invert brightness-0 mb-4">
              <Logo className="w-[140px]" />
            </div>
            <p className="text-gray-400 text-sm">
              Making healthcare accessible to everyone, everywhere.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Get Started", href: "/auth/register" },
                { label: "Sign In", href: "/auth/login" },
              ].map((link) => (
                <li key={link.href}>
                  <motion.button
                    whileHover={{ x: 4 }}
                    onClick={() => router.push(link.href)}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <address className="not-italic text-gray-400 text-sm space-y-1">
              <p>Tunisia, Tunis</p>
              <a href="tel:+21600000000" className="hover:text-white block">+216 00 000 000</a>
              <a href="mailto:contact@telemedecine.tn" className="hover:text-white block">contact@telemedecine.tn</a>
            </address>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button type="submit" size="sm" className="bg-primary-500 hover:bg-primary-600">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Telemedecine. All rights reserved.
          </p>
          <div className="flex gap-4">
            {[
              { Icon: Github, href: "https://github.com/aminezouari52" },
              { Icon: Linkedin, href: "https://linkedin.com" },
              { Icon: Facebook, href: "#" },
              { Icon: Instagram, href: "#" },
            ].map(({ Icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 hover:text-white"
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
