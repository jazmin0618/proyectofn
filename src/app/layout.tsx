"use client";
import Link from "next/link";
import { FaTwitter, FaEnvelope, FaLinkedin, FaWhatsapp, FaChevronDown } from "react-icons/fa";
import { TranslationProvider, useTranslation } from "./traduccion/usetranslation";
import { ReactNode, useState } from "react";
import styles from "./page.module.css";

function LayoutContent({ children }: { children: ReactNode }) {
  const { language, setLanguage, isTranslating } = useTranslation();
  const [isRecommendationsOpen, setIsRecommendationsOpen] = useState(false);

  const recommendationCategories = [
    { href: "/recomendaciones#imagenes", label: "🎨 IA de Imágenes" },
    { href: "/recomendaciones#video", label: "🎬 IA de Video" },
    { href: "/recomendaciones#estudio", label: "📚 IA de Estudio" },
    { href: "/recomendaciones#escritura", label: "✍️ IA de Escritura" },
    { href: "/recomendaciones#programacion", label: "💻 IA para Programadores" },
    { href: "/recomendaciones#audio", label: "🎧 IA de Audio" },
    { href: "/recomendaciones#productividad", label: "🚀 IA de Productividad" },
    { href: "/recomendaciones#chatbots", label: "💼 Chatbots Empresariales" }
  ];

  return (
    <html lang={language}>
      <body className={styles.body}>
        {/* Header con imagen de banner */}
        <header>
          <div>
            <img
              src="/ia3.jpg"
              alt="Banner de Inteligencia Artificial"
              className={styles.bannerImage}
            />
          </div>
        </header>

        {/* Selector de idioma */}
        <div className={styles.languageSelector}>
          <div className={styles.languageContainer}>
            <span>🌐</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disabled={isTranslating}
              className={styles.languageSelect}
            >
              <option value="es">Español</option>
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
            {isTranslating && <div className={styles.loadingSpinner} />}
          </div>
        </div>

        {/* Menú de navegación */}
        <nav className={styles.nav}>
          <div className={styles.navContainer}>
            <Link href="/" className={styles.navLink}>
              Inicio
            </Link>
            
            {/* Menú desplegable de Recomendaciones */}
            <div 
              className={styles.dropdown}
              onMouseEnter={() => setIsRecommendationsOpen(true)}
              onMouseLeave={() => setIsRecommendationsOpen(false)}
            >
              <button className={`${styles.navLink} ${styles.dropdownButton}`}>
                Recomendaciones IA <FaChevronDown size={12} />
              </button>
              
              {isRecommendationsOpen && (
                <div className={styles.dropdownMenu}>
                  {recommendationCategories.map((category) => (
                    <Link
                      key={category.href}
                      href={category.href}
                      className={styles.dropdownItem}
                      onClick={() => setIsRecommendationsOpen(false)}
                    >
                      {category.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link href="/help" className={styles.navLink}>
              Ayuda
            </Link>
            
            <Link href="/contact" className={styles.navLink}>
              Contáctanos
            </Link>
          </div>
        </nav>

        {/* Contenido principal */}
        <main className={styles.main}>{children}</main>

        {/* Footer */}
        <footer className={styles.footer}>
          <p className={styles.footerText}>
            Síguenos en nuestras redes sociales
          </p>
          <div className={styles.socialIcons}>
            <a
              href="https://twitter.com/tu-usuario"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <FaTwitter size={24} />
            </a>

            <a
              href="mailto:tu-email@gmail.com"
              className={styles.socialLink}
            >
              <FaEnvelope size={24} />
            </a>

            <a
              href="https://linkedin.com/in/tu-usuario"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <FaLinkedin size={24} />
            </a>

            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <FaWhatsapp size={24} />
            </a>
          </div>

          <p className={styles.copyright}>
            © {new Date().getFullYear()} Mi Empresa. Todos los derechos reservados.
          </p>
        </footer>

      </body>
    </html>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <TranslationProvider>
      <LayoutContent>{children}</LayoutContent>
    </TranslationProvider>
  );
}