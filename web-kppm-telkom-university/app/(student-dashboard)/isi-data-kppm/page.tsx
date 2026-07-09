export default function IsiDataKppmPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Isi Data KPPM</h1>
        <p className="text-gray-500 text-sm mt-1">Lengkapi data pendaftaran Kerja Praktik / Magang Anda</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#CC0000" strokeWidth="1.5">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-gray-800 mb-2">Formulir Pendaftaran KPPM</h2>
        <p className="text-gray-400 text-sm max-w-sm mx-auto">
          Halaman ini akan memuat formulir pengisian data KPPM lengkap. Fitur ini akan segera tersedia.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-[#CC0000] rounded-lg text-sm font-medium">
          🚧 Dalam Pengembangan
        </div>
      </div>
    </div>
  );
}
