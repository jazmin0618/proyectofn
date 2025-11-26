import Link from "next/link";
import styles from "./footer.module.css";

export default function PiePagina() {
  // Función para crear enlaces con parámetros de búsqueda
  const crearEnlaceBusqueda = (termino: string) => {
    return `/recomendaciones?buscar=${encodeURIComponent(termino)}`;
  };

  return (
    <footer className={styles.piePagina}>
      <div className={styles.contenedor}>
        
        <div className={styles.seccionSuperior}>
          
          <div className={styles.infoPrincipal}>
            <div className={styles.logo}>
              <span className={styles.emojiLogo}>🤖</span>
              <h3 className={styles.tituloLogo}>IA Toolkit</h3>
            </div>
            <p className={styles.descripcion}>
              Tu guía definitiva para herramientas de inteligencia artificial. 
              Encuentra, compara y elige la IA perfecta para cada tarea.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className={styles.columnaEnlaces}>
            <h4 className={styles.tituloColumna}>Navegación</h4>
            <ul className={styles.listaEnlaces}>
              <li><Link href="/" className={styles.enlace}>🏠 Inicio</Link></li>
              <li><Link href="/recomendaciones" className={styles.enlace}>🎯 Todas las IAs</Link></li>
              <li><Link href="/chatbot" className={styles.enlace}>💬 Chatbot IA</Link></li>
            </ul>
          </div>

          {/* Búsquedas rápidas por tipo */}
          <div className={styles.columnaEnlaces}>
            <h4 className={styles.tituloColumna}>Búsquedas Rápidas</h4>
            <ul className={styles.listaEnlaces}>
              {/* ✅ Estos enlaces BUSCAN automáticamente */}
              <li>
                <Link href={crearEnlaceBusqueda("imagen")} className={styles.enlace}>
                  🎨 Generar Imágenes
                </Link>
              </li>
              <li>
                <Link href={crearEnlaceBusqueda("video")} className={styles.enlace}>
                  🎬 Crear Video
                </Link>
              </li>
              <li>
                <Link href={crearEnlaceBusqueda("escribir")} className={styles.enlace}>
                  ✍️ Asistente Escritura
                </Link>
              </li>
              <li>
                <Link href={crearEnlaceBusqueda("programar")} className={styles.enlace}>
                  💻 Herramientas Code
                </Link>
              </li>
              <li>
                <Link href={crearEnlaceBusqueda("música")} className={styles.enlace}>
                  🎧 Generar Audio
                </Link>
              </li>
              <li>
                <Link href={crearEnlaceBusqueda("estudiar")} className={styles.enlace}>
                  📚 Ayuda Estudio
                </Link>
              </li>
            </ul>
          </div>

          {/* Categorías por ID de sección */}
          <div className={styles.columnaEnlaces}>
            <h4 className={styles.tituloColumna}>Ir a Sección</h4>
            <ul className={styles.listaEnlaces}>
              {/* ✅ Estos enlaces hacen SCROLL a la sección */}
              <li>
                <Link href="/recomendaciones#imagenes" className={styles.enlace}>
                  🎨 Ver Imágenes
                </Link>
              </li>
              <li>
                <Link href="/recomendaciones#video" className={styles.enlace}>
                  🎬 Ver Video
                </Link>
              </li>
              <li>
                <Link href="/recomendaciones#escritura" className={styles.enlace}>
                  ✍️ Ver Escritura
                </Link>
              </li>
              <li>
                <Link href="/recomendaciones#programacion" className={styles.enlace}>
                  💻 Ver Programación
                </Link>
              </li>
              <li>
                <Link href="/recomendaciones#audio" className={styles.enlace}>
                  🎧 Ver Audio
                </Link>
              </li>
              <li>
                <Link href="/recomendaciones#estudio" className={styles.enlace}>
                  📚 Ver Educación
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className={styles.separador}></div>

        <div className={styles.seccionInferior}>
          <div className={styles.derechos}>
            <p>© 2024 <strong>IA Toolkit</strong>. Hecho con ❤️ para la comunidad de IA.</p>
          </div>
        </div>

      </div>
    </footer>
  );
}