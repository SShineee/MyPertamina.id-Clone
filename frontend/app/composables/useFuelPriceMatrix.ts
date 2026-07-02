export interface FuelProductColumn {
  key: string
  name: string
  tag?: string
  bg: string
  text: string
}

export interface ProvinceFuelPrice {
  province: string
  ftz?: boolean
  prices: Record<string, number | null>
}

// TODO: data statis sementara — ganti dengan data dari API saat backend sudah
// mendukung harga BBM per provinsi (lihat docs/style.md untuk konvensi warna).
export const fuelProductColumns: FuelProductColumn[] = [
  { key: 'pertalite', name: 'Pertalite', bg: '#dcfce7', text: '#166534' },
  { key: 'pertamax', name: 'Pertamax', bg: '#dbeafe', text: '#1e40af' },
  { key: 'pertamax_turbo', name: 'Pertamax Turbo', bg: '#fce7f3', text: '#9d174d' },
  { key: 'biosolar_subsidi', name: 'Biosolar', tag: 'Subsidi', bg: '#fef9c3', text: '#854d0e' },
  { key: 'biosolar_nonsubsidi', name: 'Biosolar', tag: 'Non Subsidi', bg: '#ffedd5', text: '#9a3412' },
  { key: 'pertamax_pertashop', name: 'Pertamax', tag: 'Pertashop', bg: '#ede9fe', text: '#5b21b6' },
]

export const fuelPriceMatrix: ProvinceFuelPrice[] = [
  {
    province: 'Prov. DKI Jakarta',
    prices: { pertalite: 10000, pertamax: 12100, pertamax_turbo: 13550, biosolar_subsidi: 6800, biosolar_nonsubsidi: 7500, pertamax_pertashop: null },
  },
  {
    province: 'Prov. Jawa Barat',
    prices: { pertalite: 10000, pertamax: 12100, pertamax_turbo: 13550, biosolar_subsidi: 6800, biosolar_nonsubsidi: 7500, pertamax_pertashop: 12600 },
  },
  {
    province: 'Prov. Jawa Tengah',
    prices: { pertalite: 10000, pertamax: 12200, pertamax_turbo: 13650, biosolar_subsidi: 6800, biosolar_nonsubsidi: null, pertamax_pertashop: 12700 },
  },
  {
    province: 'Prov. Jawa Timur',
    prices: { pertalite: 10000, pertamax: 12200, pertamax_turbo: 13650, biosolar_subsidi: 6800, biosolar_nonsubsidi: 7550, pertamax_pertashop: 12700 },
  },
  {
    province: 'Prov. DI Yogyakarta',
    prices: { pertalite: 10000, pertamax: 12200, pertamax_turbo: null, biosolar_subsidi: 6800, biosolar_nonsubsidi: null, pertamax_pertashop: 12700 },
  },
  {
    province: 'Prov. Banten',
    prices: { pertalite: 10000, pertamax: 12100, pertamax_turbo: 13550, biosolar_subsidi: 6800, biosolar_nonsubsidi: 7500, pertamax_pertashop: null },
  },
  {
    province: 'Prov. Bali',
    prices: { pertalite: 10300, pertamax: 12400, pertamax_turbo: 13850, biosolar_subsidi: 6800, biosolar_nonsubsidi: 7700, pertamax_pertashop: null },
  },
  {
    province: 'Prov. Sumatera Utara',
    prices: { pertalite: 10300, pertamax: 12500, pertamax_turbo: 13950, biosolar_subsidi: 6800, biosolar_nonsubsidi: 7750, pertamax_pertashop: 13000 },
  },
  {
    province: 'Prov. Sumatera Barat',
    prices: { pertalite: 10300, pertamax: 12500, pertamax_turbo: null, biosolar_subsidi: 6800, biosolar_nonsubsidi: null, pertamax_pertashop: 13000 },
  },
  {
    province: 'Prov. Riau',
    prices: { pertalite: 10300, pertamax: 12500, pertamax_turbo: 13950, biosolar_subsidi: 6800, biosolar_nonsubsidi: 7750, pertamax_pertashop: null },
  },
  {
    province: 'Prov. Kepulauan Riau',
    prices: { pertalite: 10450, pertamax: 12650, pertamax_turbo: 14100, biosolar_subsidi: 6800, biosolar_nonsubsidi: 7900, pertamax_pertashop: null },
  },
  {
    province: 'Prov. Sumatera Selatan',
    prices: { pertalite: 10300, pertamax: 12500, pertamax_turbo: 13950, biosolar_subsidi: 6800, biosolar_nonsubsidi: null, pertamax_pertashop: 13000 },
  },
  {
    province: 'Prov. Kalimantan Timur',
    prices: { pertalite: 10450, pertamax: 12650, pertamax_turbo: 14100, biosolar_subsidi: 6800, biosolar_nonsubsidi: 7900, pertamax_pertashop: 13150 },
  },
  {
    province: 'Prov. Sulawesi Selatan',
    prices: { pertalite: 10450, pertamax: 12650, pertamax_turbo: null, biosolar_subsidi: 6800, biosolar_nonsubsidi: null, pertamax_pertashop: 13150 },
  },
  {
    province: 'Prov. Papua',
    prices: { pertalite: 10600, pertamax: 12800, pertamax_turbo: null, biosolar_subsidi: 6800, biosolar_nonsubsidi: null, pertamax_pertashop: null },
  },
  {
    province: 'FTZ Batam, Bintan, dan Karimun',
    ftz: true,
    prices: { pertalite: null, pertamax: 11800, pertamax_turbo: 13250, biosolar_subsidi: null, biosolar_nonsubsidi: 7200, pertamax_pertashop: null },
  },
]
