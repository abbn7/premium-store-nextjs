'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Instagram,
  Facebook,
  Twitter,
  MessageCircle,
  Send,
  MapPin,
  Phone,
  Mail,
  Heart,
  ExternalLink,
} from 'lucide-react';
import { AdminLoginModal } from '@/components/admin/AdminLoginModal';

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/products' },
    { name: 'New Arrivals', href: '/products?sort=newest' },
    { name: 'Best Sellers', href: '/products?sort=popular' },
    { name: 'Sale', href: '/products?sale=true' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ],
};

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'TikTok', icon: ExternalLink, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'WhatsApp', icon: MessageCircle, href: 'https://wa.me/message/64L5CHSAIA2DA1' },
];

export function Footer() {
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  return (
    <>
      <footer className="bg-primary dark:bg-surface-dark border-t border-border-light dark:border-border-dark pb-20 lg:pb-0">
        {/* Main Footer */}
        <div className="container-custom py-16">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block mb-4">
                <span className="font-display text-2xl font-black text-white">
                  STORE
                </span>
              </Link>
              <p className="text-sm text-white/60 mb-6 leading-relaxed max-w-xs">
                Premium curated products for those who demand excellence. Quality,
                style, and sophistication in every detail.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 hover:bg-accent hover:text-white transition-all duration-300"
                      aria-label={social.name}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">
                Shop
              </h3>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">
                Contact
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-white/40 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-white/60">support@store.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-white/40 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-white/60">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-white/40 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-white/60">
                    New York, NY 10001
                  </span>
                </li>
              </ul>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/message/64L5CHSAIA2DA1"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-xs font-semibold text-white hover:bg-[#20BA5C] transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container-custom flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Store. All rights reserved.
            </p>

            <div className="flex items-center gap-2 text-xs text-white/40">
              <span>Crafted with</span>
              <Heart className="h-3 w-3 text-accent fill-accent" />
              <span>by</span>
              <a
                href="https://wa.me/message/64L5CHSAIA2DA1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white font-medium transition-colors"
              >
                Abdelhaned Nada
              </a>
              {/* Secret Admin Button */}
              <button
                onClick={() => setAdminModalOpen(true)}
                className="ml-2 h-2 w-2 rounded-full opacity-0 hover:opacity-5 transition-opacity cursor-default"
                aria-hidden="true"
                tabIndex={-1}
              />
            </div>
          </div>
        </div>
      </footer>

      {/* Admin Login Modal */}
      <AdminLoginModal isOpen={adminModalOpen} onClose={() => setAdminModalOpen(false)} />
    </>
  );
}
