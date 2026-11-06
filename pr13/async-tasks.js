// Вспомогательные функции
function displayOutput(elementId, data, type = 'normal') {
    const output = document.getElementById(elementId);
    if (!output) return;
    const timestamp = new Date().toLocaleTimeString();
    const content = typeof data === 'object' ? JSON.stringify(data, null, 2) : String(data);
    output.innerHTML = `[${timestamp}] ${content}`;
    output.className = 'output';
    if (type === 'error') output.classList.add('error');
    if (type === 'success') output.classList.add('success');
}

function updateProgress(percentage) {
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) progressFill.style.width = `${percentage}%`;
}

function setLoadingState(buttonId, isLoading) {
    const button = document.getElementById(buttonId);
    if (!button) return;
    if (isLoading) {
        button.dataset.originalText = button.innerHTML;
        button.disabled = true;
        button.innerHTML = `<span class="spinner"></span> Загрузка...`;
    } else {
        button.disabled = false;
        button.innerHTML = button.dataset.originalText || button.innerHTML;
    }
}

// ==========================================
// ЗАДАНИЕ 1: Основы промисов
// ==========================================
function createBasicPromise(shouldResolve = true) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) resolve("Успех!");
            else reject("Ошибка!");
        }, 1000);
    });
}

async function handleBasicPromise() {
    displayOutput('promise-output', 'Загрузка...');
    try {
        const result = await createBasicPromise(true);
        displayOutput('promise-output', result, 'success');
    } catch (err) {
        displayOutput('promise-output', err, 'error');
    }
}

function createPromiseChain() {
    displayOutput('promise-output', 'Начало цепочки...');
    createBasicPromise(true)
        .then(res1 => {
            displayOutput('promise-output', `Шаг 1: ${res1}`);
            return new Promise(r => setTimeout(() => r("Шаг 2 пройден"), 500));
        })
        .then(res2 => {
            displayOutput('promise-output', `${res2}`);
            return new Promise(r => setTimeout(() => r("Шаг 3 завершен"), 500));
        })
        .then(res3 => displayOutput('promise-output', `Цепочка: ${res3}`, 'success'))
        .catch(err => displayOutput('promise-output', err, 'error'));
}

async function handlePromiseError() {
    displayOutput('promise-output', 'Ожидание ошибки...');
    try {
        await createBasicPromise(false);
    } catch (error) {
        displayOutput('promise-output', `Перехвачено: ${error}`, 'error');
    }
}

function setupPromiseEvents() {
    document.getElementById('basic-promise').addEventListener('click', handleBasicPromise);
    document.getElementById('promise-chain').addEventListener('click', createPromiseChain);
    document.getElementById('promise-error').addEventListener('click', handlePromiseError);
}

// ==========================================
// ЗАДАНИЕ 2: Async/Await
// ==========================================
async function basicAsyncAwait() {
    displayOutput('async-output', 'Загрузка...');
    const result = await createBasicPromise(true);
    await delayWithPromise(500);
    displayOutput('async-output', `Async/await результат: ${result}`, 'success');
}

async function handleAsyncError() {
    displayOutput('async-output', 'Проверка try/catch...');
    try {
        await createBasicPromise(false);
    } catch (error) {
        displayOutput('async-output', `Ошибка перехвачена: ${error}`, 'error');
    }
}

async function parallelAsyncExecution() {
    displayOutput('async-output', 'Запуск 3 промисов параллельно...');
    const start = Date.now();
    
    await Promise.all([
        delayWithPromise(1000),
        delayWithPromise(1500),
        delayWithPromise(1000)
    ]);
    
    const time = Date.now() - start;
    displayOutput('async-output', `Все выполнено за ${time}мс (ожидалось ~1500мс)`, 'success');
}

function setupAsyncEvents() {
    document.getElementById('basic-async').addEventListener('click', basicAsyncAwait);
    document.getElementById('async-error').addEventListener('click', handleAsyncError);
    document.getElementById('async-parallel').addEventListener('click', parallelAsyncExecution);
}

// ==========================================
// ЗАДАНИЕ 3: Работа с внешними API
// ==========================================
async function fetchUsers() {
    const btnId = 'fetch-users';
    setLoadingState(btnId, true);
    displayOutput('api-output', 'Загрузка пользователей...');
    document.getElementById('api-data').innerHTML = '';

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const users = await response.json();
        displayOutput('api-output', `Загружено ${users.length} пользователей`, 'success');
        
        const container = document.getElementById('api-data');
        users.forEach(user => {
            const card = document.createElement('div');
            card.className = 'user-card';
            card.innerHTML = `<strong>${user.name}</strong><br>Email: ${user.email}<br>Город: ${user.address.city}`;
            container.appendChild(card);
        });
    } catch (error) {
        displayOutput('api-output', `Ошибка API: ${error.message}`, 'error');
    } finally {
        setLoadingState(btnId, false);
    }
}

