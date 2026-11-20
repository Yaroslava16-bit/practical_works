const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Импорт роутеров
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

// Middleware для парсинга JSON
app.use(express.json());

// Middleware для логирования (исправлены кавычки)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - IP: ${req.ip}`);
  next();
});

// Middleware для добавления базовых заголовков безопасности
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});

// Упрощенный Rate Limiting
const requestCounts = {};
app.use((req, res, next) => {
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 минут
  const maxRequests = 100;

  if (!requestCounts[ip]) {
    requestCounts[ip] = { count: 1, startTime: now };
  } else {
    if (now - requestCounts[ip].startTime > windowMs) {
      requestCounts[ip] = { count: 1, startTime: now };
    } else {
      requestCounts[ip].count++;
    }
  }

  if (requestCounts[ip].count > maxRequests) {
    return res.status(429).json({
      error: 'Слишком много запросов',
      message: 'Пожалуйста, попробуйте позже'
    });
  }
  next();
});

// Базовые маршруты
app.get('/', (req, res) => {
  res.json({
    message: 'Добро пожаловать в Express.js приложение!',
    endpoints: {
      '/api/users': 'Работа с пользователями',
      '/api/products': 'Работа с товарами'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage(),
    uptime: process.uptime()
  });
});

// Подключение роутеров
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);

// Обработка 404 (должна быть после всех роутов)
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Маршрут не найден',
    path: req.originalUrl,
    availableEndpoints: [
      'GET /', 'GET /health',
      'GET /api/users', 'GET /api/users/:id', 'POST /api/users', 'PUT /api/users/:id', 'DELETE /api/users/:id',
      'GET /api/products', 'GET /api/products/:id', 'POST /api/products'
    ]
  });
});

// Централизованная обработка ошибок (4 аргумента)
app.use((err, req, res, next) => {
  console.error('Ошибка сервера:', err.stack);
  res.status(500).json({
    error: 'Внутренняя ошибка сервера',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Что-то пошло не так'
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Express сервер запущен на порту ${PORT}`);
  console.log(`Доступен по адресу: http://localhost:${PORT}`);
});
