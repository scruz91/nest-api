# Etapa 1: Construcción de la aplicación
FROM node:18-alpine AS builder

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instalar las dependencias de producción y desarrollo
RUN npm install --legacy-peer-deps

# Copiar el resto del código de la aplicación
COPY . .

# Compilar la aplicación NestJS
RUN npm run build

# Etapa 2: Configuración de la imagen final
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar solo las dependencias necesarias y los archivos compilados desde la etapa anterior
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Copiar el archivo .env (si lo necesitas)
# COPY .env .env

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["node", "dist/main"]
