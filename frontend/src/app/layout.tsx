"use client";
import { TranslationProvider } from "./traduccion/useTranslation";
import { ReactNode } from "react";
import styles from "./page.module.css";
import "./globals.css";
import Header from "@/componentes/layout/header/header"; 

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
          

          {/* Footer (mantén el que tienes) */}
          <footer className={styles.footer}>
            {/* ... tu footer actual ... */}
          </footer>
        </body>
      </html>
    </TranslationProvider>
  );
}
