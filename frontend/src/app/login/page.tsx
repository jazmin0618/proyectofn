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
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // ✅ GUARDAR TOKEN Y USUARIO EN LOCALSTORAGE
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user)); // ← ¡IMPORTANTE!
        
        console.log("Login exitoso, usuario guardado:", data.user);
        
        // Redirigir al perfil
        router.push("/perfil");
      } else {
        setError(data.message || "Error al iniciar sesión");
      }
    } catch (error) {
      setError("Error de conexión con el servidor");
      console.error("Error en login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Iniciar Sesión</h1>
        
        {error && <div className={styles.error}>{error}</div>}
        
        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Iniciando sesión..." : "Ingresar"}
        </button>
        
        <p className={styles.registerLink}>
          ¿No tienes cuenta? <Link href="/register">Regístrate</Link>
        </p>
      </form>
    </div>
  );
}