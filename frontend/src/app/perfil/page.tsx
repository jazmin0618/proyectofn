"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./perfil.module.css";

interface Usuario {
  id: number;
  name: string;
  email: string;
  career?: string;
  study_level?: string;
  fechaRegistro?: string;
  created_at?: string;
}

interface IA {
  id: number;
  nombre: string;
  emoji: string;
  categoria: string;
  paraQueSirve: string;
}

export default function Perfil() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [favoritos, setFavoritos] = useState<IA[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    console.log('=== INICIANDO CARGA PERFIL ===');
    
    const userData = localStorage.getItem('user');
    console.log('Datos crudos de user:', userData);
    
    if (!userData || userData === 'undefined' || userData === 'null') {
      console.log('No hay usuario, redirigiendo a login');
      router.push('/login');
      return;
    }

    try {
      const userObj = JSON.parse(userData);
      console.log('Usuario parseado:', userObj);
      
      // Validar estructura mínima
      if (!userObj || typeof userObj !== 'object' || !userObj.id || !userObj.email) {
        console.error('Estructura de usuario inválida:', userObj);
        throw new Error('Datos de usuario inválidos');
      }
      
      // Asegurar que tenga los campos requeridos
      const usuarioCompleto: Usuario = {
        id: userObj.id,
        name: userObj.name || 'Usuario',
        email: userObj.email,
        career: userObj.career,
        study_level: userObj.study_level,
        fechaRegistro: userObj.fechaRegistro || userObj.created_at || new Date().toISOString(),
      };
      
      setUsuario(usuarioCompleto);
      console.log('Usuario establecido:', usuarioCompleto);

      // Cargar favoritos del usuario - con manejo de errores
      const favoritosData = localStorage.getItem(`favoritos_${userObj.id}`);
      console.log('Datos crudos de favoritos:', favoritosData);
      
      let favoritosArray: number[] = [];
      if (favoritosData && favoritosData !== 'undefined' && favoritosData !== 'null') {
        try {
          favoritosArray = JSON.parse(favoritosData);
        } catch (error) {
          console.error('Error parsing favoritos:', error);
          favoritosArray = [];
        }
      }
      
      console.log('Array de favoritos IDs:', favoritosArray);

      // Obtener datos de todas las IAs (de tu API o localStorage)
      const cargarIAs = async () => {
        try {
          console.log('Cargando IAs desde API...');
          const response = await fetch('/api');
          
          if (response.ok) {
            const todasIAsData = await response.json();
            console.log('Todas las IAs cargadas:', todasIAsData);
            
            // Aplanar todas las IAs de todas las categorías
            const todasIAs: IA[] = [];
            Object.values(todasIAsData).forEach((categoria: any) => {
              if (Array.isArray(categoria)) {
                todasIAs.push(...categoria);
              }
            });
            
            console.log('Todas las IAs aplanadas:', todasIAs);
            
            const iasFavoritas = todasIAs.filter((ia: IA) => 
              favoritosArray.includes(ia.id)
            );
            
            console.log('IAs favoritas filtradas:', iasFavoritas);
            setFavoritos(iasFavoritas);
          } else {
            console.error('Error en respuesta de API:', response.status);
            // Fallback: usar datos locales si la API falla
            cargarIAsLocales();
          }
        } catch (error) {
          console.error('Error cargando IAs desde API:', error);
          // Fallback: usar datos locales
          cargarIAsLocales();
        } finally {
          setCargando(false);
        }
      };

      // Función fallback para cargar IAs locales
      const cargarIAsLocales = () => {
        try {
          console.log('Cargando IAs desde localStorage...');
          const iasLocales = localStorage.getItem('todas_ias');
          if (iasLocales) {
            const todasIAsData = JSON.parse(iasLocales);
            const todasIAs: IA[] = [];
            
            Object.values(todasIAsData).forEach((categoria: any) => {
              if (Array.isArray(categoria)) {
                todasIAs.push(...categoria);
              }
            });
            
            const iasFavoritas = todasIAs.filter((ia: IA) => 
              favoritosArray.includes(ia.id)
            );
            
            setFavoritos(iasFavoritas);
          } else {
            console.log('No hay IAs en localStorage');
            setFavoritos([]);
          }
        } catch (error) {
          console.error('Error cargando IAs locales:', error);
          setFavoritos([]);
        }
      };

      cargarIAs();

    } catch (error) {
      console.error('Error crítico al cargar perfil:', error);
      // Limpiar localStorage corrupto
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      router.push('/login');
    }
  }, [router]);

  const eliminarFavorito = (iaId: number) => {
    if (!usuario) return;
    
    const nuevosFavoritos = favoritos.filter(ia => ia.id !== iaId);
    setFavoritos(nuevosFavoritos);
    
    // Actualizar localStorage
    const favoritosIds = nuevosFavoritos.map(ia => ia.id);
    localStorage.setItem(`favoritos_${usuario.id}`, JSON.stringify(favoritosIds));
    
    // Actualizar el contador en el header (recargar página)
    window.dispatchEvent(new Event('storage'));
  };

  const cerrarSesion = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (cargando) {
    return (
      <div className={styles.paginaPerfil}>
        <div className={styles.cargando}>
          <div className={styles.spinner}></div>
          <p>Cargando tu perfil...</p>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className={styles.paginaPerfil}>
        <div className={styles.error}>
          <h2>Error al cargar el perfil</h2>
          <p>No se pudieron cargar tus datos. Por favor, inicia sesión nuevamente.</p>
          <button onClick={() => router.push('/login')} className={styles.botonPrimario}>
            Ir al Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.paginaPerfil}>
      {/* Header del perfil */}
      <div className={styles.headerPerfil}>
        <div className={styles.avatar}>
          <span className={styles.avatarEmoji}>👤</span>
        </div>
        <div className={styles.infoUsuario}>
          <h1>{usuario.name}</h1>
          <p>{usuario.email}</p>
          {usuario.career && <p>🎓 {usuario.career}</p>}
          {usuario.study_level && <p>📚 {usuario.study_level}</p>}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumero}>{favoritos.length}</span>
              <span className={styles.statLabel}>Favoritos</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumero}>Gratuito</span>
              <span className={styles.statLabel}>Plan</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumero}>
                {usuario.fechaRegistro 
                  ? new Date(usuario.fechaRegistro).toLocaleDateString('es-ES')
                  : 'Reciente'
                }
              </span>
              <span className={styles.statLabel}>Miembro desde</span>
            </div>
          </div>
          <button onClick={cerrarSesion} className={styles.botonCerrarSesion}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Navegación del perfil */}
      <nav className={styles.navPerfil}>
        <Link href="/perfil" className={styles.navLinkActive}>Mis Favoritos</Link>
        <Link href="/historial" className={styles.navLink}>Historial</Link>
        <Link href="/configuracion" className={styles.navLink}>Configuración</Link>
      </nav>

      {/* Sección de favoritos */}
      <section className={styles.seccionFavoritos}>
        <h2>❤️ Mis Herramientas Favoritas</h2>
        
        {favoritos.length === 0 ? (
          <div className={styles.sinFavoritos}>
            <p>No tienes herramientas favoritas aún</p>
            <Link href="/recomendaciones" className={styles.botonDescubrir}>
              🚀 Descubrir Herramientas
            </Link>
          </div>
        ) : (
          <div className={styles.gridFavoritos}>
            {favoritos.map((ia) => (
              <div key={ia.id} className={styles.tarjetaFavorito}>
                <div className={styles.favoritoHeader}>
                  <span className={styles.emoji}>{ia.emoji}</span>
                  <h3>{ia.nombre}</h3>
                </div>
                <p className={styles.descripcion}>{ia.paraQueSirve}</p>
                <div className={styles.favoritoCategoria}>
                  {ia.categoria}
                </div>
                <div className={styles.favoritoAcciones}>
                  <Link 
                    href={`/recomendaciones#${ia.categoria}`}
                    className={styles.botonVer}
                  >
                    Ver Detalles
                  </Link>
                  <button 
                    onClick={() => eliminarFavorito(ia.id)}
                    className={styles.botonEliminar}
                  >
                    ❌ Quitar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Acciones rápidas */}
      <section className={styles.accionesRapidas}>
        <h3>Acciones Rápidas</h3>
        <div className={styles.gridAcciones}>
          <Link href="/recomendaciones" className={styles.accion}>
            <span className={styles.accionEmoji}>🔍</span>
            <span>Explorar IAs</span>
          </Link>
          <Link href="/chatbot" className={styles.accion}>
            <span className={styles.accionEmoji}>💬</span>
            <span>Chatbot IA</span>
          </Link>
          <Link href="/configuracion" className={styles.accion}>
            <span className={styles.accionEmoji}>⚙️</span>
            <span>Configuración</span>
          </Link>
        </div>
      </section>
    </div>
  );
}