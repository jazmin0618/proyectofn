# 1. IMAGEN BASE: Usamos una imagen oficial de Node.js (versión LTS).
FROM node:lts-slim

# 2. DIRECTORIO DE TRABAJO: Todos los comandos se ejecutan desde /app
WORKDIR /app

# 3. COPIA DE ARCHIVOS: Copia todo el contenido del repositorio al contenedor
COPY . .

# 4. PASO DE BUILD DEL BACKEND (NestJS)
# Instalamos y construimos el Backend, que será el servidor principal.
RUN echo "⚙️ Instalando y construyendo el Backend..."
RUN cd backend && npm install && npm run build

# 5. PASO DE BUILD DEL FRONTEND (Next.js)
# Next.js debe ser construido para generar los archivos estáticos.
# ¡Asegúrate de que tus variables de entorno estén disponibles durante el build de Next!
RUN echo "⚛️ Instalando y construyendo el Frontend..."
RUN cd frontend && npm install && npm run build

# 6. EXPOSICIÓN DE PUERTO: El puerto que usa NestJS por defecto es 3000
EXPOSE 3000

# 7. COMANDO DE INICIO: Ejecuta el servidor de producción del Backend (NestJS).
# Este backend debe estar configurado para servir los archivos estáticos
# generados por Next.js en el paso 5.
CMD ["npm", "start:prod", "--prefix", "./backend"]