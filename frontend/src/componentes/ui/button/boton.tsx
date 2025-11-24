"use client";
import styles from "./boton.module.css";

interface BotonProps {
  children: React.ReactNode;
  onClick?: () => void;
  tipo?: "primario" | "secundario" | "peligro";
  disabled?: boolean;
}

export default function Boton({ 
  children, 
  onClick, 
  tipo = "primario",
  disabled = false 
}: BotonProps) {
  return (
    <button 
      className={`${styles.boton} ${styles[tipo]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}