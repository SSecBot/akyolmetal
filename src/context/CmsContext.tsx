'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  FullCmsData,
  SiteSettings,
  HomePageData,
  AboutPageData,
  ServiceItem,
  ContactMessage,
  StatItem,
  ValueItem,
} from '@/types/cms';
import { initialCmsData } from '@/data/initialCmsData';

interface CmsContextType {
  data: FullCmsData;
  isLoaded: boolean;
  updateSettings: (settings: Partial<SiteSettings>) => void;
  updateHome: (home: Partial<HomePageData>) => void;
  updateAbout: (about: Partial<AboutPageData>) => void;
  // Stats
  addStat: (stat: Omit<StatItem, 'id'>) => void;
  deleteStat: (id: string) => void;
  // Home About points
  addAboutPoint: (point: string) => void;
  deleteAboutPoint: (index: number) => void;
  // About Story Paragraphs
  addStoryParagraph: (para: string) => void;
  deleteStoryParagraph: (index: number) => void;
  // About License Details
  addLicenseDetail: (detail: string) => void;
  deleteLicenseDetail: (index: number) => void;
  // About Values
  addValueItem: (val: Omit<ValueItem, 'id'>) => void;
  deleteValueItem: (id: string) => void;
  // Services
  addService: (service: Omit<ServiceItem, 'id'>) => ServiceItem;
  updateService: (id: string, service: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  toggleServiceStatus: (id: string) => void;
  // Messages / Inbox
  addMessage: (message: Omit<ContactMessage, 'id' | 'createdAt' | 'isRead'>) => void;
  markMessageRead: (id: string, isRead?: boolean) => void;
  deleteMessage: (id: string) => void;
  clearAllMessages: () => void;
  clearReadMessages: () => void;
  // Global
  resetToDefault: () => void;
  exportDataJson: () => string;
  importDataJson: (json: string) => boolean;
}

const STORAGE_KEY = 'akyol_metal_cms_state_v1';

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<FullCmsData>(initialCmsData);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Initialize from LocalStorage or fallback
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setData(parsed);
      }
    } catch (err) {
      console.warn('LocalStorage error, using default initial data', err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes to LocalStorage
  const persist = (newData: FullCmsData) => {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (err) {
      console.error('Failed to persist to localStorage', err);
    }
  };

  const updateSettings = (partial: Partial<SiteSettings>) => {
    const updated = {
      ...data,
      settings: { ...data.settings, ...partial },
    };
    persist(updated);
  };

  const updateHome = (partial: Partial<HomePageData>) => {
    const updated = {
      ...data,
      home: { ...data.home, ...partial },
    };
    persist(updated);
  };

  const updateAbout = (partial: Partial<AboutPageData>) => {
    const updated = {
      ...data,
      about: { ...data.about, ...partial },
    };
    persist(updated);
  };

  // Stats Management
  const addStat = (stat: Omit<StatItem, 'id'>) => {
    const newStat: StatItem = { ...stat, id: 'stat-' + Date.now() };
    const updated = {
      ...data,
      home: {
        ...data.home,
        stats: [...data.home.stats, newStat],
      },
    };
    persist(updated);
  };

  const deleteStat = (id: string) => {
    const updatedStats = data.home.stats.filter((s) => s.id !== id);
    const updated = {
      ...data,
      home: {
        ...data.home,
        stats: updatedStats,
      },
    };
    persist(updated);
  };

  // Home About Points
  const addAboutPoint = (point: string) => {
    if (!point.trim()) return;
    const updated = {
      ...data,
      home: {
        ...data.home,
        aboutHighlightPoints: [...data.home.aboutHighlightPoints, point.trim()],
      },
    };
    persist(updated);
  };

  const deleteAboutPoint = (index: number) => {
    const updatedPoints = data.home.aboutHighlightPoints.filter((_, i) => i !== index);
    const updated = {
      ...data,
      home: {
        ...data.home,
        aboutHighlightPoints: updatedPoints,
      },
    };
    persist(updated);
  };

  // About Story Paragraphs
  const addStoryParagraph = (para: string) => {
    if (!para.trim()) return;
    const updated = {
      ...data,
      about: {
        ...data.about,
        storyParagraphs: [...data.about.storyParagraphs, para.trim()],
      },
    };
    persist(updated);
  };

  const deleteStoryParagraph = (index: number) => {
    const updatedParas = data.about.storyParagraphs.filter((_, i) => i !== index);
    const updated = {
      ...data,
      about: {
        ...data.about,
        storyParagraphs: updatedParas,
      },
    };
    persist(updated);
  };

  // About License Details
  const addLicenseDetail = (detail: string) => {
    if (!detail.trim()) return;
    const updated = {
      ...data,
      about: {
        ...data.about,
        licenseDetails: [...data.about.licenseDetails, detail.trim()],
      },
    };
    persist(updated);
  };

  const deleteLicenseDetail = (index: number) => {
    const updatedDetails = data.about.licenseDetails.filter((_, i) => i !== index);
    const updated = {
      ...data,
      about: {
        ...data.about,
        licenseDetails: updatedDetails,
      },
    };
    persist(updated);
  };

  // About Values
  const addValueItem = (val: Omit<ValueItem, 'id'>) => {
    const newVal: ValueItem = { ...val, id: 'val-' + Date.now() };
    const updated = {
      ...data,
      about: {
        ...data.about,
        values: [...data.about.values, newVal],
      },
    };
    persist(updated);
  };

  const deleteValueItem = (id: string) => {
    const updatedValues = data.about.values.filter((v) => v.id !== id);
    const updated = {
      ...data,
      about: {
        ...data.about,
        values: updatedValues,
      },
    };
    persist(updated);
  };

  // Services Management
  const addService = (newService: Omit<ServiceItem, 'id'>): ServiceItem => {
    const id = 'srv-' + Date.now();
    const created: ServiceItem = { ...newService, id };
    const updated = {
      ...data,
      services: [...data.services, created],
    };
    persist(updated);
    return created;
  };

  const updateService = (id: string, partial: Partial<ServiceItem>) => {
    const updatedServices = data.services.map((item) =>
      item.id === id ? { ...item, ...partial } : item
    );
    const updated = { ...data, services: updatedServices };
    persist(updated);
  };

  const deleteService = (id: string) => {
    const updatedServices = data.services.filter((item) => item.id !== id);
    const updated = { ...data, services: updatedServices };
    persist(updated);
  };

  const toggleServiceStatus = (id: string) => {
    const updatedServices = data.services.map((item) =>
      item.id === id ? { ...item, isActive: !item.isActive } : item
    );
    const updated = { ...data, services: updatedServices };
    persist(updated);
  };

  // Messages Management
  const addMessage = (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'isRead'>) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newMsg: ContactMessage = {
      ...msg,
      id: 'msg-' + Date.now(),
      createdAt: formattedDate,
      isRead: false,
    };
    const updated = {
      ...data,
      messages: [newMsg, ...data.messages],
    };
    persist(updated);
  };

  const markMessageRead = (id: string, isRead = true) => {
    const updatedMessages = data.messages.map((item) =>
      item.id === id ? { ...item, isRead } : item
    );
    const updated = { ...data, messages: updatedMessages };
    persist(updated);
  };

  const deleteMessage = (id: string) => {
    const updatedMessages = data.messages.filter((item) => item.id !== id);
    const updated = { ...data, messages: updatedMessages };
    persist(updated);
  };

  const clearAllMessages = () => {
    const updated = { ...data, messages: [] };
    persist(updated);
  };

  const clearReadMessages = () => {
    const updatedMessages = data.messages.filter((item) => !item.isRead);
    const updated = { ...data, messages: updatedMessages };
    persist(updated);
  };

  const resetToDefault = () => {
    persist(initialCmsData);
  };

  const exportDataJson = (): string => {
    return JSON.stringify(data, null, 2);
  };

  const importDataJson = (json: string): boolean => {
    try {
      const parsed = JSON.parse(json);
      if (parsed && parsed.settings && parsed.home && parsed.services) {
        persist(parsed);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <CmsContext.Provider
      value={{
        data,
        isLoaded,
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
        addMessage,
        markMessageRead,
        deleteMessage,
        clearAllMessages,
        clearReadMessages,
        resetToDefault,
        exportDataJson,
        importDataJson,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
