
#  Avito-Test-Task

##  Описание проекта

Этот проект представляет собой веб-приложение для размещения объявлений, аналогичное Avito.  
Пользователи могут создавать, просматривать, редактировать и фильтровать объявления по категориям.  

Проект разработан с использованием **React (Frontend)** и **Node.js + Express (Backend)**.  
Запуск возможен как **локально**, так и с помощью **Docker Compose**.

---

##  **Технологии**

- **Frontend**: React, React Router, CSS Modules, Nginx (для продакшн-сборки).
- **Backend**: Node.js, Express, CORS, body-parser.
- **База данных**: Временное in-memory хранилище (для тестирования).
- **Docker**: Контейнеризация клиента и сервера с помощью `docker-compose`.

---

##  **Запуск проекта (локально)**

###  **1. Установка зависимостей**
```sh
cd server
npm install
cd ../client
npm install
```

###  **2. Запуск сервера**
```sh
cd server
npm start
```
> Сервер запустится на `http://localhost:3000`

###  **3. Запуск клиента**
```sh
cd client
npm start
```
> React-приложение будет доступно на `http://localhost:3001`  

---

##  **Запуск через Docker Compose**

###  **1. Собрать и запустить контейнеры**
```sh
docker-compose up --build
```
> После сборки и запуска:
> - **Клиент (React)** будет доступен на `http://localhost`
> - **Сервер (API)** — на `http://localhost:3000`

###  **2. Остановка контейнеров**
```sh
docker-compose down
```

---

##  **Структура проекта**
```plaintext
Avito-test-task/
│── client/            # Frontend (React)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── img/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.js
│   │   ├── index.css
│   │   ├── index.js
│   ├── Dockerfile
│   ├── package-lock.json
│   ├── package.json
│   └── .gitignore
│
│── server/            # Backend (Node.js, Express)
│   ├── app.js
│   ├── package.json
│   ├── package-lock.json
│   ├── Dockerfile
│   ├── .gitignore
│
│── docker-compose.yml # Docker Compose для запуска проекта
│── README.md          # Документация
```

---

## **Обоснование технологий**

 **React** — для быстрого и удобного создания UI.  
 **Express.js** — лёгкий и мощный серверный фреймворк для API.  
 **Docker** — упрощает развертывание проекта и делает его кроссплатформенным.  
 **Nginx** — используется в контейнере клиента для быстрой отдачи статических файлов.  

