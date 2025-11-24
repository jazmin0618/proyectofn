"use client";
import { useState } from "react";
import Boton from "@/componentes/ui/button/boton";
import styles from "./asistente.module.css";

interface IAsData{
  [key: string]: any[];
}
interface AsistenteProps {
  datosIAs: IAsData | null;
}
const preguntas = [
  {
    id: 1,
    pregunta: "¿Qué necesitas hacer?",
    opciones: [
      { id: "disenar", texto: "🎨 Diseñar imágenes o arte", categoria: "imagenes" },
      { id: "escribir", texto: "✍️ Escribir o editar texto", categoria: "escritura" },
      { id: "programar", texto: "💻 Programar o desarrollar", categoria: "programacion" },
      { id: "estudiar", texto: "📚 Estudiar o investigar", categoria: "estudio" },
    ]
  }
];

export default function AsistenteRecomendacion({ datosIAs }: AsistenteProps) {
  const [pasoActual, setPasoActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});

  const manejarRespuesta = (preguntaId: number, respuesta: string) => {
    setRespuestas(prev => ({ ...prev, [preguntaId]: respuesta }));
    
    if (pasoActual < preguntas.length - 1) {
      setPasoActual(prev => prev + 1);
    } else {
      // Aquí enviar respuestas a tu backend Nest.js
      console.log("Respuestas completadas:", { ...respuestas, [preguntaId]: respuesta });
    }
  };

  const pregunta = preguntas[pasoActual];

  return (
    <div className={styles.asistente}>
      <h2>Encuentra tu IA ideal en {preguntas.length} pasos</h2>
      
      <div className={styles.progreso}>
        <div 
          className={styles.barraProgreso} 
          style={{ width: `${((pasoActual + 1) / preguntas.length) * 100}%` }}
        ></div>
      </div>

      <div className={styles.pregunta}>
        <h3>{pregunta.pregunta}</h3>
        <div className={styles.opciones}>
          {pregunta.opciones.map((opcion) => (
            <Boton
              key={opcion.id}
              tipo="secundario"
              onClick={() => manejarRespuesta(pregunta.id, opcion.id)}
            >
              {opcion.texto}
            </Boton>
          ))}
        </div>
      </div>

      <div className={styles.navegacion}>
        {pasoActual > 0 && (
          <Boton onClick={() => setPasoActual(prev => prev - 1)}>
            ← Anterior
          </Boton>
        )}
        <span>Paso {pasoActual + 1} de {preguntas.length}</span>
      </div>
    </div>
  );
}