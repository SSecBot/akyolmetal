'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Send,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  Building,
  Navigation,
} from 'lucide-react';
import { useCms } from '@/context/CmsContext';

export default function ContactPage() {
  const { data, addMessage } = useCms();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Hurda Metal Alım & Satım');
  const [estimatedAmount, setEstimatedAmount] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    addMessage({
      name,
      phone,
      email,
      service,
      estimatedAmount,
      message,
    });

    setSubmitted(true);
    setName('');
    setPhone('');
    setEmail('');
    setEstimatedAmount('');
    setMessage('');
  };

  return (
    <div className="flex flex-col bg-white">
      {/* 1. Page Header */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-b from-emerald-50/70 via-emerald-50/20 to-white border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold shadow-soft-sm">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>İletişim & Konum</span>
          </div>

          <h1 className="font-headline font-bold text-3xl sm:text-5xl text-gray-900 tracking-tight">
            Bizimle İletişime Geçin
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Metal atıklarınız için en iyi fiyatı almak, ücretsiz keşif veya konteyner talep etmek için bize 7/24 ulaşabilirsiniz.
          </p>
        </div>
      </section>

      {/* 2. Contact Info Cards */}
      <section className="py-12 bg-white -mt-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Phone */}
            <div className="bg-white rounded-3xl p-8 border border-emerald-200 shadow-soft-md flex flex-col items-center text-center space-y-3 group hover:border-emerald-400 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Müşteri Hizmetleri
              </span>
              <h3 className="font-headline font-bold text-xl text-gray-900">
                Doğrudan Arayın
              </h3>
              <a
                href={`tel:${data.settings.phoneRaw}`}
                className="font-headline font-bold text-lg text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                {data.settings.phone}
              </a>
              <p className="text-xs text-gray-500">
                {data.settings.workingHours}
              </p>
            </div>

            {/* Card 2: WhatsApp */}
            <div className="bg-white rounded-3xl p-8 border border-emerald-200 shadow-soft-md flex flex-col items-center text-center space-y-3 group hover:border-emerald-400 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageSquare className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold text-[#25D366] uppercase tracking-wider">
                Hızlı Fiyat Hattı
              </span>
              <h3 className="font-headline font-bold text-xl text-gray-900">
                WhatsApp'tan Yazın
              </h3>
              <a
                href={`https://wa.me/${data.settings.whatsapp}?text=${encodeURIComponent(
                  'Merhaba Akyol Geri Dönüşüm, hurda alım fiyatları hakkında bilgi almak istiyorum.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-headline font-bold text-base text-gray-900 hover:text-[#25D366] transition-colors"
              >
                Fotoğraf Gönderin & Fiyat Alın
              </a>
              <p className="text-xs text-gray-500">
                Anında mesaj ve fotoğraf ile keşif
              </p>
            </div>

            {/* Card 3: Address */}
            <div className="bg-white rounded-3xl p-8 border border-emerald-200 shadow-soft-md flex flex-col items-center text-center space-y-3 group hover:border-emerald-400 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Tesis Lokasyonu
              </span>
              <h3 className="font-headline font-bold text-xl text-gray-900">
                Torbalı / İzmir
              </h3>
              <p className="text-xs text-gray-700 font-medium px-4">
                {data.settings.address}
              </p>
              <a
                href={data.settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Haritada Yol Tarifi Al</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Form & Map Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Contact Form */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-10 border border-emerald-200 shadow-soft-lg space-y-6">
              <div className="space-y-2 border-b border-emerald-100 pb-4">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  Teklif & İletişim Formu
                </span>
                <h2 className="font-headline font-bold text-2xl text-gray-900">
                  Bize Mesaj Gönderin
                </h2>
                <p className="text-xs sm:text-sm text-gray-600">
                  Metal türü ve tahmini miktarınızı belirterek form üzerinden doğrudan teklif talep edebilirsiniz.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-soft-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-headline font-bold text-xl text-gray-900">
                    Mesajınız Başarıyla İletildi!
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-sm mx-auto">
                    Talebiniz sistemimize kaydedilmiştir. En kısa sürede yetkili temsilcimiz sizinle irtibata geçecektir.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    <span>Yeni Bir Mesaj Gönder</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Ad Soyad / Firma Adı *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Örn: Mehmet Öz / Ege Makine"
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
                        placeholder="0533 XXX XX XX"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm outline-none bg-surface-subtle"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        E-posta Adresi (İsteğe Bağlı)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ornek@firma.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm outline-none bg-surface-subtle"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        İlgili Hizmet
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm outline-none bg-surface-subtle"
                      >
                        {data.services.map((s) => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                        <option value="Diğer">Diğer / Genel Soru</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Tahmini Hurda Miktarı / Tonaj
                    </label>
                    <input
                      type="text"
                      value={estimatedAmount}
                      onChange={(e) => setEstimatedAmount(e.target.value)}
                      placeholder="Örn: Yaklaşık 10 Ton Talaş / 500 Kg Bakır"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm outline-none bg-surface-subtle"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Mesajınız & Detaylar *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Hurdanın durumu, bulunduğu bölge ve sormak istediğiniz sorular..."
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm outline-none bg-surface-subtle"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-soft-sm flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Mesajı & Teklif Talebini Gönder</span>
                  </button>
                </form>
              )}
            </div>

            {/* Right: Interactive Map & Corporate Card */}
            <div className="lg:col-span-6 space-y-6">
              {/* Google Map Box */}
              <div className="rounded-3xl overflow-hidden border border-emerald-200 shadow-soft-lg bg-surface-subtle h-[360px] relative">
                <iframe
                  title="Akyol Geri Dönüşüm Torbalı İzmir Konumu"
                  src={data.settings.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Facility Details Box */}
              <div className="bg-emerald-50 rounded-3xl p-6 sm:p-8 border border-emerald-200 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-headline font-bold text-base text-gray-900">
                      {data.settings.companyName}
                    </h3>
                    <p className="text-xs text-emerald-700 font-semibold">
                      Torbalı / İzmir / Türkiye
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700 pt-2 border-t border-emerald-200/60">
                  <div>
                    <span className="font-semibold text-gray-900 block">Açık Adres:</span>
                    <p className="mt-0.5">{data.settings.address}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 block">Çalışma Saatleri:</span>
                    <p className="mt-0.5">{data.settings.workingHours}</p>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2 text-xs text-emerald-800 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{data.settings.licenseText}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