async function createPost() {
    const btnId = 'fetch-post';
    setLoadingState(btnId, true);
    displayOutput('api-output', 'Отправка POST запроса...');
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'Мой пост', body: 'Текст поста', userId: 1 })
        });
        const data = await response.json();
        displayOutput('api-output', `Пост создан (ID: ${data.id})`, 'success');
    } catch (error) {
        displayOutput('api-output', `Ошибка: ${error.message}`, 'error');
    } finally {
        setLoadingState(btnId, false);
    }
}

async function testApiError() {
    displayOutput('api-output', 'Тестирование ошибки...');
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/invalid-endpoint');
        if (!response.ok) throw new Error(`Сервер вернул статус ${response.status}`);
        await response.json();
    } catch (error) {
        displayOutput('api-output', `Перехвачена ошибка: ${error.message}`, 'error');
    }
}

function setupApiEvents() {
    document.getElementById('fetch-users').addEventListener('click', fetchUsers);
    document.getElementById('fetch-post').addEventListener('click', createPost);
    document.getElementById('fetch-error').addEventListener('click', testApiError);
}

// ==========================================
// ЗАДАНИЕ 4: Асинхронные таймеры
// ==========================================
let intervalId;
let intervalCounter = 0;

async function startAsyncInterval() {
    if (intervalId) return;
    intervalCounter = 0;
    intervalId = setInterval(async () => {
        intervalCounter++;
        document.getElementById('interval-output').textContent = `Интервал: ${intervalCounter}с`;
        if (intervalCounter >= 10) stopAsyncInterval();
    }, 1000);
}

function stopAsyncInterval() {
    clearInterval(intervalId);
    intervalId = null;
    document.getElementById('interval-output').textContent = `Интервал остановлен на ${intervalCounter}с`;
}

