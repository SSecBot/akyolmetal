'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Scale,
  Banknote,
  Leaf,
  Truck,
  Target,
  Compass,
  ArrowRight,
  CheckCircle2,
  FileCheck,
  Building,
} from 'lucide-react';
import { useCms } from '@/context/CmsContext';

export default function AboutPage() {
  const { data } = useCms();

  const valueIconMap: Record<string, React.ReactNode> = {
    Scale: <Scale className="w-6 h-6 text-emerald-600" />,
    Banknote: <Banknote className="w-6 h-6 text-emerald-600" />,
    Leaf: <Leaf className="w-6 h-6 text-emerald-600" />,
    Truck: <Truck className="w-6 h-6 text-emerald-600" />,
  };

  return (
    <div className="flex flex-col bg-white">
      {/* 1. Page Header Banner */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-b from-emerald-50/70 via-emerald-50/20 to-white border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold shadow-soft-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{data.about.heroBadge}</span>
          </div>

          <h1 className="font-headline font-bold text-3xl sm:text-5xl text-gray-900 tracking-tight">
            {data.about.heroTitle}
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {data.about.heroSubtitle}
          </p>
        </div>
      </section>

      {/* 2. Corporate Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                Akyol Kurumsal
              </span>
              <h2 className="font-headline font-bold text-2xl sm:text-4xl text-gray-900">
                {data.about.storyTitle}
              </h2>

              <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                {data.about.storyParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-headline font-bold text-sm text-gray-900">
                    Lisans Güvencesi
                  </h4>
                  <p className="text-xs text-emerald-800 mt-0.5">
                    {data.settings.licenseText}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Facility Picture & Badges */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-soft-lg border border-emerald-100">
                <img
                  src="/assets/facility.png"
                  alt="Akyol Metal Torbalı Tesisi"
                  className="w-full h-[420px] object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-soft-lg border border-emerald-200 max-w-xs flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-headline font-bold text-sm text-gray-900">Torbalı / İzmir</h4>
                  <p className="text-xs text-gray-500">Modern ve Entegre Geri Dönüşüm Tesisi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="py-20 bg-emerald-50/40 border-y border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-emerald-200/80 shadow-soft-md space-y-4 hover:shadow-soft-hover transition-all">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="font-headline font-bold text-2xl text-gray-900">
                {data.about.missionTitle}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {data.about.missionText}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-emerald-200/80 shadow-soft-md space-y-4 hover:shadow-soft-hover transition-all">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Compass className="w-7 h-7" />
              </div>
              <h3 className="font-headline font-bold text-2xl text-gray-900">
                {data.about.visionTitle}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {data.about.visionText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
              İlkelerimiz
            </span>
            <h2 className="font-headline font-bold text-2xl sm:text-4xl text-gray-900">
              Bizi Farklı Kılan Değerlerimiz
            </h2>
            <p className="text-sm text-gray-600">
              Sektördeki 15 yılı aşkın tecrübemizle dürüstlük, şeffaflık ve çevreye saygı temelinde çalışıyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.about.values.map((val) => (
              <div
                key={val.id}
                className="bg-surface-subtle hover:bg-emerald-50/60 rounded-3xl p-6 sm:p-8 border border-emerald-100 transition-all duration-200 flex flex-col space-y-3 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-soft-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  {valueIconMap[val.icon] || <Leaf className="w-6 h-6 text-emerald-600" />}
                </div>
                <h3 className="font-headline font-bold text-lg text-gray-900 group-hover:text-emerald-700 transition-colors">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Licenses & Environmental Standards */}
      <section className="py-20 bg-emerald-50/50 border-t border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-emerald-800 text-xs font-semibold border border-emerald-200 shadow-soft-sm">
                <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Çevre Mevzuatına Tam Uyum</span>
              </span>

              <h2 className="font-headline font-bold text-2xl sm:text-4xl text-gray-900">
                {data.about.licenseTitle}
              </h2>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {data.about.licenseDescription}
              </p>

              <div className="space-y-3 pt-2">
                {data.about.licenseDetails.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </span>
                    <span className="text-sm font-semibold text-gray-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-emerald-200 shadow-soft-lg space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 p-2 flex items-center justify-center">
                    <img
                      src="/assets/logo.png"
                      alt="Akyol Geri Dönüşüm Lisanslı Tesis"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-lg text-gray-900">
                      {data.settings.companyName}
                    </h3>
                    <p className="text-xs text-emerald-600 font-semibold">
                      Torbalı / İzmir Şubesi
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs text-gray-700 space-y-1.5">
                  <p><strong className="text-gray-900">Adres:</strong> {data.settings.address}</p>
                  <p><strong className="text-gray-900">Telefon:</strong> {data.settings.phone}</p>
                  <p><strong className="text-gray-900">Faaliyet Kapsamı:</strong> Tehlikeli ve tehlikesiz metal atıkların alımı, briketlenmesi, ayrıştırılması ve bertarafı.</p>
                </div>

                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-soft-sm"
                >
                  <span>Resmi Teklif ve İletişim</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
