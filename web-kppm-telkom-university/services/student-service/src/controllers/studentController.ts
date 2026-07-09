import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_STUDENT_DATA: Record<number, object> = {
  1: {
    student_id: 1,
    nim: '12345678',
    name: 'Budi Santoso',
    class: 'IF-45-01',
    email: 'budi.santoso@student.telkomuniversity.ac.id',
    prodi: 'S1 Informatika',
    fakultas: 'Fakultas Informatika',
    semester: 6,
    angkatan: 2022,
    ipk: 3.72,
    foto_url: null,
  },
  2: {
    student_id: 2,
    nim: '23456789',
    name: 'Siti Rahayu',
    class: 'IF-45-02',
    email: 'siti.rahayu@student.telkomuniversity.ac.id',
    prodi: 'S1 Informatika',
    fakultas: 'Fakultas Informatika',
    semester: 6,
    angkatan: 2022,
    ipk: 3.85,
    foto_url: null,
  },
};

const MOCK_KPPM_STATUS: Record<number, object> = {
  1: {
    registration_id: null,
    status: 'belum_daftar',
    current_step: 0,
    steps: [
      { step: 1, label: 'Pengisian Data', completed: false, date: null },
      { step: 2, label: 'Verifikasi Dosen', completed: false, date: null },
      { step: 3, label: 'Persetujuan Perusahaan', completed: false, date: null },
      { step: 4, label: 'Selesai', completed: false, date: null },
    ],
    notifications: [
      {
        id: 1,
        message: 'Selamat datang di Sistem Manajemen KPPM! Silakan mulai mengisi data pendaftaran KPPM Anda.',
        type: 'info',
        created_at: new Date().toISOString(),
        is_read: false,
      },
    ],
    next_steps: [
      { label: 'Pengisian Data etagran KPPM', completed: false },
      { label: 'Verifikasi Dosen pendaftaran KPPM', completed: false },
      { label: 'Persetujuan Perusahaan kangalturan KPPM', completed: false },
    ],
  },
};

// ─── Get Profile ──────────────────────────────────────────────────────────────
export const getProfile = (req: AuthenticatedRequest, res: Response): void => {
  const userId = req.user?.sub;

  if (!userId) {
    res.status(401).json({ success: false, message: 'Tidak terautentikasi' });
    return;
  }

  const profile = MOCK_STUDENT_DATA[userId];

  if (!profile) {
    res.status(404).json({ success: false, message: 'Data mahasiswa tidak ditemukan' });
    return;
  }

  res.status(200).json({
    success: true,
    data: profile,
  });
};

// ─── Get Dashboard ────────────────────────────────────────────────────────────
export const getDashboard = (req: AuthenticatedRequest, res: Response): void => {
  const userId = req.user?.sub;

  if (!userId) {
    res.status(401).json({ success: false, message: 'Tidak terautentikasi' });
    return;
  }

  const profile = MOCK_STUDENT_DATA[userId];
  const kppmStatus = MOCK_KPPM_STATUS[userId] || MOCK_KPPM_STATUS[1]; // fallback ke data default

  res.status(200).json({
    success: true,
    data: {
      profile,
      kppm_status: kppmStatus,
    },
  });
};
