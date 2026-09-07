'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  Phone,
  MessageSquare,
  ShieldCheck,
  Truck,
  Scale,
  Clock,
  Sparkles,
  Send,
  AlertCircle,
} from 'lucide-react';
import { useCms } from '@/context/CmsContext';

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data, addMessage } = useCms();
  const slug = params?.slug as string;

  const service = data.services.find((s) => s.slug === slug && s.isActive);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [estimatedAmount, setEstimatedAmount] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    addMessage({
      name,
      phone,
      email,
      service: service?.title || 'Genel Hizmet',
      estimatedAmount,
      message: message || `${service?.title} için fiyat teklifi talebi.`,
    });

    setSubmitted(true);
    setName('');
    setPhone('');
    setEmail('');
    setEstimatedAmount('');
    setMessage('');
  };

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="font-headline font-bold text-2xl sm:text-3xl text-gray-900">
          Hizmet Bulunamadı
        </h1>
        <p className="text-gray-600 text-sm max-w-md mx-auto">
          Aradığınız hizmet mevcut değil veya yayından kaldırılmış olabilir.
        </p>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold text-sm hover:bg-emerald-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Tüm Hizmetlerimize Geri Dön</span>
        </Link>
      </div>
    );
  }

  const otherServices = data.services.filter(
    (s) => s.id !== service.id && s.isActive
  );

  return (
    <div className="flex flex-col bg-white">
      {/* 1. Breadcrumb & Detail Header */}
      <section className="py-12 lg:py-16 bg-gradient-to-b from-emerald-50/70 to-white border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Hizmetler Listesine Dön</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
              {service.category}
            </span>
            {service.badge && (
              <span className="px-3 py-1 bg-emerald-600 text-white rounded-full text-xs font-semibold shadow-sm">
                {service.badge}
              </span>
            )}
          </div>

          <h1 className="font-headline font-bold text-3xl sm:text-5xl text-gray-900 tracking-tight">
            {service.title}
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-3xl leading-relaxed">
            {service.shortDescription}
          </p>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-12">
              {/* Feature Image */}
              <div className="rounded-3xl overflow-hidden shadow-soft-md border border-emerald-100 h-[340px] sm:h-[420px]">
                <img
                  src={service.image || '/assets/scrap-metals.png'}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Full Description */}
              <div className="space-y-4">
                <h2 className="font-headline font-bold text-2xl text-gray-900 border-l-4 border-emerald-500 pl-3">
                  Hizmet Kapsamı ve Açıklaması
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {service.fullDescription}
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4">
                <h3 className="font-headline font-bold text-xl text-gray-900">
                  Öne Çıkan Özellikler
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-medium text-gray-800">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accepted Materials */}
              {service.acceptedMaterials && service.acceptedMaterials.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-headline font-bold text-xl text-gray-900">
                    Kabul Edilen Hurda & Malzeme Türleri
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {service.acceptedMaterials.map((mat, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 rounded-xl bg-white border border-emerald-200 text-gray-800 text-xs sm:text-sm font-medium shadow-soft-sm hover:border-emerald-400 transition-colors"
                      >
                        ✓ {mat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Process Steps */}
              {service.processSteps && service.processSteps.length > 0 && (
                <div className="space-y-6">
                  <h3 className="font-headline font-bold text-xl text-gray-900 border-l-4 border-emerald-500 pl-3">
                    Nasıl Çalışıyoruz? (İşlem Aşamaları)
                  </h3>
                  <div className="space-y-4">
                    {service.processSteps.map((step, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-2xl bg-surface-subtle border border-emerald-100 flex items-start gap-4"
                      >
                        <span className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits */}
              {service.benefits && service.benefits.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-headline font-bold text-xl text-gray-900">
                    Akyol Geri Dönüşüm Ayrıcalıkları
                  </h3>
                  <div className="space-y-2.5">
                    {service.benefits.map((ben, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-sm font-semibold text-gray-800">{ben}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar: Quotation Form & Quick Contact */}
            <div className="lg:col-span-5 space-y-8">
              {/* Quick Quote Form Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-soft-lg sticky top-28 space-y-6">
                <div className="space-y-2 border-b border-emerald-100 pb-4">
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                    Anında Fiyat Alın
                  </span>
                  <h3 className="font-headline font-bold text-xl text-gray-900">
                    Bu Hizmet İçin Teklif İsteyin
                  </h3>
                  <p className="text-xs text-gray-500">
                    Miktar ve detayları iletin, uzman ekibimiz en geç 15 dakika içinde geri dönüş yapsın.
                  </p>
                </div>

                {submitted ? (
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-headline font-bold text-base text-gray-900">
                      Talebiniz Alındı!
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Teklif talebiniz {data.settings.companyName} yetkililerine iletilmiştir. En kısa sürede sizinle iletişime geçeceğiz.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-emerald-700 font-bold underline"
                    >
                      Yeni bir talep gönder
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Firma / Ad Soyad *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Örn: Ege Sanayi Ltd. / Ahmet Yılmaz"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm outline-none bg-surface-subtle"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Telefon Numarası *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="05XX XXX XX XX"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm outline-none bg-surface-subtle"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Tahmini Miktar / Tonaj
                      </label>
                      <input
                        type="text"
                        value={estimatedAmount}
                        onChange={(e) => setEstimatedAmount(e.target.value)}
                        placeholder="Örn: 5 Ton Demir Hurdası"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm outline-none bg-surface-subtle"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Not / Açıklama
                      </label>
                      <textarea
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Hurdanın durumu, bulunduğu ilçe ve varsa özel talepleriniz..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm outline-none bg-surface-subtle"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-soft-sm flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Fiyat Teklifi Talep Et</span>
                    </button>
                  </form>
                )}

                {/* Direct Phone & WhatsApp triggers */}
                <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
                  <a
                    href={`tel:${data.settings.phoneRaw}`}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Hemen Arayın: {data.settings.phone}</span>
                  </a>

                  <a
                    href={`https://wa.me/${data.settings.whatsapp}?text=${encodeURIComponent(
                      `Merhaba, ${service.title} hizmetiniz için fiyat teklifi almak istiyorum.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp ile Anında Yazın</span>
                  </a>
                </div>
              </div>

              {/* Other Services Navigation List */}
              <div className="bg-surface-subtle rounded-3xl p-6 border border-emerald-100 space-y-3">
                <h4 className="font-headline font-bold text-sm text-gray-900">
                  Diğer Hizmetlerimiz
                </h4>
                <div className="space-y-1.5 text-xs">
                  {otherServices.slice(0, 5).map((other) => (
                    <Link
                      key={other.id}
                      href={`/services/${other.slug}`}
                      className="block p-2.5 rounded-xl hover:bg-emerald-100/50 text-gray-700 hover:text-emerald-900 transition-colors font-medium"
                    >
                      → {other.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
