#!/bin/bash

# Este script se asegura de construir tanto el frontend como el backend
# y luego inicia la aplicación principal (el backend).

# --- 1. CONFIGURACIÓN E INSTALACIÓN DEL BACKEND (NestJS) ---
echo "⚙️ Instalando y construyendo el Backend (NestJS)..."
cd backend

# Instala todas las dependencias del backend
npm install

# Compila el código TypeScript a JavaScript de producción
npm run build

# --- 2. CONFIGURACIÓN E INSTALACIÓN DEL FRONTEND ---
# Nota: La mayoría de las veces el frontend debe ser construido
# para generar los archivos estáticos que luego el servidor (backend) servirá.
echo "⚛️ Instalando y construyendo el Frontend..."
cd ../frontend

# Instala las dependencias del frontend
npm install

# Crea la versión optimizada para producción del frontend (ej: carpeta 'dist' o 'build')
npm run build

# --- 3. INICIO DE LA APLICACIÓN ---
cd .. # Vuelve a la raíz del proyecto

echo "🚀 Iniciando la aplicación (ejecutando el backend de producción)..."

# Inicia el servidor de producción del NestJS.
# Asume que el backend está configurado para servir los archivos estáticos
# del frontend (los generados en el paso 2).
# El comando 'start:prod' es el estándar en NestJS.
npm --prefix ./backend start:prod