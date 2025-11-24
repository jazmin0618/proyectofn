"use client";
import { useEffect } from "react";
import styles from "./modalia.module.css";

interface ModalIAProps {
  ia: {
    id: number;
    nombre: string;
    emoji: string;
    paraQueSirve: string;
    diferencia: string;
    porQueUsarla: string;
    imagenes?: string;
  };
  categoria: string;
  abierto: boolean;
  onCerrar: () => void;
}

export default function ModalIA({ ia, categoria, abierto, onCerrar }: ModalIAProps) {
  // Cerrar modal con ESC
  useEffect(() => {
    const manejarTeclaESC = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCerrar();
      }
    };

    if (abierto) {
      document.addEventListener('keydown', manejarTeclaESC);
      document.body.style.overflow = 'hidden'; // Prevenir scroll
    }

    return () => {
      document.removeEventListener('keydown', manejarTeclaESC);
      document.body.style.overflow = 'unset';
    };
  }, [abierto, onCerrar]);

  if (!abierto) return null;

  return (
    <div className={styles.fondoModal} onClick={onCerrar}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header del modal */}
        <div className={styles.headerModal}>
          <div className={styles.tituloModal}>
            <span className={styles.emoji}>{ia.emoji}</span>
            <h2>{ia.nombre}</h2>
          </div>
          <button className={styles.botonCerrar} onClick={onCerrar}>
            ✕
          </button>
        </div>

        {/* Contenido del modal */}
        <div className={styles.contenidoModal}>
          {/* Imagen grande */}
          {ia.imagenes && (
            <div className={styles.imagenGrande}>
              <img 
                src={ia.imagenes} 
                alt={ia.nombre}
                className={styles.imagenModal}
              />
            </div>
          )}

          {/* Información detallada */}
          <div className={styles.informacion}>
            <div className={styles.seccion}>
              <h3>🎯 ¿Para qué sirve?</h3>
              <p>{ia.paraQueSirve}</p>
            </div>

            <div className={styles.seccion}>
              <h3>⭐ Diferencia clave</h3>
              <p>{ia.diferencia}</p>
            </div>

            <div className={styles.seccion}>
              <h3>💡 ¿Por qué usarla?</h3>
              <p>{ia.porQueUsarla}</p>
            </div>

            <div className={styles.seccion}>
              <h3>📁 Categoría</h3>
              <span className={styles.badgeCategoria}>{categoria}</span>
            </div>
          </div>
        </div>

        {/* Footer del modal */}
        <div className={styles.footerModal}>
          <button className={styles.botonAccion} onClick={onCerrar}>
            Cerrar
          </button>
          <button className={styles.botonAccionPrimario}>
            🚀 Usar esta herramienta
          </button>
        </div>
      </div>
    </div>
  );
}