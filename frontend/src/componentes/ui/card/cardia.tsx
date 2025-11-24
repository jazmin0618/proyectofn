"use client";
import { useState } from "react";
import styles from "./cardia.module.css";
import ModalIA from "../modal/modalia";

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

  return (
    <>
      <div className={styles.tarjeta}>
        {/* Imagen de la IA */}
        <div className={styles.contenedorImagen}>
          {ia.imagenes ? (
            <img 
              src={ia.imagenes} 
              alt={ia.nombre}
              className={styles.imagen}
              onError={(e) => {
                // Si la imagen falla, mostrar el emoji
                (e.target as HTMLElement).style.display = 'none';
                const emojiElement = document.getElementById(`emoji-${ia.id}`);
                if (emojiElement) emojiElement.style.display = 'block';
              }}
            />
          ) : null}
          
          {/* Emoji de respaldo si no hay imagen */}
          <div id={`emoji-${ia.id}`} className={styles.emojiRespaldo}>
            {ia.emoji}
          </div>
        </div>

        {/* Contenido de la card */}
        <div className={styles.contenido}>
          <h3 className={styles.nombre}>{ia.nombre}</h3>
          <p className={styles.descripcionCorta}>
            {ia.paraQueSirve.length > 100 
              ? `${ia.paraQueSirve.substring(0, 100)}...` 
              : ia.paraQueSirve
            }
          </p>
          
          <button 
            className={styles.botonVerMas}
            onClick={() => setModalAbierto(true)}
          >
            🔍 Ver más información
          </button>
        </div>

        {/* Badge de categoría */}
        <div className={styles.categoria}>
          {categoria}
        </div>
      </div>

      {/* Modal que se abre */}
      <ModalIA 
        ia={ia}
        categoria={categoria}
        abierto={modalAbierto}
        onCerrar={() => setModalAbierto(false)}
      />
    </>
  );
}