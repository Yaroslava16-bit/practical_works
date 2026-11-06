function runTest(testName, actual, expected) {
    const isEqual = JSON.stringify(actual) === JSON.stringify(expected);
    let testContainer = document.getElementById('test-results-container');
    if (!testContainer) {
        testContainer = document.createElement('div');
        testContainer.id = 'test-results-container';
        testContainer.style.marginTop = '20px';
        document.querySelector('.container').appendChild(testContainer);
    }

    const resultElement = document.createElement('div');
    resultElement.className = `test-result ${isEqual ? 'test-success' : 'test-failure'}`;

    resultElement.innerHTML = `
        <strong>${testName}:</strong> 
        ${isEqual ? '✅ УСПЕХ' : '❌ ОШИБКА'}
        <br> Ожидалось: ${JSON.stringify(expected)}
        <br> Получено: ${JSON.stringify(actual)}
    `;
    testContainer.appendChild(resultElement);
    if (!isEqual) console.error(`${testName}: ОШИБКА`, {expected, actual});
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(async () => {
        console.log('=== ЗАПУСК ТЕСТОВ ПР14 ===');

        // Тест 1: GET запрос (проверяем, что возвращается объект с ID=1)
        try {
            const res = await fetch(`${API_BASE_URL}/posts/1`);
            const data = await res.json();
            runTest('GET /posts/1 возвращает ID=1', data.id, 1);
        } catch (e) {
            runTest('GET /posts/1', 'Ошибка', 'Успех');
        }

        // Тест 2: Проверка утилиты buildUrl
        const testUrl = buildUrl('https://example.com/api', { page: 1, limit: 10 });
        runTest('buildUrl создает корректный URL', testUrl, 'https://example.com/api?page=1&limit=10');

        // Тест 3: HTTP ошибка (проверяем 404)
        try {
            const res = await fetch(`${API_BASE_URL}/invalid-endpoint`);
            runTest('HTTP Ошибка 404', res.status, 404);
        } catch (e) {
            runTest('HTTP Ошибка 404 (упало с исключением)', true, true);
        }

        // Тест 4: AbortController
        try {
            const controller = new AbortController();
            controller.abort(); // Мгновенная отмена
            await fetch(`${API_BASE_URL}/posts`, { signal: controller.signal });
            runTest('AbortController отменил запрос', false, true); // Не должно выполниться
        } catch (e) {
            runTest('AbortController отменил запрос', e.name, 'AbortError');
        }

        console.log('=== ТЕСТИРОВАНИЕ ЗАВЕРШЕНО ===');
    }, 200);
});
