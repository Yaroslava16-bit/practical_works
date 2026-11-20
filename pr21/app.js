const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware для парсинга JSON
app.use(express.json());

// Middleware для логирования запросов
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Временное хранилище данных (вместо БД)
let books = [
  {
    id: 1,
    title: "JavaScript для начинающих",
    author: "Иван Иванов",
    year: 2023,
    isbn: "123-456-789",
    genre: "Программирование",
    available: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

let nextId = 2; // Счетчик для новых ID

// ==========================================
// ЧАСТЬ A: GET endpoints
// ==========================================

// 1. GET /api/books - получить все книги (с фильтрацией и пагинацией)
app.get('/api/books', (req, res) => {
  let result = [...books];
  const { author, genre, year, page = 1, limit = 10 } = req.query;

  // Фильтрация
  if (author) {
    result = result.filter(b => b.author.toLowerCase().includes(author.toLowerCase()));
  }
  if (genre) {
    result = result.filter(b => b.genre.toLowerCase() === genre.toLowerCase());
  }
  if (year) {
    result = result.filter(b => b.year === parseInt(year));
  }

  // Пагинация
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const startIndex = (pageNum - 1) * limitNum;
  const endIndex = pageNum * limitNum;
  
  const paginatedResult = result.slice(startIndex, endIndex);

  res.status(200).json({
    data: paginatedResult,
    meta: {
      total: result.length,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(result.length / limitNum)
    }
  });
});

// 2. GET /api/books/:id - получить книгу по ID
app.get('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ error: 'Книга не найдена', id: bookId });
  }

  res.status(200).json({ data: book });
});

// ==========================================
// ЧАСТЬ B: POST endpoint
// ==========================================

// 3. POST /api/books - создать книгу
app.post('/api/books', (req, res, next) => {
  try {
    const { title, author, year, isbn, genre, available = true } = req.body;

    // Валидация обязательных полей
    if (!title || !author) {
      return res.status(400).json({ error: 'Поля title и author обязательны' });
    }

    // Проверка уникальности ISBN (если он передан)
    if (isbn && books.some(b => b.isbn === isbn)) {
      return res.status(409).json({ error: 'Книга с таким ISBN уже существует' });
    }

    const newBook = {
      id: nextId++,
      title,
      author,
      year: year ? parseInt(year) : null,
      isbn: isbn || null,
      genre: genre || 'Не указан',
      available: Boolean(available),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    books.push(newBook);
    res.status(201).json({ message: 'Книга успешно создана', data: newBook });
  } catch (error) {
    next(error); // Передаем ошибку в централизованный обработчик
  }
});

// ==========================================
// ЧАСТЬ C: PUT и PATCH endpoints
// ==========================================

// 4. PUT /api/books/:id - полное обновление
app.put('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Книга не найдена' });
  }

  const { title, author, year, isbn, genre, available } = req.body;

  // Валидация для PUT (полное обновление требует наличия ключевых полей)
  if (!title || !author) {
    return res.status(400).json({ error: 'Поля title и author обязательны для PUT' });
  }

  // Проверка уникальности ISBN, если он меняется
  if (isbn && books.some(b => b.isbn === isbn && b.id !== bookId)) {
    return res.status(409).json({ error: 'Книга с таким ISBN уже существует' });
  }

  // Полная замена данных (сохраняем id и createdAt)
  books[bookIndex] = {
    id: bookId,
    title,
    author,
    year: year ? parseInt(year) : null,
    isbn: isbn || null,
    genre: genre || 'Не указан',
    available: available !== undefined ? Boolean(available) : books[bookIndex].available,
    createdAt: books[bookIndex].createdAt,
    updatedAt: new Date().toISOString()
  };

  res.status(200).json({ message: 'Книга полностью обновлена', data: books[bookIndex] });
});

// 5. PATCH /api/books/:id - частичное обновление
app.patch('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Книга не найдена' });
  }

  const updates = req.body;

  // Проверка уникальности ISBN, если он меняется
  if (updates.isbn && books.some(b => b.isbn === updates.isbn && b.id !== bookId)) {
    return res.status(409).json({ error: 'Книга с таким ISBN уже существует' });
  }

  // Обновляем только те поля, которые пришли
  const updatedBook = {
    ...books[bookIndex],
    ...updates,
    id: bookId, // ID менять нельзя
    year: updates.year ? parseInt(updates.year) : books[bookIndex].year,
    available: updates.available !== undefined ? Boolean(updates.available) : books[bookIndex].available,
    updatedAt: new Date().toISOString()
  };

  books[bookIndex] = updatedBook;

  res.status(200).json({ message: 'Книга частично обновлена', data: updatedBook });
});

// ==========================================
// ЧАСТЬ D: DELETE endpoint
// ==========================================

// 6. DELETE /api/books/:id - удалить книгу
app.delete('/api/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ error: 'Книга не найдена' });
  }

  const deletedBook = books.splice(bookIndex, 1)[0];

  res.status(200).json({ 
    message: 'Книга успешно удалена', 
    data: deletedBook 
  });
});

// ==========================================
// ЧАСТЬ 3: Обработка 404 и ошибок
// ==========================================

// Обработка 404 (несуществующий маршрут)
app.use((req, res) => {
  res.status(404).json({
    error: 'Маршрут не найден',
    path: req.originalUrl
  });
});

// Централизованная обработка ошибок (500)
app.use((err, req, res, next) => {
  console.error('Ошибка сервера:', err.stack);
  res.status(500).json({
    error: 'Внутренняя ошибка сервера',
    message: err.message
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`REST API сервер запущен на порту ${PORT}`);
  console.log(`Доступен по адресу: http://localhost:${PORT}`);
});
