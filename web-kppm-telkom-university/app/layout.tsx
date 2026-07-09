import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sistem Manajemen KPPM — Telkom University",
  description: "Sistem informasi manajemen Kerja Praktik dan Magang (KPPM) Telkom University untuk mahasiswa, dosen pembimbing, dan mentor perusahaan.",
  keywords: "KPPM, Telkom University, Kerja Praktik, Magang, Sistem Manajemen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full">
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}

