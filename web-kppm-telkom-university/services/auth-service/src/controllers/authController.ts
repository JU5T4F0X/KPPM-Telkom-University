import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'kppm-telkom-secret-dev-2024';
const JWT_EXPIRES_IN = '24h';

// ─── Mock Data (akan diganti koneksi DB di tahap berikutnya) ──────────────────
const MOCK_STUDENTS = [
  {
    student_id: 1,
    nim: '12345678',
    student_name: 'Budi Santoso',
    class: 'IF-45-01',
    email: 'budi.santoso@student.telkomuniversity.ac.id',
    // password: "password123" (bcrypt hash — untuk mock kita cek plain)
    password: 'password123',
  },
  {
    student_id: 2,
    nim: '23456789',
    student_name: 'Siti Rahayu',
    class: 'IF-45-02',
    email: 'siti.rahayu@student.telkomuniversity.ac.id',
    password: 'password123',
  },
];

const MOCK_LECTURERS = [
  {
    lecturer_id: 1,
    nip: '19800101001',
    lecturer_name: 'Dr. Ahmad Fauzi, M.T.',
    // password: "dosen123"
    password: 'dosen123',
  },
];

// OTP store sementara di memory (untuk production pakai Redis)
const otpStore: Record<string, { otp: string; expiresAt: number }> = {};

// ─── Student Login ────────────────────────────────────────────────────────────
export const studentLogin = (req: Request, res: Response): void => {
  const { nim, password } = req.body;

  if (!nim || !password) {
    res.status(400).json({ success: false, message: 'NIM dan password wajib diisi' });
    return;
  }

  const student = MOCK_STUDENTS.find(
    (s) => s.nim === nim && s.password === password
  );

  if (!student) {
    res.status(401).json({ success: false, message: 'NIM atau password salah' });
    return;
  }

  const payload = {
    sub: student.student_id,
    nim: student.nim,
    name: student.student_name,
    role: 'student',
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  res.status(200).json({
    success: true,
    message: 'Login berhasil',
    data: {
      token,
      user: {
        id: student.student_id,
        nim: student.nim,
        name: student.student_name,
        class: student.class,
        email: student.email,
        role: 'student',
      },
    },
  });
};

// ─── Lecturer Login ───────────────────────────────────────────────────────────
export const lecturerLogin = (req: Request, res: Response): void => {
  const { nip, password } = req.body;

  if (!nip || !password) {
    res.status(400).json({ success: false, message: 'NIP dan password wajib diisi' });
    return;
  }

  const lecturer = MOCK_LECTURERS.find(
    (l) => l.nip === nip && l.password === password
  );

  if (!lecturer) {
    res.status(401).json({ success: false, message: 'NIP atau password salah' });
    return;
  }

  const payload = {
    sub: lecturer.lecturer_id,
    nip: lecturer.nip,
    name: lecturer.lecturer_name,
    role: 'lecturer',
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  res.status(200).json({
    success: true,
    message: 'Login berhasil',
    data: {
      token,
      user: {
        id: lecturer.lecturer_id,
        nip: lecturer.nip,
        name: lecturer.lecturer_name,
        role: 'lecturer',
      },
    },
  });
};

// ─── Mentor: Send OTP ─────────────────────────────────────────────────────────
export const mentorSendOtp = (req: Request, res: Response): void => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ success: false, message: 'Email wajib diisi' });
    return;
  }

  // Generate OTP 6 digit
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 menit

  otpStore[email] = { otp, expiresAt };

  console.log(`[Auth Service] OTP untuk ${email}: ${otp}`); // Untuk dev/testing

  // Di production: kirim email via SMTP/SendGrid
  // Untuk sekarang: return OTP di response (DEV MODE ONLY)
  res.status(200).json({
    success: true,
    message: `OTP telah dikirim ke ${email}`,
    // DEV ONLY: hapus field ini di production
    dev_otp: otp,
  });
};

// ─── Mentor: Verify OTP ───────────────────────────────────────────────────────
export const mentorVerifyOtp = (req: Request, res: Response): void => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    res.status(400).json({ success: false, message: 'Email dan OTP wajib diisi' });
    return;
  }

  const stored = otpStore[email];

  if (!stored) {
    res.status(401).json({ success: false, message: 'OTP tidak ditemukan. Kirim OTP terlebih dahulu' });
    return;
  }

  if (Date.now() > stored.expiresAt) {
    delete otpStore[email];
    res.status(401).json({ success: false, message: 'OTP sudah kadaluarsa. Kirim OTP baru' });
    return;
  }

  if (stored.otp !== otp) {
    res.status(401).json({ success: false, message: 'OTP salah' });
    return;
  }

  // OTP valid — hapus dari store
  delete otpStore[email];

  const payload = {
    email,
    role: 'mentor',
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '8h' });

  res.status(200).json({
    success: true,
    message: 'Verifikasi OTP berhasil',
    data: {
      token,
      user: {
        email,
        role: 'mentor',
      },
    },
  });
};

// ─── Logout ───────────────────────────────────────────────────────────────────
export const logout = (_req: Request, res: Response): void => {
  // JWT adalah stateless; client yang menghapus token dari storage
  // Di tahap berikutnya bisa implementasi token blacklist dengan Redis
  res.status(200).json({
    success: true,
    message: 'Logout berhasil',
  });
};
