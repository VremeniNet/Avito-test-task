# Используем официальный образ Node.js
FROM node:18

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем код приложения в контейнер
COPY . .

# Открываем порт сервера
EXPOSE 3000

# Запускаем сервер
CMD ["node", "app.js"]
