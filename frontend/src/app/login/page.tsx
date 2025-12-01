"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("🔄 Enviando login...");
      
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("📡 Status de respuesta:", response.status);
      
      const data = await response.json();
      console.log("📊 Datos recibidos:", data);

      if (!response.ok) {
        throw new Error(data.message || `Error ${response.status}`);
      }

      if (data.success && data.access_token && data.user) {
        console.log("✅ Login exitoso!");
        
        // Guardar en localStorage
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        console.log("💾 Datos guardados en localStorage");
        console.log("Token:", data.access_token);
        console.log("User:", data.user);
        
        // Forzar actualización del estado global
        window.dispatchEvent(new Event('storage'));
        
        // Redirigir al perfil
        router.push("/perfil");
        router.refresh(); // Forzar recarga de Next.js
        
      } else {
        throw new Error("Respuesta inválida del servidor");
      }
      
    } catch (error: any) {
      console.error("❌ Error completo:", error);
      setError(error.message || "Error al iniciar sesión");
      
      // Limpiar localStorage si hay error
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Iniciar Sesión</h1>
        
        {error && (
          <div className={styles.error}>
            ⚠️ {error}
          </div>
        )}
        
        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="maria@gmail.com"
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading} 
          className={styles.button}
        >
          {loading ? "🔄 Procesando..." : "🔑 Ingresar"}
        </button>
        
        <p className={styles.registerLink}>
          ¿No tienes cuenta? <Link href="/register">Regístrate</Link>
        </p>
        
        {/* Botón de debug */}
        <button 
          type="button" 
          onClick={() => {
            console.log("🔍 Debug localStorage:");
            console.log("user:", localStorage.getItem("user"));
            console.log("token:", localStorage.getItem("token"));
            console.log("login_time:", new Date().toISOString());
          }}
          className={styles.debugButton}
        >
          Ver Debug
        </button>
      </form>
    </div>
  );
}