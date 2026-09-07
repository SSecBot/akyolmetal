import type { Metadata } from 'next';
import './globals.css';
import { CmsProvider } from '@/context/CmsContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/layout/FloatingWhatsApp';

export const metadata: Metadata = {
  title: 'Akyol Geri Dönüşüm | İzmir Torbalı Lisanslı Metal Hurda Alım & Bertaraf',
  description: 'Akyol Geri Dönüşüm; Torbalı/İzmir merkezli tesisinde demir, bakır, alüminyum, paslanmaz hurda alımı, briketleme, fabrika sökümü ve lisanslı atık yönetimi hizmeti sunmaktadır. Tel: 0533 935 09 36',
  keywords: 'Akyol Geri Dönüşüm, hurda metal izmir, torbalı geri dönüşüm, hurda demir alımı, hurda bakır, hurda alüminyum, briketleme, fabrika söküm, lisanslı atık yönetimi',
  icons: {
    icon: '/assets/logo.png',
    apple: '/assets/logo.png',
  },
  openGraph: {
    title: 'Akyol Geri Dönüşüm - Torbalı / İzmir',
    description: 'Sürdürülebilir Bir Gelecek İçin Güvenilir Metal Geri Dönüşüm Çözümleri',
    url: 'https://akyolmetal.com',
    siteName: 'Akyol Geri Dönüşüm',
    locale: 'tr_TR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-white text-gray-900 antialiased selection:bg-emerald-100 selection:text-emerald-900">
        <CmsProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </CmsProvider>
      </body>
    </html>
  );
}
