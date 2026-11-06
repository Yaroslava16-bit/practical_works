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
        console.log('=== ЗАПУСК ТЕСТОВ ПР13 ===');

        // Тест 1: Промис успешный
        try {
            const res = await createBasicPromise(true);
            runTest('createBasicPromise(true) resolve', res, "Успех!");
        } catch (e) {
            runTest('createBasicPromise(true) resolve', 'Ошибка', 'Успех!');
        }

        // Тест 2: Промис с ошибкой
        try {
            await createBasicPromise(false);
            runTest('createBasicPromise(false) reject', 'Нет ошибки', 'Ошибка!');
        } catch (e) {
            runTest('createBasicPromise(false) reject', e, "Ошибка!");
        }

        // Тест 3: Задержка (delayWithPromise)
        const start = Date.now();
        await delayWithPromise(500);
        const timePassed = Date.now() - start;
        runTest('delayWithPromise(500) задержка >= 500мс', timePassed >= 500, true);

        // Тест 4: Promise.allSettled
        const results = await Promise.allSettled([
            Promise.resolve(1),
            Promise.reject(new Error('err'))
        ]);
        runTest('Promise.allSettled содержит оба результата', results.length, 2);
        runTest('Promise.allSettled статусы верные', results[0].status + results[1].status, 'fulfilledrejected');

        // Тест 5: RetryWithBackoff (симуляция)
        let attempts = 0;
        const func = async () => {
            attempts++;
            if (attempts < 2) throw new Error('fail');
            return 'success';
        };
        const retryRes = await retryWithBackoff(func, 3);
        runTest('retryWithBackoff сработал со 2-й попытки', retryRes, 'success');
        runTest('Количество попыток = 2', attempts, 2);

        console.log('=== ТЕСТИРОВАНИЕ ЗАВЕРШЕНО ===');
    }, 200);
});
