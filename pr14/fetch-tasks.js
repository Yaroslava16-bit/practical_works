const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

// Утилиты
function displayOutput(elementId, data, isError = false) {
    const output = document.getElementById(elementId);
    if (!output) return;
    const timestamp = new Date().toLocaleTimeString();
    let content = typeof data === 'object' ? JSON.stringify(data, null, 2) : String(data);
    if (data instanceof Error) content = `Ошибка: ${data.message}`;
    
    output.innerHTML = `[${timestamp}]\n${content}`;
    output.className = `output ${isError ? 'error' : 'success'}`;
}

function displayData(elementId, data) {
    const container = document.getElementById(elementId);
    if (!container) return;
    if (Array.isArray(data)) {
        container.innerHTML = data.map(item => `
            <div class="user-card">
                <h4>${item.name || item.title || 'Без названия'}</h4>
                <p>Email: ${item.email || 'Нет'}</p>
                <p>Телефон: ${item.phone || 'Нет'}</p>
                <p>${item.body || item.description || ''}</p>
            </div>
        `).join('');
    } else if (typeof data === 'object') {
        container.innerHTML = `<div class="json-view">${JSON.stringify(data, null, 2)}</div>`;
    }
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
        button.innerHTML = button.dataset.originalText || 'Загрузить';
    }
}

function buildUrl(baseUrl, params = {}) {
    const url = new URL(baseUrl);
    Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
            url.searchParams.append(key, params[key]);
        }
    });
    return url.toString();
}

// ==========================================
// ЗАДАНИЕ 1: Базовые GET запросы
// ==========================================
async function fetchGetRequest() {
    displayOutput('get-output', 'Загрузка поста...');
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        displayOutput('get-output', data);
    } catch (error) {
        displayOutput('get-output', error, true);
    }
}

async function fetchJsonData() {
    setLoadingState('fetch-json', true);
    displayOutput('get-output', 'Загрузка пользователей...');
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        const users = await response.json();
        displayOutput('get-output', `Успешно загружено ${users.length} пользователей`);
        displayData('get-data', users);
    } catch (error) {
        displayOutput('get-output', error, true);
    } finally {
        setLoadingState('fetch-json', false);
    }
}

async function fetchWithError() {
    displayOutput('get-output', 'Попытка запроса к несуществующему URL...');
    try {
        const response = await fetch('https://invalid-url-for-test.com/api');
        if (!response.ok) throw new Error('Сбой');
    } catch (error) {
        displayOutput('get-output', `Ошибка сети перехвачена: ${error.message}`, true);
    }
}

function setupGetRequests() {
    document.getElementById('fetch-get').addEventListener('click', fetchGetRequest);
    document.getElementById('fetch-json').addEventListener('click', fetchJsonData);
    document.getElementById('fetch-error').addEventListener('click', fetchWithError);
}

// ==========================================
// ЗАДАНИЕ 2: POST, PUT, PATCH, DELETE
// ==========================================
async function fetchPostRequest() {
    displayOutput('crud-output', 'POST запрос...');
    try {
        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'Новый пост', body: 'Текст поста', userId: 1 })
        });
        const data = await response.json();
        displayOutput('crud-output', `Пост создан! ID: ${data.id}\n${JSON.stringify(data, null, 2)}`);
    } catch (error) {
        displayOutput('crud-output', error, true);
    }
}

async function fetchPutRequest() {
    displayOutput('crud-output', 'PUT запрос (полное обновление)...');
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: 1, title: 'Обновленный пост', body: 'Новый текст', userId: 1 })
        });
        const data = await response.json();
        displayOutput('crud-output', `Пост обновлен через PUT:\n${JSON.stringify(data, null, 2)}`);
    } catch (error) {
        displayOutput('crud-output', error, true);
    }
}

async function fetchPatchRequest() {
    displayOutput('crud-output', 'PATCH запрос (частичное обновление)...');
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'Изменен только заголовок' })
        });
        const data = await response.json();
        displayOutput('crud-output', `Пост обновлен через PATCH:\n${JSON.stringify(data, null, 2)}`);
    } catch (error) {
        displayOutput('crud-output', error, true);
    }
}

