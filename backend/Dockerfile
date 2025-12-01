# 1. IMAGEN BASE
FROM node:lts-slim

# 2. DIRECTORIO DE TRABAJO BASE
WORKDIR /app

# 3. COPIA DE ARCHIVOS
COPY . .

# ---------------------------------------------
# 4. PASO DE BUILD DEL BACKEND (NestJS)
# ---------------------------------------------
RUN echo "⚙️ Instalando y construyendo el Backend..."
# Cambiamos el WORKDIR al subproyecto del backend
WORKDIR /app/backend 
RUN npm install 
# Usamos TSC/npx directamente para evitar el error de tsconfig.json
RUN npx tsc -p tsconfig.build.json

# ---------------------------------------------
# 5. PASO DE BUILD DEL FRONTEND (Next.js)
# ---------------------------------------------
RUN echo "⚛️ Instalando y construyendo el Frontend..."
# Cambiamos el WORKDIR al subproyecto del frontend
WORKDIR /app/frontend
RUN npm install 
RUN npm run build

# ---------------------------------------------
# 6. CONFIGURACIÓN FINAL Y ARRANQUE
# ---------------------------------------------
# Volvemos al directorio raíz (/app) para el comando de inicio (CMD)
WORKDIR /app 
EXPOSE 3000

# Comando para iniciar la aplicación de NestJS, que debe servir el frontend
CMD ["npm", "start:prod", "--prefix", "./backend"]
