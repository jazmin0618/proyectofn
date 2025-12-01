"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaGlobe, FaSun, FaMoon, FaBars, FaTimes, FaUser, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useTranslation } from "@/app/traduccion/useTranslation";
import styles from "./header.module.css";

export default function Header() { 
  const pathname = usePathname();
  const { language, setLanguage, isTranslating } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [favoritosCount, setFavoritosCount] = useState(0);

  // Cargar tema y usuario - CORREGIDO
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark-mode') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark-mode');
    }

    // CARGAR USUARIO CON MANEJO DE ERRORES
    const userData = localStorage.getItem('user');
    console.log('Header - userData:', userData); // Para debug
    
    if (userData && userData !== 'undefined' && userData !== 'null') {
      try {
        const userObj = JSON.parse(userData);
        console.log('Header - usuario parseado:', userObj); // Para debug
        setUser(userObj);
      } catch (error) {
        console.error('Header - Error parsing user data:', error);
        // Limpiar datos corruptos
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
      localStorage.setItem('theme', '');
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
      <div className={styles.container}>
        {/* 🔤 NAVEGACIÓN PRINCIPAL (Inicio, Chatbot, Recomendaciones) */}
        <nav className={styles.mainNav}>
          <Link 
            href="/" 
            className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}
          >
            Inicio
          </Link>
          <Link 
            href="/chatbot" 
            className={`${styles.navLink} ${pathname === '/chatbot' ? styles.active : ''}`}
          >
            Chatbot
          </Link>
          <Link 
            href="/recomendaciones" 
            className={`${styles.navLink} ${pathname === '/recomendaciones' ? styles.active : ''}`}
          >
            Recomendaciones
          </Link>
        </nav>

        {/* ⚙️ CONTROLES DERECHA (Traducir, Modo, Menú Usuario) */}
        <div className={styles.controls}>
          
          {/* 🌐 TRADUCIR */}
          <div className={styles.controlItem}>
            <FaGlobe className={styles.controlIcon} />
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

          {/* 🌙 MODO OSCURO */}
          <button onClick={toggleTheme} className={styles.controlItem}>
            {isDarkMode ? <FaSun className={styles.controlIcon} /> : <FaMoon className={styles.controlIcon} />}
          </button>

          {/* 👤 MENÚ USUARIO (3 rayitas) */}
          <div className={styles.userMenuContainer}>
            <button 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className={styles.menuButton}
            >
              <FaBars className={styles.menuIcon} />
            </button>

            {/* MENÚ DESPLEGABLE USUARIO */}
            {isUserMenuOpen && (
              <div className={styles.userDropdown}>
                {/* Si el usuario está logueado */}
                {user ? (
                  <>
                    <div className={styles.userInfo}>
                      <FaUserCircle className={styles.userAvatar} />
                      <div>
                        <strong>{user.name}</strong>
                        <span>{user.email}</span>
                        <small>Ver perfil completo</small>
                      </div>
                    </div>
                    
                    {/* OPCIONES PRINCIPALES */}
        <div className={styles.dropdownSection}>
          <h4>Mi Cuenta</h4>
          <Link 
            href="/perfil" 
            className={styles.dropdownItem}
            onClick={() => setIsUserMenuOpen(false)}
          >
            <FaUser className={styles.dropdownIcon} />
            Mi Perfil
          </Link>
          <Link 
            href="/favoritos" 
            className={styles.dropdownItem}
            onClick={() => setIsUserMenuOpen(false)}
          >
            ❤️ Mis Favoritos
          </Link>
          <Link 
            href="/historial" 
            className={styles.dropdownItem}
            onClick={() => setIsUserMenuOpen(false)}
          >
            📚 Historial
          </Link>
          <Link 
            href="/configuracion" 
            className={styles.dropdownItem}
            onClick={() => setIsUserMenuOpen(false)}
          >
            ⚙️ Configuración
          </Link>
        </div>
        
                    
                    <div className={styles.dropdownDivider} />

                    <button 
                      onClick={handleLogout}
                      className={styles.dropdownItem}
                    >
                      <FaSignOutAlt className={styles.dropdownIcon} />
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  /* Si el usuario NO está logueado */
                  <>
                    <Link 
                      href="/login" 
                      className={styles.dropdownItem}
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <FaUser className={styles.dropdownIcon} />
                      Iniciar Sesión
                    </Link>
                    
                    <Link 
                      href="/register" 
                      className={styles.dropdownItem}
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <FaUser className={styles.dropdownIcon} />
                      Crear Cuenta
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

        </div>

        {/* 📱 MENÚ MÓVIL (solo visible en mobile) */}
        <button 
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link 
            href="/" 
            className={styles.mobileNavLink}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link 
            href="/chatbot" 
            className={styles.mobileNavLink}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Chatbot
          </Link>
          <Link 
            href="/recomendaciones" 
            className={styles.mobileNavLink}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Recomendaciones
          </Link>
          
          {/* Opciones de usuario en móvil */}
          <div className={styles.mobileUserOptions}>
            {user ? (
              <>
                <Link href="/perfil" className={styles.mobileNavLink}>Mi Perfil</Link>
                <button onClick={handleLogout} className={styles.mobileNavLink}>Cerrar Sesión</button>
              </>
            ) : (
              <>
                <Link href="/login" className={styles.mobileNavLink}>Iniciar Sesión</Link>
                <Link href="/register" className={styles.mobileNavLink}>Crear Cuenta</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}