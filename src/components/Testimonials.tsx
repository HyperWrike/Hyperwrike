"use client";
import { TestimonialsColumn } from "./ui/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "Hyperwrike's AI voice agent caught 42 after-hours calls in the first month. Before, those went straight to voicemail and competitors. ROI was obvious by week 2.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop",
    name: "Briana Patton",
    role: "Owner, Patton HVAC · Austin, TX",
  },
  {
    text: "We were losing thousands to no-shows. Their automated reminder flow cut our dental clinic no-show rate by more than half in 60 days. Setup was effortless.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop",
    name: "Dr. Bilal Ahmed",
    role: "Clinic Director · Family Dental Group",
  },
  {
    text: "The Hyperwrike team built us a custom lead-routing system in three weeks. Our inbound response time dropped from hours to under 90 seconds.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop",
    name: "Saman Malik",
    role: "Head of Operations · Roofing Co.",
  },
  {
    text: "Finally an agency in Chennai that actually ships. Onboarding was clean, handover was complete, and we own the entire codebase. No vendor lock-in.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop",
    name: "Omar Raza",
    role: "CEO · B2B SaaS",
  },
  {
    text: "Our plumbing dispatch runs 24/7 now without a night staff. Hyperwrike's AI qualifies the emergency, pulls the right plumber, and books the job.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&h=150&auto=format&fit=crop",
    name: "Zainab Hussain",
    role: "Ops Manager · Home Services",
  },
  {
    text: "Hyperwrike automated our entire onboarding and invoicing flow. We estimate we got ~12 hours per week of admin time back across the team.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&h=150&auto=format&fit=crop",
    name: "Aliza Khan",
    role: "Business Analyst",
  },
  {
    text: "Car rental bookings through the AI voice agent now outperform our website conversions. It handles upsells and damage waivers better than our reps.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&h=150&auto=format&fit=crop",
    name: "Farhan Siddiqui",
    role: "Director · Car Rental Fleet",
  },
  {
    text: "I've hired three agencies before Hyperwrike. They're the only one who understood service-business operations and built something our team actually uses.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&h=150&auto=format&fit=crop",
    name: "Sana Sheikh",
    role: "Sales Manager · HVAC",
  },
  {
    text: "From first call to live automation was 18 days. Our booked jobs went up 38% and we haven't missed a lead after-hours since. Worth every dollar.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&h=150&auto=format&fit=crop",
    name: "Hassan Ali",
    role: "Owner · Roofing Contractor",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const Testimonials = () => {
  return (
    <section id="trust" className="bg-white py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[640px] mx-auto mb-20"
        >
          <div className="flex justify-center">
            <div className="border border-gray-200 py-1 px-4 rounded-full text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50">
              Client Results
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-serif tracking-tight text-center mt-8 text-gray-900">
            Real Results from Real Businesses
          </h2>
          <p className="text-center mt-6 text-lg text-[#6F6F6F] leading-relaxed">
            HVAC, dental, roofing, plumbing and car rental companies across the US use Hyperwrike's AI voice agents and workflow automation to capture more leads and cut operating costs.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