async function fetchDeleteRequest() {
    displayOutput('crud-output', 'DELETE запрос...');
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`, { method: 'DELETE' });
        if (response.ok) {
            displayOutput('crud-output', `Пост удален! Статус: ${response.status} (JSONPlaceholder имитирует удаление)`);
        }
    } catch (error) {
        displayOutput('crud-output', error, true);
    }
}

function setupCrudRequests() {
    document.getElementById('fetch-post').addEventListener('click', fetchPostRequest);
    document.getElementById('fetch-put').addEventListener('click', fetchPutRequest);
    document.getElementById('fetch-patch').addEventListener('click', fetchPatchRequest);
    document.getElementById('fetch-delete').addEventListener('click', fetchDeleteRequest);
}

// ==========================================
// ЗАДАНИЕ 3: Заголовки и параметры
// ==========================================
async function fetchWithHeaders() {
    displayOutput('headers-output', 'Отправка с кастомными заголовками...');
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`, {
            headers: {
                'X-Custom-Header': 'MyValue',
                'Authorization': 'Bearer fake-token-12345'
            }
        });
        displayOutput('headers-output', 'Запрос успешен. Заголовки отправлены (см. вкладку Network).');
    } catch (error) {
        displayOutput('headers-output', error, true);
    }
}

async function fetchWithAuth() {
    displayOutput('headers-output', 'Basic Auth...');
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa('user:password'));
    
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`, { headers });
        displayOutput('headers-output', 'Basic Auth заголовок отправлен (имитация).');
    } catch (error) {
        displayOutput('headers-output', error, true);
    }
}

async function fetchWithParams() {
    displayOutput('headers-output', 'Запрос с параметрами...');
    const url = buildUrl(`${API_BASE_URL}/posts`, { _limit: 3, _sort: 'id', _order: 'desc' });
    displayOutput('headers-output', `URL: ${url}`);
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayOutput('headers-output', `Получено ${data.length} постов:\n${data.map(p => p.id).join(', ')}`);
    } catch (error) {
        displayOutput('headers-output', error, true);
    }
}

async function fetchWithTimeout() {
    displayOutput('headers-output', 'Запуск с таймаутом в 3 секунды...');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    try {
        // Специально долгий запрос (JSONPlaceholder обычно быстрый, но мы дадим 10 сек на ответ)
        await fetch(`${API_BASE_URL}/posts/1`, { signal: controller.signal });
        clearTimeout(timeoutId);
        displayOutput('headers-output', 'Запрос успел выполниться!');
    } catch (error) {
        if (error.name === 'AbortError') {
            displayOutput('headers-output', 'Запрос отменен по таймауту (AbortController)!', true);
        } else {
            displayOutput('headers-output', error, true);
        }
    }
}

function setupHeadersAndParams() {
    document.getElementById('fetch-headers').addEventListener('click', fetchWithHeaders);
    document.getElementById('fetch-auth').addEventListener('click', fetchWithAuth);
    document.getElementById('fetch-params').addEventListener('click', fetchWithParams);
    document.getElementById('fetch-timeout').addEventListener('click', fetchWithTimeout);
}

// ==========================================
// ЗАДАНИЕ 4: Обработка ответов
// ==========================================
async function fetchAndCheckStatus() {
    displayOutput('response-output', 'Проверка статуса...');
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`);
        if (!response.ok) throw new Error(`Статус: ${response.status}`);
        displayOutput('response-output', `Успех! Статус: ${response.status} (OK)`);
    } catch (error) {
        displayOutput('response-output', error, true);
    }
}

