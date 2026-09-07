'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Lock,
  Unlock,
  LogOut,
  LayoutDashboard,
  Home,
  Info,
  Layers,
  PhoneCall,
  Inbox,
  Image as ImageIcon,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertTriangle,
  Download,
  ExternalLink,
  ShieldCheck,
  MessageCircle,
  X,
  Film,
  Video,
  Volume2,
  VolumeX,
  MapPin,
  Globe,
  Clock,
  Mail,
} from 'lucide-react';
import { useCms } from '@/context/CmsContext';
import { ServiceItem, StatItem, ValueItem } from '@/types/cms';

const ADMIN_PASSCODE = 'Akyol35.2026';
const AUTH_STORAGE_KEY = 'akyol_admin_auth_session';

type DeleteTarget = {
  type:
    | 'service'
    | 'stat'
    | 'aboutPoint'
    | 'storyPara'
    | 'licenseDetail'
    | 'valueItem'
    | 'message'
    | 'clearAllMessages'
    | 'clearReadMessages'
    | 'resetDefaults';
  id: string | number;
  title: string;
} | null;

export default function AdminDashboardPage() {
  const {
    data,
    updateSettings,
    updateHome,
    updateAbout,
    addStat,
    deleteStat,
    addAboutPoint,
    deleteAboutPoint,
    addStoryParagraph,
    deleteStoryParagraph,
    addLicenseDetail,
    deleteLicenseDetail,
    addValueItem,
    deleteValueItem,
    addService,
    updateService,
    deleteService,
    toggleServiceStatus,
    markMessageRead,
    deleteMessage,
    clearAllMessages,
    clearReadMessages,
    resetToDefault,
    exportDataJson,
  } = useCms();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcodeInput, setPasscodeInput] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<
    'home' | 'about' | 'services' | 'contact' | 'inbox' | 'media' | 'settings'
  >('home');

  // Notification Banner
  const [saveBanner, setSaveBanner] = useState<string>('');

  // In-App Deletion Confirmation Modal State
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget>(null);

  // Service Modal State (for Add / Edit)
  const [serviceModalOpen, setServiceModalOpen] = useState<boolean>(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceFormData, setServiceFormData] = useState<Partial<ServiceItem>>({
    title: '',
    slug: '',
    category: 'Demir & Çelik',
    shortDescription: '',
    fullDescription: '',
    image: '/assets/scrap-metals.png',
    badge: '',
    features: [''],
    processSteps: [''],
    acceptedMaterials: [''],
    benefits: [''],
    isActive: true,
    highlight: false,
    order: 1,
  });

  // Temporary inputs for array additions
  const [newStatInput, setNewStatInput] = useState<{ number: string; label: string; icon: string }>({
    number: '',
    label: '',
    icon: 'Award',
  });
  const [newAboutPointInput, setNewAboutPointInput] = useState<string>('');
  const [newStoryParagraphInput, setNewStoryParagraphInput] = useState<string>('');
  const [newLicenseDetailInput, setNewLicenseDetailInput] = useState<string>('');
  const [newValueInput, setNewValueInput] = useState<{ title: string; description: string; icon: string }>({
    title: '',
    description: '',
    icon: 'Leaf',
  });

  // Check persisted login session
  useEffect(() => {
    const session = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (session === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcodeInput === ADMIN_PASSCODE) {
      setIsAuthenticated(true);
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setAuthError('');
    } else {
      setAuthError('Hatalı şifre girdiniz! Lütfen yetkili erişim şifrenizi kontrol ediniz.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setPasscodeInput('');
  };

  const showNotification = (msg: string) => {
    setSaveBanner(msg);
    setTimeout(() => {
      setSaveBanner('');
    }, 4000);
  };

  // Perform Confirmed Deletion
  const confirmDeleteExecution = () => {
    if (!deleteTarget) return;

    switch (deleteTarget.type) {
      case 'service':
        deleteService(String(deleteTarget.id));
        showNotification(`"${deleteTarget.title}" hizmeti başarıyla silindi.`);
        break;
      case 'stat':
        deleteStat(String(deleteTarget.id));
        showNotification(`"${deleteTarget.title}" istatistik kartı silindi.`);
        break;
      case 'aboutPoint':
        deleteAboutPoint(Number(deleteTarget.id));
        showNotification('Öne çıkan madde silindi.');
        break;
      case 'storyPara':
        deleteStoryParagraph(Number(deleteTarget.id));
        showNotification('Hikaye paragrafı silindi.');
        break;
      case 'licenseDetail':
        deleteLicenseDetail(Number(deleteTarget.id));
        showNotification('Lisans belgesi maddesi silindi.');
        break;
      case 'valueItem':
        deleteValueItem(String(deleteTarget.id));
        showNotification(`"${deleteTarget.title}" değer kartı silindi.`);
        break;
      case 'message':
        deleteMessage(String(deleteTarget.id));
        showNotification(`"${deleteTarget.title}" isimli göndericiden gelen mesaj silindi.`);
        break;
      case 'clearAllMessages':
        clearAllMessages();
        showNotification('Gelen kutusundaki tüm mesajlar temizlendi.');
        break;
      case 'clearReadMessages':
        clearReadMessages();
        showNotification('Okunmuş tüm mesajlar temizlendi.');
        break;
      case 'resetDefaults':
        resetToDefault();
        showNotification('CMS verileri varsayılan fabrika durumuna sıfırlandı.');
        break;
    }

    setDeleteTarget(null);
  };

  // Service Modal Helpers
  const openNewServiceModal = () => {
    setEditingServiceId(null);
    setServiceFormData({
      title: '',
      slug: '',
      category: 'Demir & Çelik',
      shortDescription: '',
      fullDescription: '',
      image: '/assets/scrap-metals.png',
      badge: '',
      features: ['Yerinde Yükleme ve Tartım', 'En Yüksek Fiyat Garantisi'],
      processSteps: ['Keşif ve Fiyatlandırma', 'Hassas Tartım ve Nakit Ödeme'],
      acceptedMaterials: ['Hurda Malzeme 1', 'Hurda Malzeme 2'],
      benefits: ['Değerinde Nakit Alım'],
      isActive: true,
      highlight: false,
      order: data.services.length + 1,
    });
    setServiceModalOpen(true);
  };

  const openEditServiceModal = (srv: ServiceItem) => {
    setEditingServiceId(srv.id);
    setServiceFormData({
      ...srv,
      features: [...srv.features],
      processSteps: [...srv.processSteps],
      acceptedMaterials: [...(srv.acceptedMaterials || [])],
      benefits: [...(srv.benefits || [])],
    });
    setServiceModalOpen(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceFormData.title || !serviceFormData.slug) {
      alert('Lütfen hizmet başlığı ve slug alanını doldurunuz.');
      return;
    }

    if (editingServiceId) {
      updateService(editingServiceId, serviceFormData);
      showNotification('Hizmet başarıyla güncellendi!');
    } else {
      addService({
        title: serviceFormData.title || '',
        slug: serviceFormData.slug || '',
        category: serviceFormData.category || 'Genel',
        shortDescription: serviceFormData.shortDescription || '',
        fullDescription: serviceFormData.fullDescription || '',
        icon: 'Layers',
        image: serviceFormData.image || '/assets/scrap-metals.png',
        badge: serviceFormData.badge,
        features: serviceFormData.features || [],
        processSteps: serviceFormData.processSteps || [],
        acceptedMaterials: serviceFormData.acceptedMaterials || [],
        benefits: serviceFormData.benefits || [],
        isActive: serviceFormData.isActive ?? true,
        highlight: serviceFormData.highlight ?? false,
        order: serviceFormData.order || 1,
      });
      showNotification('Yeni hizmet başarıyla eklendi!');
    }
    setServiceModalOpen(false);
  };

  // If Not Authenticated -> Render Passcode Guard Modal
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-surface-subtle flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-emerald-200 shadow-soft-lg space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 p-2 flex items-center justify-center mx-auto">
            <img
              src="/assets/logo.png"
              alt="Akyol Metal Logo"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="space-y-1.5">
            <h1 className="font-headline font-bold text-2xl text-gray-900">
              Yönetici Paneli Girişi
            </h1>
            <p className="text-xs text-emerald-700 font-semibold uppercase tracking-wider">
              Akyol Metal CMS
            </p>
            <p className="text-xs text-gray-500 pt-1">
              Web sitesi içeriklerini yönetmek için yetkili erişim şifrenizi giriniz.
            </p>
          </div>

          {authError && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Erişim Şifresi (Passcode)
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  autoFocus
                  value={passcodeInput}
                  onChange={(e) => setPasscodeInput(e.target.value)}
                  placeholder="Şifrenizi giriniz..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm outline-none bg-surface-subtle pl-10"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-soft-sm flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Giriş Yap</span>
            </button>
          </form>

          <div className="pt-2 border-t border-gray-100">
            <Link
              href="/"
              className="text-xs text-gray-500 hover:text-emerald-700 transition-colors inline-flex items-center gap-1"
            >
              <span>← Ana Sayfaya Geri Dön</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated CMS View
  return (
    <div className="min-h-screen bg-surface-subtle flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-white border-b border-emerald-100 sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex justify-between items-center shadow-soft-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 p-1 flex items-center justify-center">
            <img src="/assets/logo.png" alt="Akyol Metal" className="w-full h-full object-contain" />
          </div>
          <div>
            <h2 className="font-headline font-bold text-base text-gray-900 leading-tight">
              Akyol Geri Dönüşüm CMS
            </h2>
            <span className="text-[10px] text-emerald-600 font-semibold uppercase tracking-wider block">
              Yönetici Paneli (Canlı Senkronize)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200 transition-colors"
          >
            <span>Siteyi Görüntüle</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold border border-red-200 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Çıkış Yap</span>
          </button>
        </div>
      </header>

      {/* Save Notification Toast */}
      {saveBanner && (
        <div className="bg-emerald-600 text-white text-xs font-semibold py-2.5 px-4 text-center sticky top-14 z-20 shadow-md flex items-center justify-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4" />
          <span>{saveBanner}</span>
        </div>
      )}

      {/* Main Container with Sidebar + Content Area */}
      <div className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 space-y-2">
          <div className="bg-white rounded-2xl p-3 border border-emerald-100 shadow-soft-sm space-y-1">
            <button
              type="button"
              onClick={() => setActiveTab('home')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'home'
                  ? 'bg-emerald-600 text-white shadow-soft-sm'
                  : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-800'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Ana Sayfa Yönetimi</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('about')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'about'
                  ? 'bg-emerald-600 text-white shadow-soft-sm'
                  : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-800'
              }`}
            >
              <Info className="w-4 h-4" />
              <span>Hakkımızda Yönetimi</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'services'
                  ? 'bg-emerald-600 text-white shadow-soft-sm'
                  : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Hizmetler CMS ({data.services.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('contact')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'contact'
                  ? 'bg-emerald-600 text-white shadow-soft-sm'
                  : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-800'
              }`}
            >
              <PhoneCall className="w-4 h-4" />
              <span>İletişim & Şirket Bilgileri</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('inbox')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'inbox'
                  ? 'bg-emerald-600 text-white shadow-soft-sm'
                  : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4" />
                <span>Gelen Kutusu (Teklifler)</span>
              </div>
              {data.messages.filter((m) => !m.isRead).length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                  {data.messages.filter((m) => !m.isRead).length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('media')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'media'
                  ? 'bg-emerald-600 text-white shadow-soft-sm'
                  : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-800'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Görsel & Medya Rehberi</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'settings'
                  ? 'bg-emerald-600 text-white shadow-soft-sm'
                  : 'text-gray-700 hover:bg-emerald-50 hover:text-emerald-800'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Yedekleme & Sıfırlama</span>
            </button>
          </div>
        </aside>

        {/* Dynamic Content Panel */}
        <main className="lg:col-span-9 bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-soft-sm space-y-6">
          {/* TAB 1: ANA SAYFA YÖNETİMİ */}
          {activeTab === 'home' && (
            <div className="space-y-6">
              <div className="border-b border-emerald-100 pb-4">
                <h3 className="font-headline font-bold text-xl text-gray-900">
                  Ana Sayfa Metinleri & Hero Bölümü
                </h3>
                <p className="text-xs text-gray-500">
                  Ana sayfa başlıklarını, açıklama metinlerini, istatistikleri ve öne çıkan maddeleri düzenleyin veya silin.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Hero Rozet Metni (Badge)
                  </label>
                  <input
                    type="text"
                    value={data.home.heroBadge}
                    onChange={(e) => updateHome({ heroBadge: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-surface-subtle"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Ana Başlık 1. Kısım
                    </label>
                    <input
                      type="text"
                      value={data.home.heroTitle}
                      onChange={(e) => updateHome({ heroTitle: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-surface-subtle"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Ana Başlık Vurgulu Kısım (Yeşil)
                    </label>
                    <input
                      type="text"
                      value={data.home.heroTitleHighlight}
                      onChange={(e) => updateHome({ heroTitleHighlight: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-surface-subtle"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Hero Açıklama Metni
                  </label>
                  <textarea
                    rows={3}
                    value={data.home.heroDescription}
                    onChange={(e) => updateHome({ heroDescription: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-surface-subtle"
                  />
                </div>

                {/* Stat Cards Deletion & Addition */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-headline font-bold text-sm text-gray-900">
                      Öne Çıkan İstatistikler ({data.home.stats.length})
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {data.home.stats.map((st, idx) => (
                      <div key={st.id} className="p-4 rounded-xl bg-surface-subtle border border-gray-200 space-y-2 relative group">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-semibold text-emerald-800">İstatistik #{idx + 1}</span>
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteTarget({
                                type: 'stat',
                                id: st.id,
                                title: st.label,
                              })
                            }
                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                            title="İstatistiği Sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={st.number}
                          onChange={(e) => {
                            const newStats = [...data.home.stats];
                            newStats[idx].number = e.target.value;
                            updateHome({ stats: newStats });
                          }}
                          placeholder="Sayı (Örn: 15+)"
                          className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-white"
                        />
                        <input
                          type="text"
                          value={st.label}
                          onChange={(e) => {
                            const newStats = [...data.home.stats];
                            newStats[idx].label = e.target.value;
                            updateHome({ stats: newStats });
                          }}
                          placeholder="Açıklama (Örn: Yıllık Tecrübe)"
                          className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-white"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Add Stat Control */}
                  <div className="mt-3 p-3 rounded-xl bg-emerald-50/50 border border-emerald-100 flex flex-col sm:flex-row gap-2 items-center">
                    <input
                      type="text"
                      value={newStatInput.number}
                      onChange={(e) => setNewStatInput({ ...newStatInput, number: e.target.value })}
                      placeholder="Yeni Sayı (Örn: 100+)"
                      className="w-full sm:w-1/3 px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-white"
                    />
                    <input
                      type="text"
                      value={newStatInput.label}
                      onChange={(e) => setNewStatInput({ ...newStatInput, label: e.target.value })}
                      placeholder="Yeni İstatistik Başlığı"
                      className="w-full sm:w-1/2 px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newStatInput.number && newStatInput.label) {
                          addStat(newStatInput);
                          setNewStatInput({ number: '', label: '', icon: 'Award' });
                          showNotification('Yeni istatistik eklendi.');
                        }
                      }}
                      className="w-full sm:w-auto px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold shrink-0"
                    >
                      Ekle
                    </button>
                  </div>
                </div>

                {/* About Highlight Points Deletion & Addition */}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <h4 className="font-headline font-bold text-sm text-gray-900">
                    Öne Çıkan Madde & Avantajlar ({data.home.aboutHighlightPoints.length})
                  </h4>
                  <div className="space-y-2">
                    {data.home.aboutHighlightPoints.map((point, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={point}
                          onChange={(e) => {
                            const newPoints = [...data.home.aboutHighlightPoints];
                            newPoints[idx] = e.target.value;
                            updateHome({ aboutHighlightPoints: newPoints });
                          }}
                          className="flex-grow px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-surface-subtle"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setDeleteTarget({
                              type: 'aboutPoint',
                              id: idx,
                              title: point,
                            })
                          }
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                          title="Maddeyi Sil"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newAboutPointInput}
                      onChange={(e) => setNewAboutPointInput(e.target.value)}
                      placeholder="Yeni avantaj maddesi yazın..."
                      className="flex-grow px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newAboutPointInput.trim()) {
                          addAboutPoint(newAboutPointInput);
                          setNewAboutPointInput('');
                          showNotification('Yeni madde eklendi.');
                        }
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold shrink-0"
                    >
                      Madde Ekle
                    </button>
                  </div>
                </div>

                {/* Home Video Engine Management Section */}
                <div className="pt-6 border-t border-emerald-100 space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Film className="w-5 h-5 text-emerald-600" />
                      <h4 className="font-headline font-bold text-sm text-gray-900">
                        Tanıtım Videosu & Medya Motoru Yönetimi
                      </h4>
                    </div>
                    
                    <label className="inline-flex items-center gap-2 cursor-pointer bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200">
                      <input
                        type="checkbox"
                        checked={data.home.videoEnabled !== false}
                        onChange={(e) => updateHome({ videoEnabled: e.target.checked })}
                        className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                      />
                      <span className="text-xs font-semibold text-emerald-900">
                        {data.home.videoEnabled !== false ? 'Video Yayında (Aktif)' : 'Video Gizli (Pasif)'}
                      </span>
                    </label>
                  </div>

                  <p className="text-xs text-gray-500">
                    Ana sayfadaki tanıtım videosunun dosya yolunu, kapak görselini, başlık ve açıklama metinlerini buradan düzenleyebilirsiniz.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Video Dosya Yolu / URL
                      </label>
                      <input
                        type="text"
                        value={data.home.videoUrl || ''}
                        onChange={(e) => updateHome({ videoUrl: e.target.value })}
                        placeholder="Örn: /assets/videos/akyol-promo.mp4"
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs bg-surface-subtle font-mono"
                      />
                      <div className="mt-1 flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            updateHome({ videoUrl: '/assets/videos/akyol-promo.mp4' });
                            showNotification('Varsayılan yerel video yolu seçildi.');
                          }}
                          className="text-[10px] text-emerald-700 underline font-medium"
                        >
                          Varsayılan Yerel Videoyu Seç (/assets/videos/akyol-promo.mp4)
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Video Kapak Görseli (Poster) URL
                      </label>
                      <input
                        type="text"
                        value={data.home.videoPoster || ''}
                        onChange={(e) => updateHome({ videoPoster: e.target.value })}
                        placeholder="Örn: /assets/facility.png"
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs bg-surface-subtle font-mono"
                      />
                      <div className="mt-1 flex gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            updateHome({ videoPoster: '/assets/facility.png' });
                            showNotification('Varsayılan tesis görseli seçildi.');
                          }}
                          className="text-[10px] text-emerald-700 underline font-medium"
                        >
                          Varsayılan Görseli Seç (/assets/facility.png)
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Video Rozet Metni (Badge)
                      </label>
                      <input
                        type="text"
                        value={data.home.videoBadge || ''}
                        onChange={(e) => updateHome({ videoBadge: e.target.value })}
                        placeholder="Örn: Tanıtım Videosu & Tesis Turu"
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Video Başlığı
                      </label>
                      <input
                        type="text"
                        value={data.home.videoTitle || ''}
                        onChange={(e) => updateHome({ videoTitle: e.target.value })}
                        placeholder="Örn: Modern Tesisimiz & İleri Geri Dönüşüm Teknolojimiz"
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Video Açıklama Metni
                    </label>
                    <textarea
                      rows={2}
                      value={data.home.videoDescription || ''}
                      onChange={(e) => updateHome({ videoDescription: e.target.value })}
                      placeholder="Video altındaki detaylı tanıtım açıklaması..."
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs bg-white"
                    />
                  </div>

                  {/* Video Live Preview inside Admin */}
                  <div className="p-4 rounded-2xl bg-surface-subtle border border-gray-200 space-y-2">
                    <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Yönetici Canlı Video Önizlemesi:</span>
                    </span>
                    <div className="relative rounded-xl overflow-hidden bg-black max-w-lg aspect-video">
                      <video
                        src={data.home.videoUrl || '/assets/videos/akyol-promo.mp4'}
                        poster={data.home.videoPoster || '/assets/facility.png'}
                        controls
                        muted
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => showNotification('Ana sayfa ve video motoru değişiklikleri canlı kaydedildi!')}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow-soft-sm hover:bg-emerald-700 transition-colors mt-4"
                >
                  <Save className="w-4 h-4" />
                  <span>Değişiklikleri Canlı Kaydet</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: HAKKIMIZDA YÖNETİMİ */}
          {activeTab === 'about' && (
            <div className="space-y-6">
              <div className="border-b border-emerald-100 pb-4">
                <h3 className="font-headline font-bold text-xl text-gray-900">
                  Hakkımızda Sayfası İçerikleri & Blokları
                </h3>
                <p className="text-xs text-gray-500">
                  Kurumsal hikaye paragrafları, misyon, vizyon, lisans detayları ve değer kartlarını yönetin veya silin.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Hakkımızda Sayfa Başlığı
                  </label>
                  <input
                    type="text"
                    value={data.about.heroTitle}
                    onChange={(e) => updateAbout({ heroTitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-surface-subtle"
                  />
                </div>

                {/* Story Paragraphs Management */}
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-semibold text-gray-700">
                    Hikaye Paragrafları ({data.about.storyParagraphs.length})
                  </label>
                  {data.about.storyParagraphs.map((para, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <textarea
                        rows={2}
                        value={para}
                        onChange={(e) => {
                          const newParas = [...data.about.storyParagraphs];
                          newParas[idx] = e.target.value;
                          updateAbout({ storyParagraphs: newParas });
                        }}
                        className="flex-grow px-3 py-2 rounded-xl border border-gray-200 text-xs bg-surface-subtle"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteTarget({
                            type: 'storyPara',
                            id: idx,
                            title: `Paragraf #${idx + 1}`,
                          })
                        }
                        className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                        title="Paragrafı Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  <div className="flex gap-2 pt-1">
                    <textarea
                      rows={2}
                      value={newStoryParagraphInput}
                      onChange={(e) => setNewStoryParagraphInput(e.target.value)}
                      placeholder="Yeni paragraf metni yazın..."
                      className="flex-grow px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newStoryParagraphInput.trim()) {
                          addStoryParagraph(newStoryParagraphInput);
                          setNewStoryParagraphInput('');
                          showNotification('Yeni hikaye paragrafı eklendi.');
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold shrink-0 self-center"
                    >
                      Paragraf Ekle
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Misyon Metni
                    </label>
                    <textarea
                      rows={3}
                      value={data.about.missionText}
                      onChange={(e) => updateAbout({ missionText: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-surface-subtle"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Vizyon Metni
                    </label>
                    <textarea
                      rows={3}
                      value={data.about.visionText}
                      onChange={(e) => updateAbout({ visionText: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-surface-subtle"
                    />
                  </div>
                </div>

                {/* License Details Management */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <label className="block text-xs font-semibold text-gray-700">
                    Lisans & Çevre Belgesi Maddeleri ({data.about.licenseDetails.length})
                  </label>
                  {data.about.licenseDetails.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={detail}
                        onChange={(e) => {
                          const newDetails = [...data.about.licenseDetails];
                          newDetails[idx] = e.target.value;
                          updateAbout({ licenseDetails: newDetails });
                        }}
                        className="flex-grow px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-surface-subtle"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteTarget({
                            type: 'licenseDetail',
                            id: idx,
                            title: detail,
                          })
                        }
                        className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                        title="Lisans Maddesini Sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newLicenseDetailInput}
                      onChange={(e) => setNewLicenseDetailInput(e.target.value)}
                      placeholder="Yeni lisans/sertifika maddesi..."
                      className="flex-grow px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newLicenseDetailInput.trim()) {
                          addLicenseDetail(newLicenseDetailInput);
                          setNewLicenseDetailInput('');
                          showNotification('Lisans maddesi eklendi.');
                        }
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold shrink-0"
                    >
                      Madde Ekle
                    </button>
                  </div>
                </div>

                {/* Values Deletion & Addition */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <label className="block text-xs font-semibold text-gray-700">
                    Kurumsal Değer Kartları ({data.about.values.length})
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {data.about.values.map((val) => (
                      <div key={val.id} className="p-3 bg-surface-subtle rounded-xl border border-gray-200 space-y-1 relative">
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-gray-800">{val.title}</span>
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteTarget({
                                type: 'valueItem',
                                id: val.id,
                                title: val.title,
                              })
                            }
                            className="p-1 text-red-500 hover:text-red-700"
                            title="Kartı Sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-gray-600">{val.description}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-2">
                    <input
                      type="text"
                      value={newValueInput.title}
                      onChange={(e) => setNewValueInput({ ...newValueInput, title: e.target.value })}
                      placeholder="Değer Başlığı (Örn: Hızlı Lojistik)"
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-white"
                    />
                    <input
                      type="text"
                      value={newValueInput.description}
                      onChange={(e) => setNewValueInput({ ...newValueInput, description: e.target.value })}
                      placeholder="Değer Açıklaması..."
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newValueInput.title && newValueInput.description) {
                          addValueItem(newValueInput);
                          setNewValueInput({ title: '', description: '', icon: 'Leaf' });
                          showNotification('Yeni değer kartı eklendi.');
                        }
                      }}
                      className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold"
                    >
                      Yeni Değer Kartı Ekle
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => showNotification('Hakkımızda içerikleri canlı olarak güncellendi!')}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow-soft-sm hover:bg-emerald-700 transition-colors mt-4"
                >
                  <Save className="w-4 h-4" />
                  <span>Değişiklikleri Canlı Kaydet</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: HİZMETLER CMS (TAM CRUD & AKTİF SİLME İŞLEYİCİSİ) */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-emerald-100 pb-4">
                <div>
                  <h3 className="font-headline font-bold text-xl text-gray-900">
                    Hizmetler Yönetimi (CRUD & Silme İşleyicisi)
                  </h3>
                  <p className="text-xs text-gray-500">
                    Hizmetleri düzenleyin, yayın durumunu değiştirin veya tek tıkla silin.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={openNewServiceModal}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow-soft-sm hover:bg-emerald-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Yeni Hizmet Ekle</span>
                </button>
              </div>

              <div className="space-y-3">
                {data.services.map((srv) => (
                  <div
                    key={srv.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-4 ${
                      srv.isActive
                        ? 'bg-white border-emerald-200 shadow-soft-sm'
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 overflow-hidden shrink-0">
                        <img
                          src={srv.image || '/assets/scrap-metals.png'}
                          alt={srv.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-headline font-bold text-sm text-gray-900">
                            {srv.title}
                          </h4>
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-semibold">
                            {srv.category}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Slug: <span className="font-mono text-emerald-700">/services/{srv.slug}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          toggleServiceStatus(srv.id);
                          showNotification(`"${srv.title}" durumu güncellendi.`);
                        }}
                        className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                          srv.isActive
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                            : 'bg-gray-100 border-gray-200 text-gray-600'
                        }`}
                        title={srv.isActive ? 'Yayında (Tıkla Pasif Yap)' : 'Taslak (Tıkla Yayına Al)'}
                      >
                        {srv.isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        <span className="hidden sm:inline">{srv.isActive ? 'Yayında' : 'Taslak'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => openEditServiceModal(srv)}
                        className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-1"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Düzenle</span>
                      </button>

                      {/* Explicit Deletion Trigger with Confirmation Modal */}
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteTarget({
                            type: 'service',
                            id: srv.id,
                            title: srv.title,
                          })
                        }
                        className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-semibold flex items-center gap-1 transition-colors"
                        title="Hizmeti Sil"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Sil</span>
                      </button>
                    </div>
                  </div>
                ))}

                {data.services.length === 0 && (
                  <div className="p-8 text-center bg-surface-subtle rounded-2xl border border-gray-200 text-gray-500 text-xs">
                    Henüz eklenmiş bir hizmet bulunmamaktadır. Yukarıdaki butona tıklayarak yeni hizmet ekleyebilirsiniz.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: İLETİŞİM & ŞİRKET BİLGİLERİ */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <div className="border-b border-emerald-100 pb-4">
                <h3 className="font-headline font-bold text-xl text-gray-900 flex items-center gap-2">
                  <PhoneCall className="w-5 h-5 text-emerald-600" />
                  <span>İletişim & Şirket Bilgileri CMS</span>
                </h3>
                <p className="text-xs text-gray-500">
                  Kurumsal telefon, adres, çalışma saatleri, e-posta ve Google Haritalar entegrasyonunu canlı olarak yönetin.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Şirket Resmi Ünvanı
                    </label>
                    <input
                      type="text"
                      value={data.settings.companyName}
                      onChange={(e) => updateSettings({ companyName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-surface-subtle"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Şirket Sloganı
                    </label>
                    <input
                      type="text"
                      value={data.settings.slogan}
                      onChange={(e) => updateSettings({ slogan: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-surface-subtle"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-semibold text-gray-700">
                      Açık Fiziksel Adres
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        updateSettings({
                          address: 'İnönü Mah., Yavuz Sultan Selim Cd. no:77, 35870 Torbalı/İzmir, Türkiye',
                        });
                        showNotification('Varsayılan resmi adres uygulandı.');
                      }}
                      className="text-[10px] text-emerald-700 underline font-medium"
                    >
                      Resmi Adresi Uygula (Torbalı / İzmir)
                    </button>
                  </div>
                  <input
                    type="text"
                    value={data.settings.address}
                    onChange={(e) => updateSettings({ address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-surface-subtle"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Birincil Telefon Numarası
                    </label>
                    <input
                      type="text"
                      value={data.settings.phone}
                      onChange={(e) => updateSettings({ phone: e.target.value })}
                      placeholder="0533 935 09 36"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-surface-subtle"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Arama Bağlantısı (tel:+90...)
                    </label>
                    <input
                      type="text"
                      value={data.settings.phoneRaw}
                      onChange={(e) => updateSettings({ phoneRaw: e.target.value })}
                      placeholder="+905339350936"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-surface-subtle font-mono text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      WhatsApp Hattı
                    </label>
                    <input
                      type="text"
                      value={data.settings.whatsapp}
                      onChange={(e) => updateSettings({ whatsapp: e.target.value })}
                      placeholder="905339350936"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-surface-subtle font-mono text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Çalışma Saatleri Metni
                    </label>
                    <input
                      type="text"
                      value={data.settings.workingHours}
                      onChange={(e) => updateSettings({ workingHours: e.target.value })}
                      placeholder="Pazartesi - Cumartesi: 08:00 - 20:00 | Pazar: Kapalı"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-surface-subtle"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Kurumsal E-posta Adresi
                    </label>
                    <input
                      type="email"
                      value={data.settings.email}
                      onChange={(e) => updateSettings({ email: e.target.value })}
                      placeholder="info@akyolmetal.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-surface-subtle"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Lisans Durumu Metni
                  </label>
                  <input
                    type="text"
                    value={data.settings.licenseText}
                    onChange={(e) => updateSettings({ licenseText: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-surface-subtle"
                  />
                </div>

                {/* Google Maps Configuration */}
                <div className="pt-4 border-t border-gray-100 space-y-4">
                  <h4 className="font-headline font-bold text-sm text-gray-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>Google Haritalar Entegrasyonu</span>
                  </h4>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Google Maps Iframe Embed URL
                    </label>
                    <input
                      type="text"
                      value={data.settings.googleMapsEmbedUrl}
                      onChange={(e) => updateSettings({ googleMapsEmbedUrl: e.target.value })}
                      placeholder="https://www.google.com/maps/embed?..."
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 text-xs bg-surface-subtle font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Google Maps Doğrudan Yol Tarifi Linki
                    </label>
                    <input
                      type="text"
                      value={data.settings.googleMapsUrl}
                      onChange={(e) => updateSettings({ googleMapsUrl: e.target.value })}
                      placeholder="https://maps.google.com/?q=..."
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 text-xs bg-surface-subtle font-mono"
                    />
                  </div>

                  {/* Live Map Preview */}
                  <div className="rounded-2xl overflow-hidden border border-gray-200 h-48 bg-gray-100">
                    <iframe
                      title="Harita Önizleme"
                      src={data.settings.googleMapsEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => showNotification('Şirket ve iletişim bilgileri canlı kaydedildi!')}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow-soft-sm hover:bg-emerald-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Değişiklikleri Canlı Kaydet</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: GELEN KUTUSU (TAM SİLME VE TOPLU TEMİZLEME İŞLEYİCİSİ) */}
          {activeTab === 'inbox' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-emerald-100 pb-4">
                <div>
                  <h3 className="font-headline font-bold text-xl text-gray-900">
                    Gelen Kutusu (İletişim & Teklif Formu Mesajları)
                  </h3>
                  <p className="text-xs text-gray-500">
                    Toplam {data.messages.length} mesaj ({data.messages.filter((m) => !m.isRead).length} okunmamış).
                  </p>
                </div>

                {data.messages.length > 0 && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteTarget({
                          type: 'clearReadMessages',
                          id: 'all-read',
                          title: 'Okunmuş Tüm Mesajlar',
                        })
                      }
                      className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold"
                    >
                      Okunanları Sil
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteTarget({
                          type: 'clearAllMessages',
                          id: 'all',
                          title: 'Gelen Kutusundaki Tüm Mesajlar',
                        })
                      }
                      className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold"
                    >
                      Tümünü Temizle
                    </button>
                  </div>
                )}
              </div>

              {data.messages.length === 0 ? (
                <div className="text-center py-12 bg-surface-subtle rounded-2xl border border-gray-200 p-6 text-gray-500 text-xs">
                  Gelen kutunuzda mesaj bulunmamaktadır.
                </div>
              ) : (
                <div className="space-y-4">
                  {data.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-5 rounded-2xl border transition-all space-y-3 ${
                        msg.isRead
                          ? 'bg-white border-gray-200'
                          : 'bg-emerald-50/50 border-emerald-300 shadow-soft-sm'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-headline font-bold text-sm text-gray-900">
                            {msg.name}
                          </h4>
                          {!msg.isRead && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                              Yeni Mesaj
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-gray-400 font-mono">
                          {msg.createdAt}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700 bg-white/70 p-3 rounded-xl border border-gray-100">
                        <div>
                          <strong>Telefon:</strong>{' '}
                          <a
                            href={`tel:${msg.phone}`}
                            className="text-emerald-700 font-bold hover:underline"
                          >
                            {msg.phone}
                          </a>
                        </div>
                        {msg.email && (
                          <div>
                            <strong>E-posta:</strong> {msg.email}
                          </div>
                        )}
                        {msg.service && (
                          <div>
                            <strong>Hizmet:</strong> {msg.service}
                          </div>
                        )}
                        {msg.estimatedAmount && (
                          <div>
                            <strong>Miktar:</strong> {msg.estimatedAmount}
                          </div>
                        )}
                      </div>

                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed bg-white p-3 rounded-xl border border-gray-100">
                        {msg.message}
                      </p>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <div className="flex items-center gap-2">
                          <a
                            href={`https://wa.me/${msg.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Sayın ${msg.name}, Akyol Metal Geri Dönüşüm web sitemiz üzerinden ilettiğiniz talebinizle ilgili ulaşıyoruz.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] text-white text-xs font-semibold"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp ile Yanıtla</span>
                          </a>

                          <a
                            href={`tel:${msg.phone}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200"
                          >
                            <PhoneCall className="w-3.5 h-3.5" />
                            <span>Arayın</span>
                          </a>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => markMessageRead(msg.id, !msg.isRead)}
                            className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold"
                          >
                            {msg.isRead ? 'Okunmadı Olarak İşaretle' : 'Okundu Olarak İşaretle'}
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setDeleteTarget({
                                type: 'message',
                                id: msg.id,
                                title: msg.name,
                              })
                            }
                            className="p-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100"
                            title="Mesajı Sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: GÖRSEL & MEDYA REHBERİ */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="border-b border-emerald-100 pb-4">
                <h3 className="font-headline font-bold text-xl text-gray-900">
                  Görsel & Medya Rehberi
                </h3>
                <p className="text-xs text-gray-500">
                  Tüm görseller yerel olarak <code className="font-mono bg-gray-100 px-1 py-0.5 rounded">public/assets/</code> klasöründen servis edilmektedir.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-2">
                <p className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Logo ve Görsel Değiştirme Kuralı:</span>
                </p>
                <p>
                  Resmi logo dosyası <code className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-emerald-200">public/assets/logo.png</code> konumundadır. Logonuzu güncellemek için aynı isimle bu dosyayı değiştirebilirsiniz. Ayrıntılı talimatlar için projenin kök dizinindeki <code className="font-mono font-bold">IMAGE_GUIDE.md</code> dosyasını inceleyebilirsiniz.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { name: 'akyol-promo.mp4', path: '/assets/videos/akyol-promo.mp4', label: 'Ana Sayfa Yerel Tanıtım Videosu (MP4)', isVideo: true },
                  { name: 'logo.png', path: '/assets/logo.png', label: 'Resmi Yeşil Geri Dönüşüm Logosu', isVideo: false },
                  { name: 'facility.png', path: '/assets/facility.png', label: 'Torbalı Modern Tesis Fotoğrafı', isVideo: false },
                  { name: 'scrap-metals.png', path: '/assets/scrap-metals.png', label: 'Ayrıştırılmış Hurda Metaller', isVideo: false },
                  { name: 'briquetting.png', path: '/assets/briquetting.png', label: 'Hidrolik Briketleme Presi', isVideo: false },
                  { name: 'factory-sokum.png', path: '/assets/factory-sokum.png', label: 'Fabrika ve Çelik Çatı Sökümü', isVideo: false },
                  { name: 'container-service.png', path: '/assets/container-service.png', label: 'Ücretsiz Hurda Konteyneri', isVideo: false },
                ].map((asset) => (
                  <div key={asset.name} className="p-3 bg-surface-subtle rounded-2xl border border-gray-200 space-y-2">
                    <div className="h-28 bg-white rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center p-2">
                      {asset.isVideo ? (
                        <div className="flex flex-col items-center justify-center gap-1 text-emerald-700">
                          <Film className="w-8 h-8 text-emerald-600" />
                          <span className="text-[10px] font-bold">Video Dosyası</span>
                        </div>
                      ) : (
                        <img src={asset.path} alt={asset.label} className="w-full h-full object-contain" />
                      )}
                    </div>
                    <div>
                      <p className="font-mono text-[11px] font-bold text-gray-900">{asset.name}</p>
                      <p className="text-[10px] text-gray-500">{asset.label}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(asset.path);
                        showNotification(`Dosya yolu kopyalandı: ${asset.path}`);
                      }}
                      className="w-full py-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 text-[10px] font-semibold hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                    >
                      Yolu Kopyala ({asset.path})
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: YEDEKLEME & SIFIRLAMA */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="border-b border-emerald-100 pb-4">
                <h3 className="font-headline font-bold text-xl text-gray-900">
                  Veri Yedekleme, Dışa Aktarma & Sıfırlama
                </h3>
                <p className="text-xs text-gray-500">
                  Tüm web sitesi içeriklerini JSON olarak dışa aktarabilir, yedekten yükleyebilir veya ilk fabrika ayarlarına döndürebilirsiniz.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Export Card */}
                <div className="p-6 rounded-2xl bg-surface-subtle border border-emerald-100 space-y-3">
                  <h4 className="font-headline font-bold text-sm text-gray-900 flex items-center gap-2">
                    <Download className="w-4 h-4 text-emerald-600" />
                    <span>Verileri Dışa Aktar (JSON)</span>
                  </h4>
                  <p className="text-xs text-gray-500">
                    Tüm sayfa metinlerini, hizmetleri ve mesajları içeren tam CMS yedeğini indirin.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      const jsonStr = exportDataJson();
                      const blob = new Blob([jsonStr], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `akyol_metal_cms_backup_${Date.now()}.json`;
                      a.click();
                      showNotification('CMS yedeği başarıyla indirildi!');
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 transition-colors shadow-soft-sm"
                  >
                    Yedeği İndir (.json)
                  </button>
                </div>

                {/* Reset Card */}
                <div className="p-6 rounded-2xl bg-red-50/50 border border-red-200 space-y-3">
                  <h4 className="font-headline font-bold text-sm text-red-900 flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-red-600" />
                    <span>Fabrika Ayarlarına Döndür</span>
                  </h4>
                  <p className="text-xs text-red-700">
                    Tüm CMS ayarlarını ve hizmet listesini ilk orijinal Türkçe durumuna sıfırlar.
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setDeleteTarget({
                        type: 'resetDefaults',
                        id: 'defaults',
                        title: 'Tüm CMS Verileri',
                      })
                    }
                    className="px-4 py-2 rounded-xl bg-red-600 text-white font-semibold text-xs hover:bg-red-700 transition-colors shadow-soft-sm"
                  >
                    Varsayılanlara Sıfırla
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* IN-APP DELETE CONFIRMATION MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-red-200 shadow-2xl space-y-5 animate-fadeIn text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="font-headline font-bold text-xl text-gray-900">
                Silme Onayı
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                <span className="font-semibold text-gray-900">&quot;{deleteTarget.title}&quot;</span> öğesini kalıcı olarak silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
              </p>
            </div>

            <div className="flex gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors"
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={confirmDeleteExecution}
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors shadow-soft-sm"
              >
                Evet, Sil
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SERVICE MODAL (ADD / EDIT) */}
      {serviceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 border border-emerald-200 shadow-2xl animate-fadeIn">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <h3 className="font-headline font-bold text-xl text-gray-900">
                {editingServiceId ? 'Hizmeti Düzenle' : 'Yeni Hizmet Ekle'}
              </h3>
              <button
                type="button"
                onClick={() => setServiceModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Hizmet Başlığı *</label>
                  <input
                    type="text"
                    required
                    value={serviceFormData.title || ''}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = title
                        .toLowerCase()
                        .replace(/[^a-z0-9ğüşıöç]/g, '-')
                        .replace(/ğ/g, 'g')
                        .replace(/ü/g, 'u')
                        .replace(/ş/g, 's')
                        .replace(/ı/g, 'i')
                        .replace(/ö/g, 'o')
                        .replace(/ç/g, 'c')
                        .replace(/-+/g, '-');
                      setServiceFormData({
                        ...serviceFormData,
                        title,
                        slug: editingServiceId ? serviceFormData.slug : slug,
                      });
                    }}
                    placeholder="Örn: Hurda Çinko Alımı"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-surface-subtle"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Slug (URL Adresi) *</label>
                  <input
                    type="text"
                    required
                    value={serviceFormData.slug || ''}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, slug: e.target.value })}
                    placeholder="hurda-cinko-alimi"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-surface-subtle font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Kategori</label>
                  <input
                    type="text"
                    value={serviceFormData.category || ''}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, category: e.target.value })}
                    placeholder="Demir Dışı Metaller"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-surface-subtle"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Rozet / Etiket (Opsiyonel)</label>
                  <input
                    type="text"
                    value={serviceFormData.badge || ''}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, badge: e.target.value })}
                    placeholder="En Çok Tercih Edilen"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-surface-subtle"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Görsel Yolu (Local /assets/...)</label>
                <input
                  type="text"
                  value={serviceFormData.image || ''}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, image: e.target.value })}
                  placeholder="/assets/scrap-metals.png"
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-surface-subtle font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Kısa Açıklama (Kart Metni)</label>
                <textarea
                  rows={2}
                  value={serviceFormData.shortDescription || ''}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, shortDescription: e.target.value })}
                  placeholder="Kısa özet açıklama..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-surface-subtle"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Detaylı Açıklama (Sayfa Metni)</label>
                <textarea
                  rows={4}
                  value={serviceFormData.fullDescription || ''}
                  onChange={(e) => setServiceFormData({ ...serviceFormData, fullDescription: e.target.value })}
                  placeholder="Hizmetin kapsamlı açıklaması, işlem detayları ve avantajları..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-surface-subtle"
                />
              </div>

              {/* Service Features Management */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <label className="block font-semibold text-gray-700">Öne Çıkan Özellikler</label>
                {serviceFormData.features?.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={feat}
                      onChange={(e) => {
                        const newFeats = [...(serviceFormData.features || [])];
                        newFeats[idx] = e.target.value;
                        setServiceFormData({ ...serviceFormData, features: newFeats });
                      }}
                      className="flex-grow px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-surface-subtle"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newFeats = serviceFormData.features?.filter((_, i) => i !== idx);
                        setServiceFormData({ ...serviceFormData, features: newFeats });
                      }}
                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    setServiceFormData({
                      ...serviceFormData,
                      features: [...(serviceFormData.features || []), ''],
                    });
                  }}
                  className="text-xs text-emerald-700 font-bold hover:underline"
                >
                  + Özellik Ekle
                </button>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={serviceFormData.isActive ?? true}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="font-semibold text-gray-800">Yayında (Aktif)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={serviceFormData.highlight ?? false}
                    onChange={(e) => setServiceFormData({ ...serviceFormData, highlight: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="font-semibold text-gray-800">Ana Sayfada Öne Çıkar</span>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setServiceModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-soft-sm"
                >
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
