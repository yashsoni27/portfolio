import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import clsx from "clsx";
import SecretTerminal from "./components/SecretTerminal";
import { EasterEggProvider } from './context/EasterEggContext';
import EasterEggHint from './components/EasterEggHint';

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yash Soni",
  description: "Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-slate-900 text-slate-100">
      <body className={clsx(urbanist.className, "relative min-h-screen")} style={{userSelect: "none"}}>
        <EasterEggProvider>
          <Header />
          {children}
          <Footer />
          <SecretTerminal />
          <div className="absolute inset-0 -z-50 max-h-screen background-gradient"></div>
          <div className="absolute pointer-events-none inset-0 -z-40 h-full bg-[url('/noisetexture.jpg')] opacity-20 mix-blend-soft-light"></div>
          <EasterEggHint />
        </EasterEggProvider>
      </body>
    </html>
  );
}
