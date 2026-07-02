export interface SolutionCard {
  title: string
  description: string
  icon: string
}

export interface FeatureSlide {
  title: string
  description: string
  icon: string
}

export interface PaymentMethod {
  name: string
  bg: string
  text: string
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface ChecklistFeature {
  label: string
  icon: string
}

export const solutionCards: SolutionCard[] = [
  { title: 'Terintegrasi', description: 'Satu aplikasi untuk seluruh kebutuhan transaksi energi Anda.', icon: '\u{1F517}' },
  { title: 'Pembelian Mudah', description: 'Transaksi cepat tanpa antre, kapan saja dan di mana saja.', icon: '\u{1F4B3}' },
  { title: 'Beragam Fitur', description: 'Dari subsidi tepat hingga tukar poin, semua dalam genggaman.', icon: '✨' },
]

export const featureSlides: FeatureSlide[] = [
  { title: 'Subsidi Tepat', description: 'Pastikan BBM subsidi tepat sasaran dengan pendaftaran mudah.', icon: '⛽' },
  { title: 'Tukar Poin', description: 'Kumpulkan poin dari setiap transaksi dan tukar dengan hadiah menarik.', icon: '\u{1F381}' },
  { title: 'Tagihan Gas', description: 'Bayar tagihan gas rumah tangga langsung dari aplikasi.', icon: '\u{1F525}' },
  { title: 'Cek Lokasi EV Charging', description: 'Temukan titik pengisian daya kendaraan listrik terdekat.', icon: '\u{1F50C}' },
  { title: 'Pesan Tiket & Hotel', description: 'Rencanakan perjalanan Anda tanpa berpindah aplikasi.', icon: '✈️' },
]

export const paymentMethods: PaymentMethod[] = [
  { name: 'VISA', bg: '#1a1f71', text: '#fff' },
  { name: 'GoPay', bg: '#00aed6', text: '#fff' },
  { name: 'OVO', bg: '#4c2a86', text: '#fff' },
  { name: 'AstraPay', bg: '#005baa', text: '#fff' },
  { name: 'Mandiri', bg: '#003d79', text: '#fff' },
  { name: 'BNI', bg: '#f37021', text: '#fff' },
]

export const socialLinks: SocialLink[] = [
  { name: 'Instagram', url: 'https://instagram.com/mypertamina', icon: '\u{1F4F7}' },
  { name: 'TikTok', url: 'https://tiktok.com/@mypertamina', icon: '\u{1F3B5}' },
  { name: 'YouTube', url: 'https://youtube.com/@mypertamina', icon: '▶️' },
  { name: 'Website', url: 'https://mypertamina.id', icon: '\u{1F310}' },
]

export const checklistFeatures: ChecklistFeature[] = [
  { label: 'Cek QR Code', icon: '\u{1F4F1}' },
  { label: 'Cek lokasi EV Charging', icon: '\u{1F50C}' },
  { label: 'Bayar Tagihan Gas', icon: '\u{1F525}' },
  { label: 'Pesan tiket pesawat', icon: '✈️' },
  { label: 'Pesan hotel', icon: '\u{1F3E8}' },
]
