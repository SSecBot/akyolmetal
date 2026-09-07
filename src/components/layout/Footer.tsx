'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Clock, Mail, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useCms } from '@/context/CmsContext';

export const Footer: React.FC = () => {
  const { data } = useCms();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-subtle border-t border-emerald-100/80 text-gray-700 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-emerald-100">
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-white border border-emerald-200 p-1 flex items-center justify-center shadow-soft-sm">
                <img
                  src="/assets/logo.png"
                  alt="Akyol Geri Dönüşüm"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-headline font-bold text-xl text-gray-900 leading-tight">
                  Akyol
                </span>
                <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
                  Geri Dönüşüm
                </span>
              </div>
            </Link>

            <p className="text-sm text-gray-600 leading-relaxed">
              İzmir Torbalı merkezli tesisimizde endüstriyel metal atıklarınızı değerinde nakit alıyor, çevreye duyarlı modern yöntemlerle ekonomiye geri kazandırıyoruz.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-100/70 text-emerald-800 text-xs font-medium border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Çevre Bakanlığı Lisanslı Tesis</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="font-headline font-bold text-base text-gray-900 mb-4 border-l-4 border-emerald-500 pl-3">
              Kurumsal Sayfalar
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-600 hover:text-emerald-600 transition-colors inline-flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Ana Sayfa</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-emerald-600 transition-colors inline-flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Hakkımızda</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-600 hover:text-emerald-600 transition-colors inline-flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Hizmetlerimiz</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-emerald-600 transition-colors inline-flex items-center gap-1.5"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                  <span>İletişim & Konum</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Services */}
          <div>
            <h3 className="font-headline font-bold text-base text-gray-900 mb-4 border-l-4 border-emerald-500 pl-3">
              Öne Çıkan Hizmetler
            </h3>
            <ul className="space-y-2.5 text-sm">
              {data.services.slice(0, 5).map((srv) => (
                <li key={srv.id}>
                  <Link
                    href={`/services/${srv.slug}`}
                    className="text-gray-600 hover:text-emerald-600 transition-colors line-clamp-1"
                  >
                    • {srv.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div>
            <h3 className="font-headline font-bold text-base text-gray-900 mb-4 border-l-4 border-emerald-500 pl-3">
              İletişim & Adres
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                <span className="text-gray-600">{data.settings.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <a
                  href={`tel:${data.settings.phoneRaw}`}
                  className="text-gray-800 font-semibold hover:text-emerald-600 transition-colors"
                >
                  {data.settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-emerald-600 shrink-0" />
                <a
                  href={`mailto:${data.settings.email}`}
                  className="text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  {data.settings.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                <div className="text-xs text-gray-600">
                  <span className="font-medium text-gray-800">Çalışma Saatleri:</span>
                  <p>{data.settings.workingHours}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>
            © {currentYear} {data.settings.companyName}. Tüm Hakları Saklıdır.
            &ensp;
            Made by{" "}
            <a
              href="https://digivideas.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#009966] hover:text-[#065F46] font-semibold transition-colors underline-offset-4 hover:underline"
            >
              Digivideas
            </a>{" "}
            / 2026
          </p>
          <div className="flex items-center gap-6">
            <span>Torbalı / İzmir / Türkiye</span>
            <span className="text-gray-300">|</span>
            <span>Lisanslı Metal Geri Kazanım</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
