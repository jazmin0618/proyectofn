"use client";
import Link from "next/link";
import { FaTwitter, FaEnvelope, FaLinkedin, FaWhatsapp, FaChevronDown, FaUser, FaSignOutAlt, FaGlobe, FaSun, FaMoon } from "react-icons/fa";
import { TranslationProvider, useTranslation } from "./traduccion/usetranslation";
import { ReactNode, useState, useEffect } from "react";
import styles from "./page.module.css";
import "./globals.css";

// Componente del botón de modo (simplificado)
function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark-mode') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark-mode');
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
      localStorage.setItem('theme', '');
    }
  };

  return (
    <button onClick={toggleTheme} className={styles.themeButton}>
      {isDarkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
    </button>
  );
}

// Componente de Estado de Usuario
function UserStatus() {
  const [user, setUser] = useState<any>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsUserMenuOpen(false);
    window.location.href = '/';
  };

  if (!user) {
    return (
      <div className={styles.authButtons}>
        <Link href="/login" className={styles.loginLink}>
          Iniciar Sesión
        </Link>
        <Link href="/register" className={styles.registerLink}>
          Registrarse
        </Link>
      </div>
    );
  }

  return (
    <div 
      className={styles.userMenu}
      onMouseEnter={() => setIsUserMenuOpen(true)}
      onMouseLeave={() => setIsUserMenuOpen(false)}
    >
      <button className={styles.userButton}>
        <FaUser size={14} />
        {user.name.split(' ')[0]} {/* Solo primer nombre */}
      </button>
      
      {isUserMenuOpen && (
        <div className={styles.userDropdown}>
          <div className={styles.userInfo}>
            <strong>{user.name}</strong>
            <span>{user.email}</span>
          </div>
          <Link 
            href="/dashboard" 
            className={styles.dropdownItem}
            onClick={() => setIsUserMenuOpen(false)}
          >
            Mi Dashboard
          </Link>
          <button 
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            <FaSignOutAlt size={14} />
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
}

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
        {/* 🔥 NUEVA BARRA SUPERIOR - Esquina derecha */}
        <div className={styles.topBar}>
          <div className={styles.topBarContent}>
            {/* Elementos de la esquina derecha */}
            <div className={styles.topBarRight}>
              {/* Selector de idioma */}
              <div className={styles.languageSelector}>
                <FaGlobe size={14} />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  disabled={isTranslating}
                  className={styles.languageSelect}
                >
                  <option value="es">ES</option>
                  <option value="en">EN</option>
                  <option value="fr">FR</option>
                </select>
                {isTranslating && <div className={styles.loadingSpinner} />}
              </div>

              {/* Botón de modo claro/oscuro */}
              <ThemeToggle />

              {/* Estado del usuario */}
              <UserStatus />
            </div>
          </div>
        </div>

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

        {/* Menú de navegación principal */}
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