function delayWithPromise(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function testDelay() {
    displayOutput('timer-output', 'Начало задержек...');
    await delayWithPromise(1000);
    displayOutput('timer-output', 'Прошла 1 секунда');
    await delayWithPromise(1500);
    displayOutput('timer-output', 'Прошло еще 1.5 секунды (всего 2.5с)', 'success');
}

function setupTimerEvents() {
    document.getElementById('start-interval').addEventListener('click', startAsyncInterval);
    document.getElementById('stop-interval').addEventListener('click', stopAsyncInterval);
    document.getElementById('delay-promise').addEventListener('click', testDelay);
}

// ==========================================
// ЗАДАНИЕ 5: Обработка ошибок
// ==========================================
async function asyncTryCatch() {
    displayOutput('error-output', 'Начало вложенных try/catch...');
    try {
        displayOutput('error-output', 'Внешний try блок');
        try {
            throw new Error("Внутренняя ошибка");
        } catch (innerErr) {
            displayOutput('error-output', `Поймана внутренняя: ${innerErr.message}`, 'warning');
            throw new Error("Ошибка после обработки");
        }
    } catch (outerErr) {
        displayOutput('error-output', `Поймана внешняя: ${outerErr.message}`, 'error');
    }
}

async function handleMultipleErrors() {
    displayOutput('error-output', 'Запуск Promise.allSettled...');
    const results = await Promise.allSettled([
        Promise.resolve("Успех 1"),
        Promise.reject("Ошибка 1"),
        Promise.resolve("Успех 2"),
        Promise.reject("Ошибка 2")
    ]);
    
    const successCount = results.filter(r => r.status === 'fulfilled').length;
    const failCount = results.filter(r => r.status === 'rejected').length;
    
    displayOutput('error-output', `Успешно: ${successCount}, Ошибок: ${failCount}`);
}

async function retryWithBackoff(operation, maxRetries = 3) {
    let attempt = 0;
    while (attempt < maxRetries) {
        try {
            return await operation();
        } catch (error) {
            attempt++;
            if (attempt >= maxRetries) throw new Error(`Не удалось после ${maxRetries} попыток.`);
            const delay = Math.pow(2, attempt) * 500;
            displayOutput('error-output', `Попытка ${attempt} не удалась. Ждем ${delay}мс...`, 'warning');
            await delayWithPromise(delay);
        }
    }
}

function setupErrorEvents() {
    document.getElementById('try-catch').addEventListener('click', asyncTryCatch);
    document.getElementById('multiple-errors').addEventListener('click', handleMultipleErrors);
    document.getElementById('retry-pattern').addEventListener('click', () => {
        let callCount = 0;
        const flakyOp = async () => {
            callCount++;
            if (callCount < 3) throw new Error("Сбой сети");
            return "Успех с 3-й попытки!";
        };
        retryWithBackoff(flakyOp)
            .then(res => displayOutput('error-output', res, 'success'))
            .catch(err => displayOutput('error-output', err.message, 'error'));
    });
}

// ==========================================
// ЗАДАНИЕ 6: Параллельные операции
// ==========================================
async function demonstratePromiseAll() {
    displayOutput('parallel-output', 'Запуск Promise.all...');
    const p1 = delayWithPromise(1000).then(() => 'A');
    const p2 = delayWithPromise(2000).then(() => 'B');
    const p3 = delayWithPromise(1500).then(() => 'C');
    
    const results = await Promise.all([p1, p2, p3]);
    displayOutput('parallel-output', `Promise.all: ${results.join(', ')}`, 'success');
}

async function demonstratePromiseRace() {
    displayOutput('parallel-output', 'Запуск Promise.race...');
    const p1 = delayWithPromise(1000).then(() => 'Медленный');
    const p2 = delayWithPromise(500).then(() => 'Быстрый (победил)');
    
    const winner = await Promise.race([p1, p2]);
    displayOutput('parallel-output', `Promise.race: ${winner}`, 'success');
}

async function demonstratePromiseAllSettled() {
    displayOutput('parallel-output', 'Запуск Promise.allSettled...');
    const p1 = delayWithPromise(500).then(() => 'ОК');
    const p2 = delayWithPromise(800).then(() => { throw new Error('Сбой'); });
    
    const results = await Promise.allSettled([p1, p2]);
    const statuses = results.map(r => `${r.status}`);
    displayOutput('parallel-output', `Promise.allSettled: ${statuses.join(', ')}`, 'success');
}

function setupParallelEvents() {
    document.getElementById('promise-all').addEventListener('click', demonstratePromiseAll);
    document.getElementById('promise-race').addEventListener('click', demonstratePromiseRace);
    document.getElementById('promise-allSettled').addEventListener('click', demonstratePromiseAllSettled);
}

// ==========================================
// ЗАДАНИЕ 7: Реальные сценарии
// ==========================================
async function sequentialApiRequests() {
    displayOutput('scenario-output', 'Шаг 1: Получаем пользователя...');
    try {
        const userRes = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const user = await userRes.json();
        
        displayOutput('scenario-output', `Шаг 1 готов. Шаг 2: Посты пользователя ${user.name}...`);
        const postsRes = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
        const posts = await postsRes.json();
        
        displayOutput('scenario-output', `Шаг 2 готов. Шаг 3: Комментарии к посту...`);
        const commentsRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${posts[0].id}/comments`);
        const comments = await commentsRes.json();
        
        displayOutput('scenario-output', `Готово! Пользователь: ${user.name}, Постов: ${posts.length}, Комментариев к 1-му: ${comments.length}`, 'success');
    } catch (e) {
        displayOutput('scenario-output', `Ошибка: ${e.message}`, 'error');
    }
}

async function simulateFileUpload() {
    displayOutput('scenario-output', 'Начало загрузки...');
    updateProgress(0);
    
    for (let i = 1; i <= 10; i++) {
        await delayWithPromise(200);
        updateProgress(i * 10);
        displayOutput('scenario-output', `Загрузка... ${i * 10}%`);
    }
    displayOutput('scenario-output', 'Загрузка завершена!', 'success');
}

function createRequestCache() {
    const cache = new Map();
    return async function cachedRequest(url) {
        if (cache.has(url)) {
            displayOutput('scenario-output', `[КЭШ] Данные для ${url}`);
            return cache.get(url);
        }
        
        displayOutput('scenario-output', `[СЕТЬ] Запрос к ${url}...`);
        const res = await fetch(url);
        if (!res.ok) throw new Error('Network error');
        const data = await res.json();
        cache.set(url, data);
        return data;
    };
}

function setupRealScenarioEvents() {
    document.getElementById('sequential-requests').addEventListener('click', sequentialApiRequests);
    document.getElementById('upload-simulation').addEventListener('click', simulateFileUpload);
    
    const cachedFetch = createRequestCache();
    document.getElementById('cache-requests').addEventListener('click', async () => {
        const url = 'https://jsonplaceholder.typicode.com/todos/1';
        displayOutput('scenario-output', 'Клик 1 (должен быть запрос в сеть)...');
        await cachedFetch(url);
        displayOutput('scenario-output', 'Клик 2 (должен взяться из кэша)...');
        await cachedFetch(url);
    });
}

// ==========================================
// ИНИЦИАЛИЗАЦИЯ
// ==========================================
function initializeAsyncOperations() {
    setupPromiseEvents();
    setupAsyncEvents();
    setupApiEvents();
    setupTimerEvents();
    setupErrorEvents();
    setupParallelEvents();
    setupRealScenarioEvents();
    console.log('Все асинхронные обработчики инициализированы!');
}

document.addEventListener('DOMContentLoaded', initializeAsyncOperations);
