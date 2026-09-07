# Akyol Metal Geri Dönüşüm - Görsel & Medya Yönetim Rehberi (`IMAGE_GUIDE.md`)

Bu rehber, **Akyol Metal Geri Dönüşüm** web platformunda ve Yönetici CMS panelinde kullanılan tüm yerel görsel varlıkların (`assets`) dosya yapısını, logo değişim adımlarını, önerilen görsel çözünürlüklerini ve dosya formatlarını ayrıntılı olarak açıklamaktadır.

---

## 1. Genel Dosya Yapısı ve Yerel Depolama Standardı

Web sitesinde harici (CDN/URL) görsel bağlantısı kullanılmamakta, tüm görseller doğrudan projenin **`public/assets/`** dizini altından yerel olarak sunulmaktadır.

```
akyolmetal/
├── public/
│   └── assets/
│       ├── logo.png               # Resmi marka logosu (Yeşil geri dönüşüm amblemi)
│       ├── hero-recycle.png       # Ana sayfa 3D dönen geri dönüşüm simgesi
│       ├── facility.png           # Torbalı modern tesis ve saha fotoğrafı
│       ├── scrap-metals.png       # Hurda metal alım-satım görseli
│       ├── briquetting.png        # Hidrolik briketleme ve talaş presleme makinesi
│       ├── factory-sokum.png      # Fabrika, tesis ve çelik çatı söküm fotoğrafı
│       ├── container-service.png  # Sanayi kuruluşları ücretsiz hurda konteyneri
│       ├── copper-scrap.png       # Soyma bakır ve sarı pirinç hurda görseli
│       ├── aluminum-scrap.png     # Alüminyum profil ve paslanmaz çelik hurda görseli
│       ├── cable-scrap.png        # Hurda kablo ve kurşun geri dönüşüm görseli
│       └── license-badge.png      # Çevre Bakanlığı lisans belgesi ve onay rozeti
```

---

## 2. Logo Değiştirme Adımları (`logo.png`)

Web sitesinin üst menü (header), alt menü (footer), mobil menü ve yönetici paneli ekranlarında yer alan resmi logo doğrudan **`public/assets/logo.png`** dosyasından yüklenmektedir.

### Adım Adım Logo Güncelleme:
1. Yeni logonuzu şeffaf arka planlı (**Transparent PNG**) veya yüksek kaliteli formatta hazırlayın.
2. Dosya adını kesinlikle **`logo.png`** olarak adlandırın.
3. Hazırladığınız dosyayı projenin **`public/assets/logo.png`** konumuna kopyalayıp eskisinin üzerine yazın (`overwrite`).
4. Tarayıcınızı yenilediğinizde (`Ctrl + F5` veya `Cmd + Shift + R`), yeni logonuz tüm sayfalarda otomatik olarak görüntülenecektir.

> [!IMPORTANT]
> - **Önerilen Logo Formatı:** `.png` (Saydam / Şeffaf arka plan) veya `.webp`
> - **Önerilen Çözünürlük:** `512 x 512 px` (Kare format) veya `600 x 200 px` (Yatay logo)
> - **Renk Uyumu:** Yeşil tonları (`#10B981`, `#059669`, `#2E7D32`) ve temiz beyaz zemin uyumlu amblem.

---

## 3. Web Sitesi Görsel Listesi, Çözünürlük ve Format Tablosu

