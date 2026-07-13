import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sistema de Retención de Clientes — Consulta individual",
  description:
    "Predicción de abandono y recomendación de retención mediante Machine Learning y Agente de Utilidad.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <body className="bg-surface text-text font-body min-h-screen flex flex-col antialiased">
        <header className="bg-gradient-to-r from-[#12213D] to-[#16294A] text-white px-6 py-8 md:px-8 md:py-10">
          <div className="max-w-[1100px] mx-auto">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_0_4px_rgba(15,181,174,0.25)]" />
              <span className="font-heading font-bold text-lg tracking-widest">
                RETENCIÓN IA
              </span>
            </div>
            <p className="mt-2 text-[#C7D0E0] text-sm md:text-base">
              Predicción de abandono &amp; recomendación de retención — panel de
              consulta individual
            </p>
          </div>
        </header>
        {children}
        <footer className="text-center text-text-muted text-xs px-6 py-4 mt-auto">
          <p>
            Proyecto académico — Predicción de Abandono de Clientes mediante
            Machine Learning y un Agente de Utilidad para la Retención de
            Clientes.
          </p>
          <p className="mt-1 text-[10px] text-text-muted/60 font-mono">
            Modelo XGBoost optimizado por F2-score · Recall: 81.6% · ROC-AUC:
            0.846
          </p>
        </footer>
      </body>
    </html>
  );
}
