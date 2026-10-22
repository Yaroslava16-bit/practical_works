// Функция для вывода результатов тестов
function runTest(testName, actual, expected) {
    const isEqual = JSON.stringify(actual) === JSON.stringify(expected);
    const resultElement = document.createElement('div');
    resultElement.className = `test-result ${isEqual ? 'success' : 'error'}`;

    resultElement.innerHTML = `
        <strong>${testName}:</strong>
        ${isEqual ? '✅ УСПЕХ' : '❌ ОШИБКА'}
        <br> Ожидалось: ${JSON.stringify(expected)}
        <br> Получено: ${JSON.stringify(actual)}
    `;

    document.getElementById('testResults').appendChild(resultElement);
    if (!isEqual) {
        console.error(`${testName}: ОШИБКА`, {expected, actual});
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('=== ЗАПУСК ТЕСТОВ ПР10 ===');

    // --- Тесты для sum ---
    runTest('sum(1, 2, 3, 4, 5)', sum(1, 2, 3, 4, 5), 15);
    runTest('sum() - пустой вызов', sum(), 0);
    runTest('sum(-1, 1)', sum(-1, 1), 0);

    // --- Тесты для createUser ---
    runTest('createUser с email', createUser({ name: "Иван", age: 25, email: "ivan@mail.ru" }), "Пользователь: Иван, возраст: 25, email: ivan@mail.ru");
    runTest('createUser без email', createUser({ name: "Анна", age: 30 }), "Пользователь: Анна, возраст: 30, email: не указан");

    // --- Тесты для secretMessage (Замыкание) ---
    const getSecret = secretMessage("qwerty", "Секретная информация");
    runTest('secretMessage верный пароль', getSecret("qwerty"), "Секретная информация");
    runTest('secretMessage неверный пароль', getSecret("12345"), "Доступ запрещен");

    // --- Тесты для compose ---
    const addOne = x => x + 1;
    const double = x => x * 2;
    const composed = compose(addOne, double); // (x * 2) + 1
    runTest('compose(addOne, double)(5)', composed(5), 11); // 5*2=10, 10+1=11

    // --- Тесты для myMap ---
    const arr = [1, 2, 3];
    runTest('myMap([1,2,3], x => x * 2)', myMap(arr, x => x * 2), [2, 4, 6]);
    
    // --- Тесты для myFilter ---
    runTest('myFilter([1,2,3,4], x => x % 2 === 0)', myFilter([1, 2, 3, 4], x => x % 2 === 0), [2, 4]);

    // --- Тесты для myReduce ---
    runTest('myReduce([1,2,3,4], sum) без initial', myReduce([1, 2, 3, 4], (acc, curr) => acc + curr), 10);
    runTest('myReduce([1,2,3], sum, 10) с initial', myReduce([1, 2, 3], (acc, curr) => acc + curr, 10), 16);

    // --- Тесты для curry ---
    const add3 = (a, b, c) => a + b + c;
    const curriedAdd3 = curry(add3);
    runTest('curry(add3)(1)(2)(3)', curriedAdd3(1)(2)(3), 6);
    runTest('curry(add3)(1, 2)(3)', curriedAdd3(1, 2)(3), 6);

    // --- Тесты для memoize ---
    let callCount = 0;
    const slowFn = memoize((x) => { callCount++; return x * 10; });
    slowFn(5); // 1st call
    slowFn(5); // 2nd call (cached)
    runTest('memoize вызывает функцию 1 раз', callCount, 1);
    runTest('memoize возвращает правильный результат', slowFn(5), 50);

    // --- Тесты для createValidator ---
    const validatePassword = createValidator({ minLength: 8, hasDigit: true, hasUppercase: true });
    runTest('Валидация: "Pass1234"', validatePassword("Pass1234"), true);
    runTest('Валидация: "pass1234" (нет заглавной)', validatePassword("pass1234"), false);
    runTest('Валидация: "Pass" (короткий, нет цифр)', validatePassword("Pass"), false);

    console.log('=== ТЕСТИРОВАНИЕ ЗАВЕРШЕНО ===');

    // Демонстрация debounce и throttle (без ассертов, просто лог в консоль)
    console.log('\n--- Демонстрация Debounce/Throttle (быстрые вызовы) ---');
    const logEvent = debounce((msg) => console.log('Debounce:', msg), 500);
    const limitEvent = throttle((msg) => console.log('Throttle:', msg), 500);
    
    for(let i=1; i<=3; i++) {
        logEvent(`Клик ${i}`);
        limitEvent(`Клик ${i}`);
    }
});
