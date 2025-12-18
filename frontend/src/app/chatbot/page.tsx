"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./chatbot.module.css";
import ReactMarkdown from "react-markdown";

export default function ChatBotPage() {
  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [cargando, setCargando] = useState(false);
  const [historial, setHistorial] = useState<Array<{pregunta: string, respuesta: string}>>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const responseRef = useRef<HTMLDivElement>(null);

  // URL dinámica para desarrollo/producción
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 
    (process.env.NODE_ENV === 'production' 
      ? "https://proyectofn-backend.onrender.com" 
      : "http://localhost:3001");

  const enviarPregunta = async () => {
    if (!pregunta.trim()) return;

    setCargando(true);
    
    // Agregar al historial
    setHistorial(prev => [...prev, { pregunta, respuesta: "" }]);

    try {
      console.log("Enviando a:", `${BACKEND_URL}/ia/recomendar`);
      
      const res = await fetch(`${BACKEND_URL}/ia/recomendar`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ 
          pregunta,
          timestamp: new Date().toISOString()
        }),
      });

      // Verificar respuesta
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
console.log("Respuesta recibida:", data);
console.log("DEBUG - Tipo de data.respuesta:", typeof data?.respuesta);
console.log("DEBUG - Valor de data.respuesta:", data?.respuesta);

// SOLUCIÓN DEFINITIVA: Manejar OBJETOS ANIDADOS
let nuevaRespuesta = "";
let respuestaRaw = data?.respuesta;

// CASO 1: Si respuesta es un OBJETO con propiedad 'content'
if (respuestaRaw && typeof respuestaRaw === 'object' && respuestaRaw.content) {
  nuevaRespuesta = String(respuestaRaw.content);
}
// CASO 2: Si respuesta es un STRING directo
else if (typeof respuestaRaw === 'string') {
  nuevaRespuesta = respuestaRaw;
}
// CASO 3: Si respuesta es un OBJETO sin 'content'
else if (respuestaRaw && typeof respuestaRaw === 'object') {
  // Intenta encontrar texto en propiedades comunes
  if (respuestaRaw.text) nuevaRespuesta = String(respuestaRaw.text);
  else if (respuestaRaw.message) nuevaRespuesta = String(respuestaRaw.message);
  else if (respuestaRaw.result) nuevaRespuesta = String(respuestaRaw.result);
  else nuevaRespuesta = JSON.stringify(respuestaRaw);
}
// CASO 4: Si no hay respuesta
else {
  nuevaRespuesta = "No se recibió respuesta válida";
}

// SOLO hacer substring si es un string y tiene longitud
if (typeof nuevaRespuesta === 'string' && nuevaRespuesta.length > 2000) {
  nuevaRespuesta = nuevaRespuesta.substring(0, 2000) + "...";
}
      setRespuesta(nuevaRespuesta);
      
      // Actualizar historial
      setHistorial(prev => {
        const nuevoHistorial = [...prev];
        if (nuevoHistorial.length > 0) {
          nuevoHistorial[nuevoHistorial.length - 1].respuesta = nuevaRespuesta;
        }
        return nuevoHistorial;
      });

    } catch (error: any) {
      console.error("Error completo:", error);
      
      const errorMsg = error.message.includes("Failed to fetch") 
        ? `Error de conexión. Backend en: ${BACKEND_URL}`
        : `Error: ${error.message}`;
      
      setRespuesta(errorMsg);
      
      setHistorial(prev => {
        const nuevoHistorial = [...prev];
        if (nuevoHistorial.length > 0) {
          nuevoHistorial[nuevoHistorial.length - 1].respuesta = errorMsg;
        }
        return nuevoHistorial;
      });
    } finally {
      setCargando(false);
      setPregunta("");
    }
  };

  const limpiarChat = () => {
    setPregunta("");
    setRespuesta("");
    setHistorial([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      enviarPregunta();
    }
  };

  // Auto-ajustar altura del textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [pregunta]);

  // Scroll automático a la respuesta
  useEffect(() => {
    if (responseRef.current && (respuesta || cargando)) {
      responseRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [respuesta, cargando]);

  return (
    <div className={styles.container}>
      <div className={styles.chatbotWrapper}>
        
        {/* Panel izquierdo - Información */}
        <div className={styles.leftPanel}>
          <h1 className={styles.title}>
            Asistente Inteligente
          </h1>
          
          <p className={styles.subtitle}>
            Obtén recomendaciones personalizadas y respuestas inteligentes 
            para optimizar tus procesos. Nuestra IA está entrenada para 
            ayudarte en diversas tareas.
          </p>
          
          <ul className={styles.featureList}>
            <li className={styles.featureItem}>
              <span className={styles.icon}>⚡</span>
              Respuestas en tiempo real
            </li>
            <li className={styles.featureItem}>
              <span className={styles.icon}>🔒</span>
              Comunicación segura y privada
            </li>
            <li className={styles.featureItem}>
              <span className={styles.icon}>💡</span>
              Recomendaciones inteligentes
            </li>
            <li className={styles.featureItem}>
              <span className={styles.icon}>🔄</span>
              Aprendizaje continuo
            </li>
          </ul>
        </div>

        {/* Panel derecho - Chat */}
        <div className={styles.rightPanel}>
          <div className={styles.chatContainer}>
            
            <textarea
              ref={textareaRef}
              value={pregunta}
              onChange={(e) => setPregunta(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Escribe tu pregunta o consulta aquí... (Presiona Enter para enviar, Shift+Enter para nueva línea)"
              className={styles.inputArea}
              rows={4}
            />
            
            <div className={styles.buttonContainer}>
              <button
                onClick={enviarPregunta}
                disabled={cargando || !pregunta.trim()}
                className={styles.submitButton}
              >
                {cargando ? (
                  <>
                    <span className={styles.loadingSpinner} style={{width: '20px', height: '20px'}} />
                    Procesando...
                  </>
                ) : (
                  <>
                    <span>📤</span> 
                    Enviar Consulta
                  </>
                )}
              </button>
              
              <button
                onClick={limpiarChat}
                className={styles.clearButton}
              >
                <span>🗑️</span> Limpiar
              </button>
            </div>

            {/* Historial de conversación */}
            {historial.length > 0 && (
              <div style={{ marginTop: '30px' }}>
                <h3 style={{ color: '#2A6F97', marginBottom: '15px' }}>
                  📝 Historial de Conversación
                </h3>
                {historial.map((item, index) => (
                  <div key={index} style={{ marginBottom: '20px', padding: '15px', background: '#f8fafc', borderRadius: '10px' }}>
                    <p><strong>Tú:</strong> {item.pregunta}</p>
                    {item.respuesta && (
                     <div style={{ marginTop: '10px', color: '#01497C', whiteSpace: 'pre-wrap' }}>
                        <strong>IA:</strong> 
                        <ReactMarkdown>{item.respuesta}</ReactMarkdown>
                     </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Respuesta actual */}
            {cargando && (
              <div ref={responseRef} className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p className={styles.loadingText}>Analizando tu consulta...</p>
              </div>
            )}
            
            {respuesta && !cargando && (
              <div ref={responseRef} className={styles.responseContainer}>
                <div className={styles.responseTitle}>
                  <span>🤖</span>
                  <h3>Respuesta del Asistente</h3>
                </div>
                <div className={styles.responseContent}
                style={{whiteSpace: 'pre-wrap', color:'#000000'}}>
                 <ReactMarkdown>{respuesta}</ReactMarkdown>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}