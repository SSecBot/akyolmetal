export interface SiteSettings {
  companyName: string;
  slogan: string;
  address: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  email: string;
  workingHours: string;
  licenseText: string;
  googleMapsEmbedUrl: string;
  googleMapsUrl: string;
}

export interface StatItem {
  id: string;
  number: string;
  label: string;
  icon: string;
}

export interface HomePageData {
  heroBadge: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroDescription: string;
  heroPrimaryCtaText: string;
  heroSecondaryCtaText: string;
  stats: StatItem[];
  // Video Engine
  videoEnabled: boolean;
  videoUrl: string;
  videoPoster: string;
  videoBadge: string;
  videoTitle: string;
  videoDescription: string;
  // Content Sections
  aboutHighlightBadge: string;
  aboutHighlightTitle: string;
  aboutHighlightDescription1: string;
  aboutHighlightDescription2: string;
  aboutHighlightPoints: string[];
  bentoSectionTitle: string;
  bentoSectionSubtitle: string;
  ctaSectionTitle: string;
  ctaSectionDescription: string;
}

export interface ValueItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface AboutPageData {
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  storyTitle: string;
  storyParagraphs: string[];
  missionTitle: string;
  missionText: string;
  visionTitle: string;
  visionText: string;
  licenseTitle: string;
  licenseDescription: string;
  licenseDetails: string[];
  values: ValueItem[];
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  icon: string;
  image: string;
  highlight: boolean;
  badge?: string;
  features: string[];
  processSteps: string[];
  acceptedMaterials: string[];
  benefits: string[];
  isActive: boolean;
  order: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service?: string;
  estimatedAmount?: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface FullCmsData {
  settings: SiteSettings;
  home: HomePageData;
  about: AboutPageData;
  services: ServiceItem[];
  messages: ContactMessage[];
}
