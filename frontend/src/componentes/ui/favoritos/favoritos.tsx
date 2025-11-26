"use client";
import { useState, useEffect } from "react";
import styles from "./Favoritos.module.css";

interface FavoritosProps {
  iaId: number;
  iaNombre: string;
  size?: "small" | "medium" | "large";
}

export default function Favoritos({ iaId, iaNombre, size = "medium" }: FavoritosProps) {
  const [esFavorito, setEsFavorito] = useState(false);
  const [usuario, setUsuario] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const userObj = JSON.parse(userData);
      setUsuario(userObj);
      
      const favoritos = JSON.parse(localStorage.getItem(`favoritos_${userObj.id}`) || '[]');
      setEsFavorito(favoritos.includes(iaId));
    }
  }, [iaId]);

  const toggleFavorito = () => {
    if (!usuario) {
      alert('Debes iniciar sesión para guardar favoritos');
      return;
    }

    const favoritos = JSON.parse(localStorage.getItem(`favoritos_${usuario.id}`) || '[]');
    
    if (esFavorito) {
      // Remover de favoritos
      const nuevosFavoritos = favoritos.filter((id: number) => id !== iaId);
      localStorage.setItem(`favoritos_${usuario.id}`, JSON.stringify(nuevosFavoritos));
      setEsFavorito(false);
    } else {
      // Agregar a favoritos
      favoritos.push(iaId);
      localStorage.setItem(`favoritos_${usuario.id}`, JSON.stringify(favoritos));
      setEsFavorito(true);
    }

    // Disparar evento para actualizar contadores
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <button 
      onClick={toggleFavorito}
      className={`${styles.favorito} ${styles[size]} ${esFavorito ? styles.activo : ''}`}
      title={esFavorito ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      {esFavorito ? '❤️' : '🤍'}
    </button>
  );
}