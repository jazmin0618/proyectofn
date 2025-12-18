"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./login.module.css";
import GoogleLoginButton from "@/componentes/desarrollo/google/GoogleLoginButton";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const router = useRouter();

  // ¡TU CLAVE REAL DE RECAPTCHA!
  const RECAPTCHA_SITE_KEY = "6LdO9i4sAAAAAJmGbyTJFlHcmkv_azOrQMSK0Nnf";

  const handleRecaptchaChange = (token: string | null) => {
    console.log("✅ reCAPTCHA token generado:", token);
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recaptchaToken) {
      setError("⚠️ Por favor, marca la casilla 'No soy un robot'");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("🔄 Enviando login...");
      console.log("🔗 URL del backend:", process.env.NEXT_PUBLIC_API_URL);
      console.log("🤖 reCAPTCHA token:", recaptchaToken);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email, 
          password,
          recaptchaToken // ¡IMPORTANTE: ENVIAR EL TOKEN!
        }),
      });

      console.log("📡 Status de respuesta:", response.status);
      
      const data = await response.json();
      console.log("📊 Datos recibidos:", data);

      if (!response.ok) {
        // Resetear reCAPTCHA si hay error
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
        
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
      
      // Resetear reCAPTCHA
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
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
            placeholder="coloca tu correo"
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
        <div className={styles.separator}>
         <span>O continúa con</span>
         </div>
          <GoogleLoginButton />
          {/* Tu código existente sigue aquí */}
        <p className={styles.registerLink}>
          ¿No tienes cuenta? <Link href="/register">Regístrate</Link>
        </p>
        {/* ¡AQUÍ VA EL RECAPTCHA! */}
        <div className={styles.recaptchaContainer}>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={handleRecaptchaChange}
            theme="light"
            size="normal"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading || !recaptchaToken} 
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
            console.log("reCAPTCHA token:", recaptchaToken);
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