"use client";
import React from "react";
import {
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Dribbble,
  Globe,
  Zap
} from "lucide-react";
import { FooterBackgroundGradient } from "./ui/hover-footer";
import { TextHoverEffect } from "./ui/hover-footer";

function HoverFooter({ onLogoClick }: { onLogoClick?: () => void }) {
  // Footer link data — keyword-rich anchor text (Audit Hack #81)
  const footerLinks = [
    {
      title: "Services",
      links: [
        { label: "AI Voice Agent Development", href: "#services" },
        { label: "Workflow Automation", href: "#services" },
        { label: "Custom AI Software", href: "#services" },
        { label: "AI Consulting Chennai", href: "#services" },
      ],
    },
    {
      title: "Industries",
      links: [
        { label: "AI Voice Agent for HVAC", href: "#industries" },
        { label: "AI Voice Agent for Dental", href: "#industries" },
        { label: "AI Voice Agent for Roofing", href: "#industries" },
        { label: "AI Voice Agent for Plumbing", href: "#industries" },
        { label: "AI Voice Agent for Car Rental", href: "#industries" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Why Hyperwrike", href: "#benefits" },
        { label: "Client Results", href: "#trust" },
        { label: "FAQ", href: "#faq" },
        {
          label: "Book Free Call",
          href: "#audit",
          pulse: true,
        },
      ],
    },
  ];

  // Contact info data
  const contactInfo = [
    {
      icon: <Mail size={18} className="text-[#3ca2fa]" />,
      text: "team@hyperwrike.com",
      href: "mailto:team@hyperwrike.com",
    },
    {
      icon: <Phone size={18} className="text-[#3ca2fa]" />,
      text: "Book a Call",
      href: "https://calendar.app.google/WpbBqVNkm1YGfunz5",
    },
  ];

  // Social media icons
  const socialLinks = [
    { icon: <Facebook size={20} />, label: "Facebook", href: "#" },
    { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
    { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
    { icon: <Dribbble size={20} />, label: "Dribbble", href: "#" },
    { icon: <Globe size={20} />, label: "Globe", href: "#" },
  ];

  return (
    <footer className="bg-[#0F0F11] relative h-fit overflow-hidden" itemScope itemType="https://schema.org/Organization">
      <div className="max-w-7xl mx-auto p-8 md:p-14 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-8 lg:gap-10 pb-12">
          {/* Brand section — LLM-citation ready (Audit Hack #94) */}
          <div className="flex flex-col space-y-4 lg:col-span-2">
            <div
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={onLogoClick}
            >
              <span className="text-[#3ca2fa] text-3xl font-extrabold group-hover:rotate-12 transition-transform">
                <Zap className="w-8 h-8 fill-[#3ca2fa]" />
              </span>
              <span className="text-white text-3xl font-bold font-serif" itemProp="name">Hyperwrike</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400" itemProp="description">
              <strong className="text-white">Hyperwrike is an AI automation agency in Chennai, Tamil Nadu</strong> that builds AI voice agents and workflow automation for US small businesses — HVAC, dental, roofing, plumbing, and car rental companies. We help service businesses never miss a lead and cut manual operations by 40–70%.
            </p>
            {/* NAP block for local SEO (Audit Section 6.1) */}
            <div className="text-xs text-gray-500 pt-3 border-t border-white/5 mt-2" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <div className="font-semibold text-gray-400 mb-1">Hyperwrike</div>
              <div><span itemProp="addressLocality">Chennai</span>, <span itemProp="addressRegion">Tamil Nadu</span> <span itemProp="addressCountry">India</span></div>
              <div className="mt-1">Serving United States & India · Remote delivery worldwide</div>
            </div>
          </div>

          {/* Footer link sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-lg font-semibold mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label} className="relative">
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-[#3ca2fa] transition-colors"
                    >
                      {link.label}
                    </a>
                    {link.pulse && (
                      <span className="absolute top-1 right-[-15px] w-2 h-2 rounded-full bg-[#3ca2fa] animate-pulse"></span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact section */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center space-x-3">
                  {item.icon}
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-gray-400 hover:text-[#3ca2fa] transition-colors"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="text-gray-400 hover:text-[#3ca2fa] transition-colors">
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="border-t border-gray-800 my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0 text-gray-400">
          {/* Social icons */}
          <div className="flex space-x-6 text-gray-400">
            {socialLinks.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="hover:text-[#3ca2fa] transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} Hyperwrike. All rights reserved.
          </p>
        </div>
      </div>

      {/* Text hover effect */}
      <div className="lg:flex hidden h-[30rem] -mt-52 -mb-36">
        <TextHoverEffect text="Hyperwrike" className="z-50" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  );
}

export default HoverFooter;
