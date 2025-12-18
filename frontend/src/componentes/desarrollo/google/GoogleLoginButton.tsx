'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './GoogleLoginButton.module.css';

// 1. ESTO SOLUCIONA EL ERROR DE WINDOW
declare global {
  interface Window {
    handleGoogleLogin: (response: any) => Promise<void>;
  }
}

export default function GoogleLoginButton() {
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    window.handleGoogleLogin = async (response: any) => {
      console.log('🤖 Respuesta de Google:', response);
      const idToken = response.credential;
      
      try {
        const backendResponse = await fetch('https://proyectofn-backend.onrender.com/auth/google/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: idToken }),
        });

        const data = await backendResponse.json();
        
        if (backendResponse.ok && data.success) {
          localStorage.setItem('token', data.access_token);
          localStorage.setItem('user', JSON.stringify(data.user));
          window.dispatchEvent(new Event('storage'));
          router.push('/perfil');
          router.refresh();
        } else {
          throw new Error(data.message || 'Error en autenticación con Google');
        }
      } catch (error: any) { // 2. ESTO SOLUCIONA EL ERROR DE UNKNOWN
        console.error('❌ Error en login con Google:', error);
        alert('Error al iniciar sesión con Google: ' + (error.message || 'Error inesperado'));
      }
    };

    return () => {
      // Usamos el casting (window as any) aquí para evitar problemas al borrar
      delete (window as any).handleGoogleLogin;
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [router]);

  return (
    <div className={styles.googleContainer}>
      <h3 className={styles.googleTitle}>O inicia sesión con</h3>
      <div
        id="g_id_onload"
        data-client_id="827032793854-3a5e4615446gq0no3k2nhit66lunruh3.apps.googleusercontent.com"
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleGoogleLogin"
        data-auto_prompt="false"
      ></div>
      
      <div
        className="g_id_signin"
        data-type="standard"
        data-size="large"
        data-theme="outline"
        data-text="sign_in_with"
        data-shape="rectangular"
        data-logo_alignment="left"
        data-width="300"
      ></div>
    </div>
  );
}