| Dosya Adı | Konum & Kullanıldığı Alan | Önerilen Çözünürlük | Önerilen Format | Açıklama |
| :--- | :--- | :--- | :--- | :--- |
| **`logo.png`** | Header, Footer, Admin, Modal | `512 x 512 px` | `.png` (Şeffaf) | Yeşil geri dönüşüm amblemli resmi marka logosu |
| **`hero-recycle.png`** | Ana Sayfa Hero Bölümü | `800 x 800 px` | `.png` (Şeffaf) | 3D döner geri dönüşüm döngü görseli |
| **`facility.png`** | Ana Sayfa & Hakkımızda Tesis | `1200 x 900 px` (4:3) | `.png` / `.webp` / `.jpg` | Torbalı modern geri dönüşüm tesisi ve kantar sahası |
| **`scrap-metals.png`** | Hizmetler Bento Grid & Detay | `1200 x 800 px` (3:2) | `.png` / `.webp` / `.jpg` | Ayrıştırılmış demir, bakır ve alüminyum hurdaları |
| **`briquetting.png`** | Briketleme & Presleme Hizmeti | `1200 x 900 px` (4:3) | `.png` / `.webp` / `.jpg` | Yüksek basınçlı hidrolik talaş briketleme makinesi |
| **`factory-sokum.png`** | Fabrika Söküm & Bozum | `1200 x 900 px` (4:3) | `.png` / `.webp` / `.jpg` | Çelik konstrüksiyon demontajı ve iş makineleri |
| **`container-service.png`** | Ücretsiz Konteyner Hizmeti | `1200 x 900 px` (4:3) | `.png` / `.webp` / `.jpg` | Sanayi fabrikası önünde yeşil hurda konteyneri |
| **`copper-scrap.png`** | Bakır & Sarı Pirinç Alımı | `1000 x 750 px` (4:3) | `.png` / `.webp` / `.jpg` | Soyma bakır kangalları ve sarı talaşı |
| **`aluminum-scrap.png`** | Alüminyum & Paslanmaz Çelik | `1000 x 750 px` (4:3) | `.png` / `.webp` / `.jpg` | Alüminyum profil ve krom hurdaları |
| **`cable-scrap.png`** | Kablo & Kurşun Geri Dönüşümü | `1000 x 750 px` (4:3) | `.png` / `.webp` / `.jpg` | Sanayi kabloları ve granül ayrıştırma |
| **`license-badge.png`** | Lisans Vurgu ve Rozetler | `400 x 400 px` | `.png` (Şeffaf) | Çevre Bakanlığı yetki ve lisans onay rozeti |

---

## 4. Yönetici Paneli Üzerinden Görsel Yönetimi

Yönetici paneli üzerinden hizmet görsellerini yönetmek oldukça pratiktir:

1. **Yönetici Girişi Yapın:** Tarayıcınızda `/dashboard/admin/akyol` adresine gidin ve şifrenizi girin (`Akyol35.2026`).
2. **Görsel & Medya Rehberi Sekmesi:** Sol menüden **"Görsel & Medya Rehberi"** sekmesine tıklayarak projedeki tüm yerel görselleri önizleyin.
3. **Yol Kopyalama:** Değiştirmek veya hizmete atamak istediğiniz görselin altındaki **"Yolu Kopyala"** butonuna basarak dosya yolunu kopyalayın (örneğin `/assets/briquetting.png`).
4. **Hizmete Atama:** **"Hizmetler CMS"** sekmesinden ilgili hizmeti düzenleyerek görsel yolunu yapıştırın ve kaydedin.
5. Değişiklik anında tüm web sitesinde canlı olarak yayına alınacaktır.

---

## 5. Görsel Optimizasyon ve Performans İpuçları

- **Dosya Boyutları:** Web sitesi hızını en üst seviyede tutmak için görsellerin dosya boyutunun `200 KB - 800 KB` aralığında olması önerilir.
- **WebP Formatı:** Mümkün olduğunda fotoğraflar için `.webp` formatı tercih edilmelidir; bu format JPEG kalitesini %30-50 daha düşük dosya boyutunda sunar.
- **En/Boy Oranları:** Kart ve liste düzenlerinin bozulmaması için hizmet ve tesis fotoğraflarında **4:3** veya **16:9** yatay en-boy oranlarına sadık kalınmalıdır.

---

*Akyol Metal Geri Dönüşüm - Torbalı / İzmir / Türkiye*
