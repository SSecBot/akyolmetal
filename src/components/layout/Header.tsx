'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCms } from '@/context/CmsContext';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { data } = useCms();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/about', label: 'Hakkımızda' },
    { href: '/services', label: 'Hizmetlerimiz' },
    { href: '/contact', label: 'İletişim' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Top Banner with License Info */}
      <div className="bg-emerald-50 border-b border-emerald-100 py-1.5 px-4 text-xs text-emerald-800 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center p-0.5 rounded-full bg-emerald-600 text-white">
              <ShieldCheck className="w-3 h-3" />
            </span>
            <span className="font-medium">
              {data.settings.licenseText}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span>Çalışma Saatleri: {data.settings.workingHours}</span>
            <span className="text-emerald-300">|</span>
            <span>Torbalı / İzmir</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-soft-md border-b border-emerald-100 py-3'
            : 'bg-white border-b border-gray-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Local Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none"
              title="Akyol Geri Dönüşüm"
            >
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-emerald-50 border border-emerald-200 p-1 flex items-center justify-center shadow-soft-sm group-hover:scale-105 transition-transform duration-200">
                <img
                  src="/assets/logo.png"
                  alt="Akyol Geri Dönüşüm"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-headline font-bold text-lg sm:text-xl text-gray-900 leading-tight group-hover:text-emerald-600 transition-colors">
                  Akyol
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">
                  Geri Dönüşüm
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'text-emerald-700 bg-emerald-50 font-semibold shadow-sm'
                        : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Trailing Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Phone CTA */}
              <a
                href={`tel:${data.settings.phoneRaw}`}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-sm transition-colors border border-emerald-200/60 shadow-soft-sm"
              >
                <span className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5" />
                </span>
                <span>{data.settings.phone}</span>
              </a>

              {/* Get Quote CTA */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-all duration-200 shadow-soft-sm hover:shadow-soft-hover"
              >
                <span>Fiyat Teklifi Al</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex md:hidden items-center gap-2">
              <a
                href={`tel:${data.settings.phoneRaw}`}
                className="p-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200"
                aria-label="Arayın"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 focus:outline-none"
                aria-label="Menüyü Aç"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-emerald-100 px-4 pt-3 pb-6 shadow-xl animate-fadeIn">
            <div className="space-y-2">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                      active
                        ? 'text-emerald-700 bg-emerald-50 font-semibold'
                        : 'text-gray-700 hover:bg-emerald-50/50 hover:text-emerald-600'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col gap-3">
              <a
                href={`tel:${data.settings.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-50 text-emerald-800 font-semibold text-sm border border-emerald-200"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>{data.settings.phone}</span>
              </a>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 text-white font-medium text-sm shadow-soft-sm"
              >
                <span>Fiyat Teklifi Al</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
