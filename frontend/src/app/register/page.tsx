'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';
import styles from './register.module.css';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    career: '',
    study_level: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const router = useRouter();

  // ¡TU CLAVE REAL DE RECAPTCHA!
  const RECAPTCHA_SITE_KEY = "6LdO9i4sAAAAAJmGbyTJFlHcmkv_azOrQMSK0Nnf";

  const handleRecaptchaChange = (token: string | null) => {
    console.log("✅ reCAPTCHA token generado:", token);
    setRecaptchaToken(token);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recaptchaToken) {
      setError("⚠️ Por favor, marca la casilla 'No soy un robot'");
      return;
    }
    
    setLoading(true);
    setMessage('');
    setError('');

    try {
      console.log("🔄 Enviando registro...");
      console.log("🔗 URL del backend:", process.env.NEXT_PUBLIC_API_URL);
      console.log("🤖 reCAPTCHA token:", recaptchaToken);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          ...formData,
          recaptchaToken // ¡IMPORTANTE: ENVIAR EL TOKEN!
        }),
      });

      console.log("📡 Status de respuesta:", response.status);
      
      const result = await response.json();
      console.log("📊 Datos recibidos:", result);
      
      if (!response.ok) {
        // Resetear reCAPTCHA si hay error
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
        throw new Error(result.message || `Error ${response.status}`);
      }

      if (result.success) {
        localStorage.setItem('token', result.access_token);
        localStorage.setItem('user', JSON.stringify(result.user));
        setMessage('¡Registro exitoso! Redirigiendo...');
        
        // Forzar actualización del estado global
        window.dispatchEvent(new Event('storage'));
        
        setTimeout(() => {
          router.push('/perfil');
          router.refresh();
        }, 1000);
      } else {
        throw new Error(result.message || 'Error en el registro');
      }
    } catch (error: any) {
      console.error("❌ Error completo:", error);
      setError(error.message || 'Error de conexión con el servidor');
      
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
        <h1 className={styles.title}>Crear Cuenta</h1>
        
        {error && (
          <div className={styles.error}>
            ⚠️ {error}
          </div>
        )}

        {message && (
          <div className={styles.success}>
            ✅ {message}
          </div>
        )}
        
        <div className={styles.inputGroup}>
          <label>Nombre Completo</label>
          <input
            type="text"
            name="name"
            placeholder="María García"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="maria@gmail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label>Carrera que estudias</label>
          <input
            type="text"
            name="career"
            placeholder="Ingeniería en Sistemas"
            value={formData.career}
            onChange={handleChange}
          />
        </div>
        
        <div className={styles.inputGroup}>
          <label>Nivel de estudio</label>
          <select 
            name="study_level"
            value={formData.study_level}
            onChange={handleChange}
          >
            <option value="">Selecciona tu nivel</option>
            <option value="Bachillerato">🎓 Bachillerato</option>
            <option value="Universidad">🎓 Universidad</option>
            <option value="Maestría">🎓 Maestría</option>
            <option value="Doctorado">🎓 Doctorado</option>
          </select>
        </div>
        
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
          className={styles.button}
          disabled={loading || !recaptchaToken}
        >
          {loading ? '🔄 Registrando...' : ' Crear mi cuenta'}
        </button>
        
        <p className={styles.loginLink}>
          ¿Ya tienes cuenta? <Link href="/login">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
}