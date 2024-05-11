import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css"


export const metadata: Metadata = {
  title: "Instagram title creator",
  description: "Use ia para gerar a legenda das suas fotos ou videos no instagram",
};

const inter = Inter({
  variable: '--font-inter',
  subsets: ["latin"],

})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
