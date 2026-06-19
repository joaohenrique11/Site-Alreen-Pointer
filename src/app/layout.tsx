import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alreen Pointer | Barbearia",
  description: "Barbearia premium com cortes, barba e agendamento online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
