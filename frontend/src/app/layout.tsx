"use client";
import { TranslationProvider } from "./traduccion/useTranslation";
import { ReactNode } from "react";
import styles from "./page.module.css";
import "./globals.css";
import Header from "@/componentes/layout/header/header"; 
import PiePagina from "@/componentes/layout/footer/footer";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <TranslationProvider>
      <html lang="es">
        <body className={styles.body}>
          <Header/>
          {/* Banner */}
          <div className={styles.bannerSection}>
            <img
              src="/ia2.jpg" 
              alt="Banner de Inteligencia Artificial"
              className={styles.bannerImage}
            />
          </div>

          {/* Contenido principal */}
          <main className={styles.main}>{children}</main>
          <PiePagina/>
        </body>
      </html>
    </TranslationProvider>
  );
}
