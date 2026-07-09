export default function PengaturanPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>
        <p className="text-gray-500 text-sm mt-1">Kelola profil dan preferensi akun Anda</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#CC0000" strokeWidth="1.5">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-gray-800 mb-2">Pengaturan Akun</h2>
        <p className="text-gray-400 text-sm max-w-sm mx-auto">
          Halaman pengaturan profil, ganti password, dan preferensi notifikasi akan segera tersedia.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-[#CC0000] rounded-lg text-sm font-medium">
          🚧 Dalam Pengembangan
        </div>
      </div>
    </div>
  );
}
