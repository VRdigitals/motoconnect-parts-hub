"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Twitter,
  Youtube,
  Linkedin,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Ahmed Al-Farsi",
    title: "Operations Manager, Swift Logistics UAE",
    description:
      "Motoconnect has been our go-to partner for over 5 years. Their commitment to delivering 100% genuine Hero and Minda parts has kept our fleet running with zero downtime. Competitive pricing and unmatched reliability.",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    linkedinUrl: "#",
  },
  {
    name: "Sarah Jenkins",
    title: "Supply Chain Director, MotoHub Global",
    description:
      "The precision in their parts distribution is incredible. We never have to worry about authenticity when sourcing from Motoconnect. Their team understands the urgency of the automotive industry and always delivers.",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    twitterUrl: "#",
  },
  {
    name: "Rajesh Kumar",
    title: "Technical Head, Elite Service Centers",
    description:
      "Engineering excellence isn't just a tagline for them. From Gabriel shock absorbers to NGK spark plugs, the quality is consistently superior. Motoconnect is the #1 distributor for a reason.",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    linkedinUrl: "#",
  },
];

export interface TestimonialCarouselProps {
  className?: string;
}

export function TestimonialCarousel({ className }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () =>
    setCurrentIndex((index) => (index + 1) % testimonials.length);
  const handlePrevious = () =>
    setCurrentIndex(
      (index) => (index - 1 + testimonials.length) % testimonials.length
    );

  const currentTestimonial = testimonials[currentIndex];

  const socialIcons = [
    { icon: Github, url: currentTestimonial.githubUrl, label: "GitHub" },
    { icon: Twitter, url: currentTestimonial.twitterUrl, label: "Twitter" },
    { icon: Youtube, url: currentTestimonial.youtubeUrl, label: "YouTube" },
    { icon: Linkedin, url: currentTestimonial.linkedinUrl, label: "LinkedIn" },
  ].filter(social => social.url);

  return (
    <div className={cn("relative w-full max-w-6xl mx-auto px-4 py-12", className)}>
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#ff0000]/5 rounded-full blur-[120px] -z-10" />

      {/* Desktop layout */}
      <div className="hidden md:grid md:grid-cols-12 gap-8 items-center">
        {/* Avatar */}
        <div className="col-span-5 relative aspect-square">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full rounded-2xl overflow-hidden border-2 border-[#ff0000]/20 relative"
            >
              <img
                src={currentTestimonial.imageUrl}
                alt={currentTestimonial.name}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <Quote className="text-[#ff0000] w-12 h-12 opacity-50" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Card */}
        <div className="col-span-7 pl-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h3 className="font-podium text-4xl italic text-white uppercase tracking-tight">
                  {currentTestimonial.name}
                </h3>
                <p className="font-raleway text-[#ff0000] font-bold text-sm tracking-widest uppercase">
                  {currentTestimonial.title}
                </p>
              </div>

              <p className="font-raleway text-white/80 text-lg leading-relaxed italic border-l-4 border-[#ff0000] pl-6 py-2">
                "{currentTestimonial.description}"
              </p>

              <div className="flex gap-4 pt-4">
                {socialIcons.map(({ icon: IconComponent, url, label }) => (
                  <a
                    key={label}
                    href={url}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-[#ff0000] hover:border-[#ff0000] transition-all"
                    aria-label={label}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden flex flex-col items-center text-center space-y-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-[#ff0000]/20 mb-8 relative">
              <img
                src={currentTestimonial.imageUrl}
                alt={currentTestimonial.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-podium text-3xl italic text-white uppercase tracking-tight">
                {currentTestimonial.name}
              </h3>
              <p className="font-raleway text-[#ff0000] font-bold text-xs tracking-widest uppercase">
                {currentTestimonial.title}
              </p>
              <p className="font-raleway text-white/70 text-base leading-relaxed italic px-4">
                "{currentTestimonial.description}"
              </p>
              
              <div className="flex justify-center gap-4 pt-4">
                {socialIcons.map(({ icon: IconComponent, url, label }) => (
                  <a
                    key={label}
                    href={url}
                    className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60"
                    aria-label={label}
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center md:justify-end gap-6 mt-12">
        <button
          onClick={handlePrevious}
          className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#ff0000] hover:border-[#ff0000] transition-all group"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
        </button>

        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex ? "w-8 bg-[#ff0000]" : "bg-white/20"
              )}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-[#ff0000] hover:border-[#ff0000] transition-all group"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}
