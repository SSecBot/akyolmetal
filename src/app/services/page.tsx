'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Recycle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Phone,
  Sparkles,
} from 'lucide-react';
import { useCms } from '@/context/CmsContext';

export default function ServicesPage() {
  const { data } = useCms();
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');

  const categories = ['Tümü', ...Array.from(new Set(data.services.map((s) => s.category)))];

  const filteredServices =
    selectedCategory === 'Tümü'
      ? data.services.filter((s) => s.isActive)
      : data.services.filter((s) => s.isActive && s.category === selectedCategory);

  return (
    <div className="flex flex-col bg-white">
      {/* 1. Services Header */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-b from-emerald-50/70 via-emerald-50/20 to-white border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold shadow-soft-sm">
            <Recycle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Kapsamlı Geri Dönüşüm Çözümleri</span>
          </div>

          <h1 className="font-headline font-bold text-3xl sm:text-5xl text-gray-900 tracking-tight">
            Hizmetlerimiz & Faaliyet Alanlarımız
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Demir, bakır, alüminyum, paslanmaz hurda alımından briketlemeye, fabrika sökümünden ücretsiz konteyner tahsisine kadar uçtan uca profesyonel hizmetler.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-soft-md scale-105'
                    : 'bg-white text-gray-700 hover:bg-emerald-50 border border-emerald-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-3xl overflow-hidden border border-emerald-200/80 shadow-soft-md hover:shadow-soft-hover transition-all duration-300 flex flex-col group"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-emerald-50">
                  <img
                    src={service.image || '/assets/scrap-metals.png'}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-md text-emerald-800 rounded-full text-xs font-semibold shadow-sm">
                    {service.category}
                  </span>

                  {/* Badge */}
                  {service.badge && (
                    <span className="absolute top-4 right-4 px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-semibold shadow-sm">
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <h3 className="font-headline font-bold text-xl text-gray-900 group-hover:text-emerald-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                      {service.shortDescription}
                    </p>

                    {/* Quick Features */}
                    <div className="space-y-1.5 pt-2 border-t border-gray-100">
                      {service.features.slice(0, 2).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <Link
                      href={`/services/${service.slug}`}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white font-semibold text-xs sm:text-sm transition-all duration-200 border border-emerald-200 group/btn"
                    >
                      <span>Hizmet Detayı & Fiyat Teklifi</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-16 bg-surface-subtle rounded-3xl border border-emerald-100 p-8">
              <p className="text-gray-500 text-sm">Seçilen kategoride henüz yayınlanmış hizmet bulunmamaktadır.</p>
            </div>
          )}
        </div>
      </section>

      {/* 3. Bottom Direct Call CTA */}
      <section className="py-16 bg-emerald-50 border-t border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-headline font-bold text-2xl sm:text-3xl text-gray-900">
            Özel Hurda Alım veya Geri Dönüşüm Talebiniz mi Var?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Hemen bizi arayarak yerinde keşif isteyebilir veya WhatsApp üzerinden hurda fotoğraflarınızı göndererek anında fiyat alabilirsiniz.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${data.settings.phoneRaw}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-soft-sm"
            >
              <Phone className="w-4 h-4" />
              <span>{data.settings.phone}</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-emerald-100 text-emerald-800 font-semibold text-sm border border-emerald-300 transition-colors shadow-soft-sm"
            >
              <span>İletişim Formuna Git</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