async function fetchAndReadHeaders() {
    displayOutput('response-output', 'Чтение заголовков ответа...');
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`);
        let headersText = '';
        response.headers.forEach((value, key) => {
            headersText += `${key}: ${value}\n`;
        });
        displayOutput('response-output', `Заголовки ответа:\n${headersText}`);
    } catch (error) {
        displayOutput('response-output', error, true);
    }
}

async function fetchBlobData() {
    setLoadingState('fetch-blob', true);
    displayOutput('response-output', 'Загрузка картинки (Blob)...');
    try {
        const response = await fetch('https://picsum.photos/200/300');
        const blob = await response.blob();
        const imgUrl = URL.createObjectURL(blob);
        displayOutput('response-output', 'Картинка загружена как Blob!');
        document.getElementById('response-data').innerHTML = `<img src="${imgUrl}" alt="Loaded" style="border-radius: 8px;">`;
    } catch (error) {
        displayOutput('response-output', error, true);
    } finally {
        setLoadingState('fetch-blob', false);
    }
}

async function fetchWithFormData() {
    displayOutput('response-output', 'Отправка FormData...');
    const formData = new FormData();
    formData.append('title', 'Пост через FormData');
    formData.append('body', 'Текст формы');
    formData.append('userId', 1);

    try {
        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: 'POST',
            body: formData // Fetch автоматически установит Content-Type: multipart/form-data
        });
        const data = await response.json();
        displayOutput('response-output', `Ответ сервера:\n${JSON.stringify(data, null, 2)}`);
    } catch (error) {
        displayOutput('response-output', error, true);
    }
}

function setupResponseHandling() {
    document.getElementById('fetch-status').addEventListener('click', fetchAndCheckStatus);
    document.getElementById('fetch-headers-response').addEventListener('click', fetchAndReadHeaders);
    document.getElementById('fetch-blob').addEventListener('click', fetchBlobData);
    document.getElementById('fetch-formdata').addEventListener('click', fetchWithFormData);
}

// ==========================================
// ЗАДАНИЕ 5: Обработка ошибок
// ==========================================
async function fetchNetworkError() {
    displayOutput('error-output', 'Симуляция ошибки сети...');
    try {
        await fetch('https://this-domain-does-not-exist-12345.com');
    } catch (error) {
        displayOutput('error-output', `Network Error: ${error.message}`, true);
    }
}

async function fetchHttpError() {
    displayOutput('error-output', 'Запрос к несуществующему ресурсу (404)...');
    try {
        const response = await fetch(`${API_BASE_URL}/posts/999999`);
        if (!response.ok) {
            throw new Error(`HTTP Ошибка: ${response.status} ${response.statusText}`);
        }
        const data = await response.json(); // Это не выполнится
    } catch (error) {
        displayOutput('error-output', error.message, true);
    }
}

async function fetchWithAbort() {
    displayOutput('error-output', 'Запрос будет отменен через 1 сек...');
    const controller = new AbortController();
    const signal = controller.signal;

    setTimeout(() => controller.abort(), 1000);

    try {
        // Медленный запрос, чтобы успеть отменить
        await fetch('https://httpbin.org/delay/5', { signal });
        displayOutput('error-output', 'Запрос успел выполниться!');
    } catch (error) {
        if (error.name === 'AbortError') {
            displayOutput('error-output', 'Запрос успешно отменен пользователем (AbortError).', true);
        } else {
            displayOutput('error-output', error, true);
        }
    }
}

async function fetchWithRetry(url, options = {}, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`Статус ${response.status}`);
            return await response.json();
        } catch (error) {
            if (i === retries - 1) throw error;
            const delay = Math.pow(2, i) * 500;
            displayOutput('error-output', `Попытка ${i + 1} не удалась. Ждем ${delay}мс...`, true);
            await new Promise(r => setTimeout(r, delay));
        }
    }
}

function setupErrorHandling() {
    document.getElementById('fetch-network-error').addEventListener('click', fetchNetworkError);
    document.getElementById('fetch-http-error').addEventListener('click', fetchHttpError);
    document.getElementById('fetch-abort').addEventListener('click', fetchWithAbort);
    
    document.getElementById('fetch-retry').addEventListener('click', async () => {
        displayOutput('error-output', 'Запуск с повторными попытками...');
        let attempts = 0;
        const mockFetch = async () => {
            attempts++;
            if (attempts < 3) throw new Error("Сбой сети");
            return { success: true };
        };
        try {
            // Имитируем функцию, которая падает 2 раза и работает с 3-го
            const res = await fetchWithRetry(null, {}, 3); // Передаем null, так как используем мок
            displayOutput('error-output', 'Успех после повторных попыток!');
        } catch (e) {
            displayOutput('error-output', e.message, true);
        }
    });
}

// ==========================================
// ЗАДАНИЕ 6: Параллельные запросы
// ==========================================
async function fetchWithPromiseAll() {
    displayOutput('parallel-output', 'Запуск 3 запросов через Promise.all...');
    const start = Date.now();
    try {
        const [users, posts, comments] = await Promise.all([
            fetch(`${API_BASE_URL}/users`).then(r => r.json()),
            fetch(`${API_BASE_URL}/posts`).then(r => r.json()),
            fetch(`${API_BASE_URL}/comments`).then(r => r.json())
        ]);
        const time = Date.now() - start;
        displayOutput('parallel-output', `Все данные загружены за ${time}мс.\nПользователей: ${users.length}, Постов: ${posts.length}, Комментариев: ${comments.length}`);
    } catch (error) {
        displayOutput('parallel-output', error, true);
    }
}

async function fetchWithPromiseRace() {
    displayOutput('parallel-output', 'Запуск Promise.race...');
    try {
        const first = await Promise.race([
            fetch(`${API_BASE_URL}/posts/1`).then(r => 'Пост загрузился первым'),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Таймаут 1 сек')), 1000))
        ]);
        displayOutput('parallel-output', `Победитель: ${first}`);
    } catch (error) {
        displayOutput('parallel-output', `Результат race: ${error.message}`, true);
    }
}

async function fetchSequentialRequests() {
    displayOutput('parallel-output', 'Последовательные запросы...');
    const start = Date.now();
    try {
        await fetch(`${API_BASE_URL}/users`).then(r => r.json());
        displayOutput('parallel-output', 'Шаг 1 (Users) готов...');
        await fetch(`${API_BASE_URL}/posts`).then(r => r.json());
        displayOutput('parallel-output', 'Шаг 2 (Posts) готов...');
        await fetch(`${API_BASE_URL}/comments`).then(r => r.json());
        const time = Date.now() - start;
        displayOutput('parallel-output', `Все данные загружены последовательно за ${time}мс.\n(Заметно дольше, чем Promise.all)`);
    } catch (error) {
        displayOutput('parallel-output', error, true);
    }
}

function setupParallelRequests() {
    document.getElementById('fetch-promise-all').addEventListener('click', fetchWithPromiseAll);
    document.getElementById('fetch-promise-race').addEventListener('click', fetchWithPromiseRace);
    document.getElementById('fetch-sequential').addEventListener('click', fetchSequentialRequests);
}

// ==========================================
// ЗАДАНИЕ 7: Реальные сценарии
// ==========================================
async function fetchUserWithPosts() {
    displayOutput('scenario-output', 'Загрузка пользователя и его постов...');
    try {
        const user = await fetch(`${API_BASE_URL}/users/1`).then(r => r.json());
        displayOutput('scenario-output', `Пользователь: ${user.name}. Загрузка постов...`);
        const posts = await fetch(`${API_BASE_URL}/posts?userId=${user.id}`).then(r => r.json());
        displayOutput('scenario-output', `Готово! ${user.name} написал ${posts.length} постов.`);
        displayData('get-data', posts.slice(0, 3)); // Покажем первые 3 поста
    } catch (error) {
        displayOutput('scenario-output', error, true);
    }
}

async function fetchWithSearch() {
    displayOutput('scenario-output', 'Поиск постов (параметр q)...');
    // JSONPlaceholder не поддерживает реальный поиск по q, но мы покажем работу с параметрами
    const url = buildUrl(`${API_BASE_URL}/posts`, { userId: 1 });
    const posts = await fetch(url).then(r => r.json());
    const found = posts.filter(p => p.title.includes('qui') || p.body.includes('qui'));
    displayOutput('scenario-output', `Найдено постов с 'qui': ${found.length}`);
}

async function simulateFileUpload() {
    displayOutput('scenario-output', 'Симуляция загрузки файла...');
    const progressFill = document.getElementById('progress-fill');
    progressFill.style.width = '0%';
    
    for (let i = 1; i <= 10; i++) {
        await new Promise(r => setTimeout(r, 300));
        progressFill.style.width = `${i * 10}%`;
        displayOutput('scenario-output', `Загрузка: ${i * 10}%`);
    }
    displayOutput('scenario-output', 'Файл успешно загружен!');
}

function createFetchCache() {
    const cache = new Map();
    return async function cachedFetch(url) {
        if (cache.has(url)) {
            displayOutput('scenario-output', `[КЭШ] Взято из кэша: ${url}`);
            return cache.get(url);
        }
        displayOutput('scenario-output', `[СЕТЬ] Запрос: ${url}`);
        const res = await fetch(url);
        const data = await res.json();
        cache.set(url, data);
        return data;
    };
}

function setupRealScenarios() {
    document.getElementById('fetch-user-posts').addEventListener('click', fetchUserWithPosts);
    document.getElementById('fetch-search').addEventListener('click', fetchWithSearch);
    document.getElementById('fetch-upload').addEventListener('click', simulateFileUpload);
    
    const cachedFetch = createFetchCache();
    document.getElementById('fetch-cache').addEventListener('click', async () => {
        const url = `${API_BASE_URL}/todos/1`;
        await cachedFetch(url);
        await cachedFetch(url); // Второй раз возьмется из кэша
    });
}

// ==========================================
// ИНИЦИАЛИЗАЦИЯ
// ==========================================
function initializeFetchAPI() {
    setupGetRequests();
    setupCrudRequests();
    setupHeadersAndParams();
    setupResponseHandling();
    setupErrorHandling();
    setupParallelRequests();
    setupRealScenarios();

    document.querySelectorAll('button').forEach(button => {
        button.setAttribute('data-original-text', button.textContent);
    });
    console.log('Все обработчики Fetch API инициализированы!');
}

document.addEventListener('DOMContentLoaded', initializeFetchAPI);
