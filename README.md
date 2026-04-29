# zod+nest

Небольшой учебный проект про **сквозной contract-first подход** на базе **ts-rest + Zod**.

Главная идея: один контракт в `shared/contract.ts` описывает структуру данных и API, а затем используется на всех слоях — от React-клиента до NestJS и слоя БД.

## Сквозной Zod-контракт: от фронта до базы

- **Frontend (React)** использует `pokemonContract` через `@ts-rest/core`, поэтому запросы и ответы типобезопасны.
- **Backend (NestJS + @ts-rest/nest)** реализует те же маршруты и валидирует ответы (`validateResponses: true`).
- **Data layer (Drizzle + SQLite)** хранит ту же форму сущности (`id`, `name`, `type`, `description`), что и Zod-схема.
- **Repository** дополнительно проверяет строки из БД через `Pokemon.safeParse(...)`, чтобы не пропустить рассинхрон схем.

Итог: `shared/contract.ts` выступает единым источником правды для формы данных и API-контракта.

## Что в проекте сейчас

- CRUD для `pokemon` на сервере по контракту:
  - `GET /pokemon/:id`
  - `POST /pokemon`
  - `PUT /pokemon/:id`
  - `DELETE /pokemon/:id`
- Простой демонстрационный CRUD UI на нативных HTML-элементах в `client/src/App.tsx`.
- Миграции и схема БД на Drizzle (`server/drizzle`, `server/src/db/schema.ts`).

## Стек

- **Backend:** NestJS, `@ts-rest/nest`, Zod, Drizzle ORM, SQLite
- **Frontend:** React, Vite, `@ts-rest/core`
- **Shared:** локальный пакет `@repo/shared` с контрактом и схемами

## Структура

- `shared/`
  - `contract.ts` — Zod-схемы и `pokemonContract`
- `server/`
  - `src/pokemon/pokemon.controller.ts` — обработчики маршрутов по контракту
  - `src/pokemon/pokemon.service.ts` — бизнес-логика
  - `src/pokemon/pokemon.repository.ts` — доступ к БД + runtime-валидация строк
  - `src/db/schema.ts` — схема таблиц Drizzle
  - `src/db/seed.ts` — сидирование демо-данных
  - `drizzle/` — SQL-миграции
- `client/`
  - `src/App.tsx` — CRUD-интерфейс и вызовы API через контракт

## Запуск

1. Установить зависимости:
   - в `server/`: `npm install`
   - в `client/`: `npm install`
2. Запустить backend:
   - в `server/`: `npm run start:dev`
3. Запустить frontend:
   - в `client/`: `npm run dev`

По умолчанию клиент ходит в `http://localhost:3000`.

## Работа с базой (Drizzle)

- Сгенерировать миграцию: `npm run db:generate`
- Накатить миграции: `npm run db:migrate`
- Засидировать демо-данные: `npm run db:seed`

Если меняешь контракт/схему сущности, нужно синхронно обновлять:
1) Zod-схему в `shared`,  
2) схему Drizzle и миграции,  
3) обработчики/репозиторий на сервере,  
4) клиентские формы и вызовы API.