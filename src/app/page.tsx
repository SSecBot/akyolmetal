'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Phone,
  ShieldCheck,
  Award,
  Recycle,
  Building2,
  CheckCircle2,
  Truck,
  Scale,
  Sparkles,
  MessageSquare,
  Flame,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Maximize2,
  Film,
} from 'lucide-react';
import { useCms } from '@/context/CmsContext';

export default function HomePage() {
  const { data } = useCms();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const iconMap: Record<string, React.ReactNode> = {
    Award: <Award className="w-6 h-6 text-emerald-600" />,
    Recycle: <Recycle className="w-6 h-6 text-emerald-600" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
    Building2: <Building2 className="w-6 h-6 text-emerald-600" />,
  };

  // Toggle Mute / Unmute
  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      setHasInteracted(true);
      if (nextMuted === false && videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  // Toggle Play / Pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
      setHasInteracted(true);
    }
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      } else {
        videoRef.current.requestFullscreen().catch(() => {});
      }
    }
  };

  return (
    <div className="flex flex-col bg-white">
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-emerald-50/50 via-white to-white">
        {/* Soft Ambient Light Glows */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-emerald-200/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-teal-100/40 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200/60 text-emerald-900 text-xs font-semibold shadow-soft-sm">
                <Recycle className="w-3.5 h-3.5 text-emerald-600 animate-spin-slow" />
                <span>{data.home.heroBadge}</span>
              </div>

              {/* Headline */}
              <h1 className="font-headline font-bold text-3xl sm:text-5xl lg:text-6xl text-gray-900 tracking-tight leading-[1.15]">
                {data.home.heroTitle}{' '}
                <span className="text-emerald-600 relative inline-block">
                  {data.home.heroTitleHighlight}
                  <span className="absolute left-0 bottom-1 w-full h-2.5 bg-emerald-200/50 -z-10 rounded-sm" />
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-2xl">
                {data.home.heroDescription}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all duration-200 shadow-soft-md hover:shadow-soft-hover"
                >
                  <span>{data.home.heroPrimaryCtaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-emerald-50 text-emerald-700 font-semibold text-sm border border-emerald-300 transition-all duration-200 shadow-soft-sm"
                >
                  <span>{data.home.heroSecondaryCtaText}</span>
                </Link>
              </div>

              {/* Quick Feature Highlights */}
              <div className="pt-6 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-medium text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Değerinde Nakit Alım</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Hassas Dijital Tartım</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Ücretsiz Konteyner</span>
                </div>
              </div>
            </div>

            {/* Right Visual (Interactive Rotating Graphic & Local Logo - Subtitle Removed) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
                {/* Outer Ring Pulse */}
                <div className="absolute inset-0 rounded-full bg-emerald-100/60 animate-pulse-subtle -z-10" />
                {/* Dashed Rotating Border */}
                <div className="absolute inset-2 rounded-full border-2 border-dashed border-emerald-400/50 animate-spin-slow" />
                
                {/* Center Visual Card - Hero animation subtitle purged */}
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-white shadow-soft-lg border border-emerald-200/80 p-8 flex flex-col items-center justify-center text-center group hover:scale-105 transition-transform duration-300">
                  <img
                    src="/assets/logo.png"
                    alt="Akyol Geri Dönüşüm Logosu"
                    className="w-28 h-28 sm:w-36 sm:h-36 object-contain animate-spin-slow"
                  />
                  <div className="mt-3">
                    <span className="font-headline font-bold text-gray-900 text-sm sm:text-base block">
                      Akyol Geri Dönüşüm
                    </span>
                  </div>
                </div>

                {/* Floating Metric Badge 1 */}
                <div className="absolute -top-3 -left-3 sm:top-2 sm:left-2 bg-white px-3.5 py-2 rounded-xl shadow-soft-md border border-emerald-100 flex items-center gap-2.5 animate-float">
                  <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    15+
                  </span>
                  <div className="text-left">
                    <p className="text-[11px] font-bold text-gray-900 leading-tight">Yıllık Tecrübe</p>
                    <p className="text-[10px] text-gray-500">Güvenilir Hizmet</p>
                  </div>
                </div>

                {/* Floating Metric Badge 2 */}
                <div className="absolute -bottom-3 -right-3 sm:bottom-4 sm:right-0 bg-white px-3.5 py-2 rounded-xl shadow-soft-md border border-emerald-100 flex items-center gap-2.5">
                  <ShieldCheck className="w-7 h-7 text-emerald-600" />
                  <div className="text-left">
                    <p className="text-[11px] font-bold text-gray-900 leading-tight">Bakanlık Lisanslı</p>
                    <p className="text-[10px] text-emerald-600">Tehlikeli & Tehlikesiz</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Promotional Video Engine (Ana Sayfa Video Alanı) */}
      {data.home.videoEnabled !== false && (
        <section className="py-12 lg:py-16 bg-gradient-to-b from-white via-emerald-50/30 to-white relative overflow-hidden border-t border-emerald-100/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200/80 text-emerald-900 text-xs font-semibold shadow-soft-sm">
                <Film className="w-3.5 h-3.5 text-emerald-600" />
                <span>{data.home.videoBadge || 'Tanıtım Videosu & Tesis Turu'}</span>
              </div>
              <h2 className="font-headline font-bold text-2xl sm:text-4xl text-gray-900">
                {data.home.videoTitle || 'Modern Tesisimiz & İleri Geri Dönüşüm Teknolojimiz'}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {data.home.videoDescription || 'Yüksek kapasiteli hidrolik preslerimiz, geniş konteyner filomuz ve Çevre Bakanlığı lisanslı tesisimizle hurda metallerinizi değerinde ekonomiye kazandırıyoruz.'}
              </p>
            </div>

            {/* Video Player Container */}
            <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden bg-gray-900 shadow-2xl border-2 border-emerald-200/80 group">
              {/* HTML5 Local Video Player (Strictly Muted Autoplay) */}
              <video
                ref={videoRef}
                src={data.home.videoUrl || '/assets/videos/akyol-promo.mp4'}
                poster={data.home.videoPoster || '/assets/facility.png'}
                autoPlay
                muted
                playsInline
                loop
                className="w-full h-[320px] sm:h-[480px] lg:h-[540px] object-cover cursor-pointer"
                onClick={togglePlay}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Video Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

              {/* Top Left Live Badge */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-2 z-10">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold tracking-wide border border-white/10 shadow-sm">
                  Lisanslı Geri Dönüşüm Operasyonu
                </span>
              </div>

              {/* Central Play/Pause Watermark on Pause */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all z-10"
                  aria-label="Videoyu Başlat"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-emerald-600 transition-transform">
                    <Play className="w-9 h-9 ml-1 fill-white" />
                  </div>
                </button>
              )}

              {/* Bottom Interactive Controls Bar */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex items-center justify-between gap-4 z-20">
                {/* Left Side: Play/Pause button & Status */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="p-3 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/20 shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    title={isPlaying ? 'Videoyu Duraklat' : 'Videoyu Oynat'}
                    aria-label={isPlaying ? 'Duraklat' : 'Oynat'}
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 ml-0.5 fill-white" />}
                  </button>

                  <div className="hidden sm:block text-white text-xs">
                    <p className="font-semibold drop-shadow">Akyol Geri Dönüşüm</p>
                    <p className="text-[10px] text-emerald-300 drop-shadow">Tanıtım Filmi</p>
                  </div>
                </div>

                {/* Right Side: Interactive Audio Toggle Button & Fullscreen */}
                <div className="flex items-center gap-3">
                  {/* Primary Sound Toggle Button */}
                  <button
                    type="button"
                    onClick={toggleMute}
                    className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full font-bold text-xs sm:text-sm backdrop-blur-md transition-all shadow-xl focus:outline-none focus:ring-2 ${
                      isMuted
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400 ring-2 ring-emerald-400/40 animate-pulse'
                        : 'bg-white/90 hover:bg-white text-gray-900 border border-white/60'
                    }`}
                    title={isMuted ? 'Sesi Açmak İçin Tıklayın' : 'Sesi Kapatmak İçin Tıklayın'}
                    aria-label={isMuted ? 'Sesi Aç' : 'Sesi Kapat'}
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="w-4 h-4 text-white shrink-0" />
                        <span>Sesi Aç</span>
                        <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Sesi Kapat</span>
                      </>
                    )}
                  </button>

                  {/* Fullscreen Button */}
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/20 shadow-lg transition-all focus:outline-none"
                    title="Tam Ekran"
                    aria-label="Tam Ekran"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Stats Section */}
      <section className="py-10 bg-white border-y border-emerald-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {data.home.stats.map((st) => (
              <div
                key={st.id}
                className="bg-emerald-50/50 hover:bg-emerald-50 rounded-2xl p-6 border border-emerald-100 transition-all duration-200 flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-xl bg-white shadow-soft-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  {iconMap[st.icon] || <Award className="w-6 h-6 text-emerald-600" />}
                </div>
                <span className="font-headline font-bold text-2xl sm:text-3xl text-gray-900 group-hover:text-emerald-700 transition-colors">
                  {st.number}
                </span>
                <span className="text-xs sm:text-sm font-medium text-gray-600 mt-1">
                  {st.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. About Overview Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Photo & Badges */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-soft-lg border border-emerald-100">
                <img
                  src="/assets/facility.png"
                  alt="Akyol Metal Geri Dönüşüm Tesisi Torbalı"
                  className="w-full h-[380px] sm:h-[440px] object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="inline-block px-3 py-1 bg-emerald-600/90 backdrop-blur-sm rounded-full text-xs font-semibold mb-2">
                    Modern Tesis Altyapısı
                  </span>
                  <p className="font-headline font-bold text-lg text-white drop-shadow-sm">
                    Torbalı / İzmir Geri Dönüşüm Merkezi
                  </p>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white p-4 sm:p-5 rounded-2xl shadow-soft-lg border border-emerald-200 max-w-xs flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <Scale className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-headline font-bold text-sm text-gray-900">Şeffaf Tartım</h4>
                  <p className="text-xs text-gray-500">Sertifikalı dijital kantar garantisi</p>
                </div>
              </div>
            </div>

            {/* Right Text Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/70">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>{data.home.aboutHighlightBadge}</span>
              </div>

              <h2 className="font-headline font-bold text-2xl sm:text-4xl text-gray-900 leading-snug">
                {data.home.aboutHighlightTitle}
              </h2>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {data.home.aboutHighlightDescription1}
              </p>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {data.home.aboutHighlightDescription2}
              </p>

              {/* Bullet points */}
              <div className="space-y-3 pt-2">
                {data.home.aboutHighlightPoints.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-sm font-medium text-gray-800">{pt}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex items-center gap-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors group"
                >
                  <span>Kurumsal Hikayemizi İnceleyin</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bento Services Section */}
      <section className="py-20 lg:py-28 bg-emerald-50/40 border-t border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-emerald-800 text-xs font-semibold border border-emerald-200 shadow-soft-sm">
              Faaliyet Alanlarımız
            </span>
            <h2 className="font-headline font-bold text-2xl sm:text-4xl text-gray-900">
              {data.home.bentoSectionTitle}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              {data.home.bentoSectionSubtitle}
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: Large Featured Card (Hurda Metal Alım Satım) */}
            <div className="md:col-span-2 relative rounded-3xl overflow-hidden bg-white border border-emerald-200/80 shadow-soft-md group hover:shadow-soft-hover transition-all duration-300 flex flex-col justify-between p-8 sm:p-10 min-h-[380px]">
              <div className="absolute inset-0 opacity-15 group-hover:opacity-25 transition-opacity">
                <img
                  src="/assets/scrap-metals.png"
                  alt="Hurda Metal Alım Satım"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative z-10 flex justify-between items-start">
                <span className="px-3.5 py-1.5 bg-emerald-600 text-white rounded-full text-xs font-semibold shadow-sm">
                  En Çok Tercih Edilen
                </span>
                <span className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
                  <Recycle className="w-5 h-5" />
                </span>
              </div>

              <div className="relative z-10 space-y-3 mt-12">
                <h3 className="font-headline font-bold text-2xl sm:text-3xl text-gray-900">
                  Hurda Metal Alım & Satım
                </h3>
                <p className="text-sm sm:text-base text-gray-600 max-w-xl leading-relaxed">
                  Demir, bakır, alüminyum, paslanmaz krom, sarı pirinç, çinko, kurşun ve kablo hurdalarınızı yerinde değerinde ve anında nakit ödeme ile satın alıyoruz.
                </p>
                <div className="pt-2">
                  <Link
                    href="/services/hurda-metal-alim-satim"
                    className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 hover:text-emerald-900 group"
                  >
                    <span>Detayları İnceleyin & Fiyat Alın</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2: Briketleme */}
            <div className="relative rounded-3xl overflow-hidden bg-white border border-emerald-200/80 shadow-soft-md group hover:shadow-soft-hover transition-all duration-300 p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Flame className="w-6 h-6" />
                </div>
                <h3 className="font-headline font-bold text-xl text-gray-900">
                  Briketleme & Presleme
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Talaş ve hafif metal hurdalarını yüksek hidrolik basınçla presleyerek briket bloklarına dönüştürüyor, ergitme verimini artırıyoruz.
                </p>
              </div>

              <div className="pt-6">
                <Link
                  href="/services/briketleme-presleme"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900"
                >
                  <span>Hizmet Detayı</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 3: Fabrika Söküm & Bozum */}
            <div className="relative rounded-3xl overflow-hidden bg-white border border-emerald-200/80 shadow-soft-md group hover:shadow-soft-hover transition-all duration-300 p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="font-headline font-bold text-xl text-gray-900">
                  Fabrika Söküm & Bozum
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Ömrünü tamamlamış sanayi binaları, çelik konstrüksiyon çatılar ve ağır sanayi makineleri İSG onaylı uzman ekibimizce sökülür.
                </p>
              </div>

              <div className="pt-6">
                <Link
                  href="/services/fabrika-sokum-bozum"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900"
                >
                  <span>Hizmet Detayı</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 4: Wide Card (Ücretsiz Konteyner Hizmeti) */}
            <div className="md:col-span-2 relative rounded-3xl overflow-hidden bg-white border border-emerald-200/80 shadow-soft-md group hover:shadow-soft-hover transition-all duration-300 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-soft-sm">
                  <Truck className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
                    Sanayi Tesislerine Özel
                  </span>
                  <h3 className="font-headline font-bold text-xl sm:text-2xl text-gray-900">
                    Ücretsiz Konteyner Bırakma Hizmeti
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 max-w-lg leading-relaxed">
                    Fabrika sahanıza hurda biriktirme konteynerini ücretsiz bırakıyoruz. Dolduğunda vinçli araçlarımızla aynı gün değiştiriyoruz.
                  </p>
                </div>
              </div>

              <div className="shrink-0 w-full sm:w-auto">
                <Link
                  href="/services/ucretsiz-konteyner-hizmeti"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition-colors shadow-soft-sm"
                >
                  <span>Konteyner Talep Et</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-emerald-50 text-emerald-700 font-semibold text-sm border border-emerald-300 transition-colors shadow-soft-sm"
            >
              <span>Tüm Hizmetlerimizi & Hurda Kategorilerini Görün</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Hazardous / Non-Hazardous License Banner */}
      <section className="py-14 bg-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
                <ShieldCheck className="w-8 h-8 text-emerald-300" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-xl sm:text-2xl text-white">
                  Resmi Çevre Lisanslı Metal Geri Kazanım
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100 mt-1">
                  {data.settings.licenseText}
                </p>
              </div>
            </div>

            <div className="shrink-0">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-emerald-800 font-semibold text-sm hover:bg-emerald-50 transition-colors shadow-lg"
              >
                <span>Lisans Bilgilerimiz</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Quick Contact / Quotation CTA */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="rounded-3xl bg-gradient-to-r from-emerald-50 via-emerald-100/60 to-teal-50 border border-emerald-200 p-8 sm:p-12 lg:p-16 shadow-soft-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-emerald-800 text-xs font-semibold border border-emerald-200 shadow-soft-sm">
                  Anında İletişim & Keşif
                </span>
                <h2 className="font-headline font-bold text-2xl sm:text-4xl text-gray-900">
                  {data.home.ctaSectionTitle}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 max-w-xl leading-relaxed">
                  {data.home.ctaSectionDescription}
                </p>
              </div>

              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4 justify-center">
                <a
                  href={`tel:${data.settings.phoneRaw}`}
                  className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base transition-colors shadow-soft-md"
                >
                  <Phone className="w-5 h-5" />
                  <span>{data.settings.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${data.settings.whatsapp}?text=${encodeURIComponent(
                    'Merhaba, Akyol Metal hurda alım fiyatları hakkında bilgi almak istiyorum.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-base transition-colors shadow-soft-md"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>WhatsApp ile Fiyat Sorun</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
