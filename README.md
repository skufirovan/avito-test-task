# Avito Test Task

Инструкции по локальному запуску фронтенда, бэкенда и локальной установки Ollama (LLM).

## Требования
- Node.js (16+), npm
- Ollama (для локального AI)

## Клонирование репозитория
git clone https://github.com/skufirovan/avito-test-task.git
cd avito-test-task

## Frontend
1. Перейти в папку и установить зависимости:
   cd frontend
   npm install
2. Создать файл frontend/.env с переменной:
   - VITE_API_URL=http://localhost:8080
3. Запустить:
   npm run start

## Backend
1. Перейти в папку и установить зависимости:
   cd server
   npm install
2. Создать файл server/.env с переменными:
   - APP_PORT=8080
   - AI_MODEL="llama3"
3. Запустить:
   npm start

## Ollama
1. Установите Ollama: https://ollama.com
2. Загрузите модель:
   ollama pull llama3
3. Убедитесь, что Ollama запущена:
   ollama serve

> Важно: AI_MODEL в server/.env должен соответствовать имени модели в Ollama (например `llama3`).

## Рекомендуемая последовательность запуска
1. Запустить `ollama serve`
2. Запустить бэкенд (server)
3. Запустить фронтенд (frontend)

## Стек

Frontend
- React 19 + TypeScript
- Vite
- React Router
- Redux Toolkit + RTK Query
- React Hook Form + Zod
- TailwindCSS + shadcn/ui

## Архитектурные решения

Фильтры, поиск, сортировка и пагинация хранятся в query params. Это позволяет сохранять состояние при перезагрузке и делиться ссылкой с текущим состоянием
Реализован кастомный хук useAdsSearchParams для парсинга и нормализации query параметров