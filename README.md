# WhatsApp Chat на GREEN-API

Веб-интерфейс для отправки и получения текстовых сообщений WhatsApp через сервис [GREEN-API](https://green-api.com).

**Демо:** <[ссылка на Vercel](https://whatsapp-chat-kred.vercel.app/)>

## Возможности

- Вход по учётным данным GREEN-API (`idInstance`, `apiTokenInstance`)
- Создание чата по номеру телефона
- Отправка текстовых сообщений (метод `SendMessage`)
- Получение входящих сообщений через HTTP API (`ReceiveNotification` + `DeleteNotification`)
- Интерфейс по мотивам WhatsApp Web

> В задании основным мессенджером указан MAX, но допускается WhatsApp — выбран он.

## Стек

React, Vite, CSS Modules. Без бэкенда и сторонних UI-библиотек.

## Запуск

```bash
npm install
npm run dev
```

## Настройка инстанса GREEN-API

1. Создайте инстанс в [личном кабинете](https://console.green-api.com) и авторизуйте его через QR-код в WhatsApp.
2. В настройках инстанса включите **«Получать уведомления о входящих сообщениях и файлах»**.
3. Поле URL для уведомлений оставьте пустым — иначе уведомления не попадут в очередь HTTP API.

## Как устроено получение сообщений

Приложение в цикле запрашивает уведомления методом `receiveNotification` (long polling, `receiveTimeout=5`).
Каждое уведомление после обработки удаляется методом `deleteNotification`, иначе очередь не продвигается.
Обрабатываются только входящие текстовые сообщения из личных чатов (`textMessage`, `extendedTextMessage`),
остальные уведомления удаляются без обработки.

## Структура

```
src/
├── api/greenApi.js          — запросы к GREEN-API
├── hooks/useNotifications.js — цикл получения сообщений
├── utils/                   — нормализация номера, разбор уведомлений
└── components/              — Login, ChatPage, Sidebar, ChatWindow, Message, MessageInput
```
