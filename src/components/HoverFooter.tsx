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
  // Footer link data
  const footerLinks = [
    {
      title: "Services",
      links: [
        { label: "AI Automation", href: "#services" },
        { label: "Custom Software", href: "#services" },
        { label: "Workflow Automation", href: "#services" },
        { label: "AI Consulting", href: "#services" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#benefits" },
        { label: "Journal", href: "#trust" },
        {
          label: "Reach Us",
          href: "#audit",
          pulse: true,
        },
      ],
    },
  ];

  // Contact info data
  const contactInfo = [
    {
      icon: <Mail size={18} className="text-accent" />,
      text: "mounesh@hyperwrike.com",
      href: "mailto:mounesh@hyperwrike.com",
    },
    {
      icon: <Mail size={18} className="text-accent" />,
      text: "periyanan@hyperwrike.com",
      href: "mailto:periyanan@hyperwrike.com",
    },
    {
      icon: <Phone size={18} className="text-accent" />,
      text: "Book a Call",
      href: "https://calendar.app.google/4CYGXdDEzK7Rq9ii8",
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
    <footer className="bg-surface-dark relative h-fit overflow-hidden">
      <div className="max-w-7xl mx-auto p-8 md:p-14 z-40 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Brand section */}
          <div className="flex flex-col space-y-4">
            <button
              aria-label="Hyperwrike – back to top"
              className="flex items-center space-x-2 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface-dark rounded"
              onClick={onLogoClick}
            >
              <span className="text-accent text-3xl font-extrabold group-hover:rotate-12 transition-transform">
                <Zap className="w-8 h-8 fill-accent" />
              </span>
              <span className="text-white text-3xl font-bold font-serif">Hyperwrike</span>
            </button>
            <p className="text-sm leading-relaxed text-gray-400">
              Hyperwrike is a modern AI Automation & Custom Software Agency. We build digital havens for deep work and pure flows.
            </p>
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
                      className="text-gray-400 hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded"
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
                      className="text-gray-400 hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded"
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
                className="hover:text-accent transition-colors focus:outline-none focus:ring-2 focus:ring-accent rounded"
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
