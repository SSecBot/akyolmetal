'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useCms } from '@/context/CmsContext';

export const FloatingWhatsApp: React.FC = () => {
  const { data } = useCms();
  const whatsappUrl = `https://wa.me/${data.settings.whatsapp}?text=${encodeURIComponent(
    'Merhaba, hurda metal ve geri dönüşüm hizmetleriniz hakkında bilgi ve fiyat teklifi almak istiyorum.'
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center group">
      {/* Tooltip */}
      <span className="hidden md:inline-block mr-3 px-3 py-1.5 bg-white text-gray-800 text-xs font-semibold rounded-full shadow-lg border border-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        WhatsApp ile Hızlı Fiyat Alın
      </span>

      {/* Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 focus:outline-none"
        aria-label="WhatsApp ile İletişime Geçin"
      >
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
      </a>
    </div>
  );
};
