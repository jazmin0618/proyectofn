"use client";
import { useState } from "react";
import ModalIA from "../modal/modalia";
import styles from "./cardia.module.css";

interface TarjetaIAProps {
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
}

export default function TarjetaIA({ ia, categoria }: TarjetaIAProps) {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [errorImagen, setErrorImagen] = useState(false);

  // Función para imagen placeholder si no hay imagen
  const obtenerImagen = () => {
    if (ia.imagenes && !errorImagen) {
      return ia.imagenes;
    }
    // Placeholder con color basado en el nombre
    const colores = ['FF6B6B', '4ECDC4', '45B7D1', '96CEB4', 'FFEAA7', 'DDA0DD'];
    const color = colores[ia.nombre.length % colores.length];
    return `https://via.placeholder.com/400x200/${color}/FFFFFF?text=${encodeURIComponent(ia.nombre)}`;
  };

  return (
    <>
      <div className={styles.tarjeta}>
        {/* Imagen */}
        <div className={styles.contenedorImagen}>
          <img 
            src={obtenerImagen()} 
            alt={ia.nombre}
            className={styles.imagen}
            onError={() => setErrorImagen(true)}
          />
          <div className={styles.emojiSuperpuesto}>
            {ia.emoji}
          </div>
        </div>

        {/* Contenido */}
        <div className={styles.contenido}>
          <h3 className={styles.nombre}>{ia.nombre}</h3>
          <p className={styles.descripcion}>
            {ia.paraQueSirve}
          </p>
          
          <button 
            className={styles.botonVerMas}
            onClick={() => setModalAbierto(true)}
          >
            🔍 Ver más información
          </button>
        </div>

        <div className={styles.categoria}>
          {categoria}
        </div>
      </div>

      {/* Modal */}
      <ModalIA 
        ia={ia}
        categoria={categoria}
        abierto={modalAbierto}
        onCerrar={() => setModalAbierto(false)}
      />
    </>
  );
}