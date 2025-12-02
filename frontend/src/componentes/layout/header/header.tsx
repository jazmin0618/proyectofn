"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTranslation } from "@/app/traduccion/useTranslation";
import styles from "./header.module.css";

export default function Header() { 
  const pathname = usePathname();
  const { language, setLanguage, isTranslating } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Cargar tema y usuario
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark-mode') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark-mode');
    }

    const userData = localStorage.getItem('user');
    if (userData && userData !== 'undefined' && userData !== 'null') {
      try {
        const userObj = JSON.parse(userData);
        setUser(userObj);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  // Toggle modo oscuro
  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light-mode');
    }
  };

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsUserMenuOpen(false);
    window.location.href = '/';
  };

  return (
    <header className={styles.header}>
      {/* BARRA SUPERIOR */}
      <div className={styles.topBar}>
        <div className={styles.container}>
          {/* LOGO */}
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>🤖</span>
            <span className={styles.logoText}>AI Assistant</span>
          </Link>

          {/* CONTROLES DERECHA - SOLO 3 ELEMENTOS */}
          <div className={styles.controls}>
            {/* 🌐 IDIOMA */}
            <div className={styles.languageWrapper}>
              <span className={styles.languageIcon}>🌐</span>
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
              {isTranslating && <div className={styles.spinner} />}
            </div>

            {/* 🌙 MODO OSCURO/CLARO */}
            <button 
              onClick={toggleTheme} 
              className={styles.themeButton}
              aria-label={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              {isDarkMode ? (
                <span className={`${styles.themeIcon} ${styles.sunIcon}`}>☀️</span>
              ) : (
                <span className={`${styles.themeIcon} ${styles.moonIcon}`}>🌙</span>
              )}
            </button>

            {/* 👤 BOTÓN DE LAS 3 RAYITAS */}
            <button 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className={styles.menuButton}
              aria-label="Menú usuario"
            >
              <span className={styles.menuIcon}>☰</span>
            </button>
          </div>
        </div>
      </div>

      {/* BARRA DE NAVEGACIÓN PRINCIPAL */}
      <nav className={styles.mainNav}>
        <div className={styles.navContainer}>
          <Link 
            href="/" 
            className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}
          >
            <span>Inicio</span>
          </Link>
          <Link 
            href="/chatbot" 
            className={`${styles.navLink} ${pathname === '/chatbot' ? styles.active : ''}`}
          >
            <span>Chatbot</span>
          </Link>
          <Link 
            href="/recomendaciones" 
            className={`${styles.navLink} ${pathname === '/recomendaciones' ? styles.active : ''}`}
          >
            <span>Recomendaciones</span>
          </Link>
        </div>
      </nav>

      {/* MENÚ DESPLEGABLE USUARIO (al hacer click en las 3 rayitas) */}
      {isUserMenuOpen && (
        <div className={styles.userDropdown}>
          {/* Si el usuario NO está logueado (como en tu imagen) */}
          {!user ? (
            <>
              <div className={styles.dropdownSection}>
                <h4>Cuenta</h4>
                <Link 
                  href="/login" 
                  className={styles.dropdownItem}
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <span className={styles.dropdownIcon}>👤</span>
                  <span>Iniciar Sesión</span>
                </Link>
                <Link 
                  href="/register" 
                  className={styles.dropdownItem}
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  <span className={styles.dropdownIcon}>📝</span>
                  <span>Crear Cuenta</span>
                </Link>
              </div>
            </>
          ) : (
            /* Si el usuario SÍ está logueado */
            <>
              <div className={styles.userInfo}>
                <span className={styles.dropdownAvatar}>👤</span>
                <div className={styles.userDetails}>
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                  <small>Favoritos</small>
                  <small>Plan: Gratuito</small>
                  <small>Miembro desde: 1/12/2025</small>
                </div>
              </div>

              <div className={styles.dropdownSection}>
                <h4>Mi Cuenta</h4>
                <Link href="/perfil" className={styles.dropdownItem} onClick={() => setIsUserMenuOpen(false)}>
                  <span className={styles.dropdownIcon}>👤</span>
                  <span>Mi Perfil</span>
                </Link>
                <Link href="/favoritos" className={styles.dropdownItem} onClick={() => setIsUserMenuOpen(false)}>
                  <span className={styles.dropdownIcon}>❤️</span>
                  <span>Mis Favoritos</span>
                </Link>
                <Link href="/historial" className={styles.dropdownItem} onClick={() => setIsUserMenuOpen(false)}>
                  <span className={styles.dropdownIcon}>📚</span>
                  <span>Historial</span>
                </Link>
                <Link href="/configuracion" className={styles.dropdownItem} onClick={() => setIsUserMenuOpen(false)}>
                  <span className={styles.dropdownIcon}>⚙️</span>
                  <span>Configuración</span>
                </Link>
              </div>

              <div className={styles.dropdownDivider} />

              <button onClick={handleLogout} className={styles.logoutButton}>
                <span className={styles.dropdownIcon}>🚪</span>
                <span>Cerrar Sesión</span>
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}